import { BN, BorshInstructionCoder, utils } from '@coral-xyz/anchor';
import { PublicKey, Transaction } from '@solana/web3.js';
import { accounts, chainProgram, submitInstruction, type PaymentAccount } from '../../../../lib/chain-client';
import {chainConnection, chainNetwork, configuredProgramId, inspectChain} from '../../../../lib/chain-network';

export const runtime = 'nodejs';

async function readPayload(request: Request) {
  const stream = request.body?.getReader();
  if (!stream) throw Error('Missing transaction.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const {value, done} = await stream.read();
    if (done) break;
    size += value.length;
    if (size > 3000) {
      await stream.cancel();
      throw Error('Request too large.');
    }
    chunks.push(value);
  }
  const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  if (typeof body?.transaction !== 'string' || !/^[A-Za-z0-9+/]+={0,2}$/.test(body.transaction)) throw Error('Expected a base64 transaction.');
  return Transaction.from(Buffer.from(body.transaction, 'base64'));
}

async function receiptResponse(c: ReturnType<typeof chainConnection>, address: PublicKey, state: PaymentAccount) {
  const receipts = await c.getSignaturesForAddress(address, {limit:20});
  return Response.json({
    requestId: address.toBase58(),
    signatures: receipts.filter(receipt=>!receipt.err).map(receipt=>receipt.signature),
    status: state.status,
    reason: state.reason,
  });
}

export async function GET(request: Request) {
  if (process.env.VAULTGUARD_AGENT_API !== chainNetwork || !['localnet','devnet'].includes(chainNetwork ?? '')) return Response.json({error:'Agent payment API disabled.'}, {status:503});
  const value = new URL(request.url).searchParams.get('requestId');
  let address: PublicKey;
  try { address = new PublicKey(value ?? ''); }
  catch { return Response.json({error:'Invalid request address.'}, {status:400}); }
  try {
    const c = chainConnection();
    const state = await accounts(c).paymentRequest.fetchNullable(address);
    if (!state) return Response.json({error:'No confirmed receipt yet.'}, {status:404});
    return await receiptResponse(c,address,state);
  } catch {
    return Response.json({error:'RPC or program unavailable.'}, {status:503});
  }
}

export async function POST(request: Request) {
  if (process.env.VAULTGUARD_AGENT_API !== chainNetwork || !['localnet','devnet'].includes(chainNetwork ?? '')) return Response.json({error:'Agent payment API disabled.'}, {status:503});
  let tx: Transaction;
  try {
    tx = await readPayload(request);
    if (!tx.signature || !tx.feePayer || !tx.recentBlockhash || tx.instructions.length !== 1 || !tx.verifySignatures()) throw Error('Invalid signed payment.');
  } catch {
    return Response.json({error:'Valid agent-signed transaction required.'}, {status:400});
  }

  const signature = utils.bytes.bs58.encode(tx.signature!);
  try {
    const c = chainConnection();
    const [ix] = tx.instructions;
    const decoded = new BorshInstructionCoder(chainProgram(c).idl).decode(ix.data);
    if (!ix.programId.equals(configuredProgramId()) || decoded?.name !== 'submitPayment' || ix.keys.length < 8) return Response.json({error:'Unexpected instruction.'}, {status:400});
    const {nonce, amount, expiresAt, recipientLabel} = decoded.data as {nonce:BN; amount:BN; expiresAt:BN; recipientLabel:string};
    if (typeof recipientLabel !== 'string' || !recipientLabel.trim() || Buffer.byteLength(recipientLabel) > 64) return Response.json({error:'Recipient label must have 1 to 64 UTF-8 bytes.'}, {status:400});
    const [vault, recipient] = [ix.keys[1].pubkey, ix.keys[7].pubkey];
    const expected = await submitInstruction(c, tx.feePayer!, vault, recipient, nonce, amount, expiresAt, recipientLabel);
    const original = new Transaction({feePayer: tx.feePayer, blockhash: tx.recentBlockhash!, lastValidBlockHeight: 0}).add(expected.instruction);
    if (!original.serializeMessage().equals(tx.serializeMessage())) return Response.json({error:'Payment accounts do not match the signed request.'}, {status:400});

    await inspectChain(c);
    const result = async () => {
      const state = await accounts(c).paymentRequest.fetchNullable(expected.request) as unknown as PaymentAccount | null;
      if (!state) return null;
      if (!state.recipient.equals(recipient) || !state.amount.eq(amount) || !state.expiresAt.eq(expiresAt) || state.recipientLabel !== recipientLabel) return Response.json({error:'Nonce already belongs to a different request.'}, {status:409});
      return receiptResponse(c,expected.request,state);
    };
    const previous = await result();
    if (previous) return previous;
    try {
      await c.sendRawTransaction(tx.serialize(), {maxRetries:2});
    } catch {
      const settled = await result();
      if (settled) return settled;
      const status = await c.getSignatureStatus(signature, {searchTransactionHistory:true});
      if (status.value?.err) return Response.json({error:'Chain rejected transaction.', signature}, {status:422});
      const block = await c.isBlockhashValid(tx.recentBlockhash!, {commitment:'confirmed'});
      if (!block.value && !status.value) return Response.json({error:'Blockhash expired or belongs to another network.', signature}, {status:409});
    }
    return await result() ?? Response.json({requestId:expected.request.toBase58(), signature, status:'verifying'}, {status:202});
  } catch {
    return Response.json({error:'RPC or program unavailable. Check the signature before retrying.', signature}, {status:503});
  }
}

const fs = require('node:fs');
const { BN, Program } = require('@coral-xyz/anchor');
const { Connection, Keypair, PublicKey, SystemProgram, Transaction } = require('@solana/web3.js');
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const getTokenAddress = (mint, owner) => PublicKey.findProgramAddressSync(
  [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
  ASSOCIATED_TOKEN_PROGRAM_ID,
)[0];

async function main() {
  const [keyFile, vaultAddress, recipientAddress, amountText, nonceText, recipientLabel] = process.argv.slice(2);
  if (!keyFile || !recipientLabel?.trim() || Buffer.byteLength(recipientLabel) > 64 || !/^[1-9]\d{0,19}$/.test(amountText ?? '') || !/^[1-9]\d{0,19}$/.test(nonceText ?? '')) {
    throw Error('Usage: node scripts/submit-agent-payment.cjs <local agent keypair file> <vault> <recipient wallet> <micro-USDC> <nonce> <recipient-label>');
  }
  const amount = new BN(amountText);
  const nonce = new BN(nonceText);
  if (amount.bitLength() > 64 || nonce.bitLength() > 64) throw Error('Amount and nonce must fit into u64.');

  const signer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(keyFile, 'utf8'))));
  const vault = new PublicKey(vaultAddress);
  const recipient = new PublicKey(recipientAddress);
  const mint = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
  const program = new Program(require('../target/idl/agentvault.json'), { connection });
  const derive = (...seeds) => PublicKey.findProgramAddressSync(seeds, program.programId)[0];
  const agent = derive(Buffer.from('agent'), vault.toBuffer(), signer.publicKey.toBuffer());
  const guard = derive(Buffer.from('guard'), vault.toBuffer());
  const request = derive(Buffer.from('request'), agent.toBuffer(), nonce.toArrayLike(Buffer, 'le', 8));
  const existing = await program.account.paymentRequest.fetchNullable(request);
  if (existing) {
    if (!existing.recipient.equals(recipient) || !existing.amount.eq(amount) || existing.recipientLabel !== recipientLabel) throw Error('This nonce is already assigned to a different payment.');
    console.log(JSON.stringify({ requestId:request.toBase58(), status:existing.status, reason:existing.reason }));
    return;
  }
  const account = await program.account.agentRegistration.fetch(agent);
  if (!account.key.equals(signer.publicKey) || !nonce.gt(account.lastNonce)) throw Error('Agent registration or request nonce does not match.');
  const expiresAt = new BN(Math.floor(Date.now() / 1000) + 300);
  const instruction = await program.methods.submitPayment(nonce,amount,expiresAt,recipientLabel).accountsStrict({
    agentSigner:signer.publicKey, vault, agent, request, guard, mint, recipient,
    vaultToken:getTokenAddress(mint,vault),
    recipientToken:getTokenAddress(mint,recipient),
    tokenProgram:TOKEN_PROGRAM_ID, associatedTokenProgram:ASSOCIATED_TOKEN_PROGRAM_ID,
    systemProgram:SystemProgram.programId,
  }).instruction();

  const block = await connection.getLatestBlockhash();
  const tx = new Transaction({ feePayer:signer.publicKey, ...block }).add(instruction);
  tx.sign(signer);
  const response = await fetch('http://127.0.0.1:3000/api/agent/payments', {
    method:'POST', headers:{'content-type':'application/json'},
    body:JSON.stringify({transaction:tx.serialize().toString('base64')}),
    signal:AbortSignal.timeout(15_000),
  });
  console.log(await response.text());
  if (!response.ok) process.exitCode = 1;
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });

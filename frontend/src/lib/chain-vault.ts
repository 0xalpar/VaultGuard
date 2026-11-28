import {BN, EventParser} from '@coral-xyz/anchor';
import {type Connection, PublicKey, SystemProgram, TransactionInstruction} from '@solana/web3.js';
import {Buffer} from 'buffer';
import {vaultAddress} from './agentvault-localnet';
import {chainProgram, TOKEN_PROGRAM_ID, units, USDC_MINT} from './chain-client';
import {configuredProgramId} from './chain-network';

const ATA_PROGRAM = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const meta = (pubkey: PublicKey, isSigner = false, isWritable = false) => ({pubkey,isSigner,isWritable});

function tokenAddress(owner: PublicKey) {
  return PublicKey.findProgramAddressSync([owner.toBuffer(),TOKEN_PROGRAM_ID.toBuffer(),USDC_MINT.toBuffer()],ATA_PROGRAM)[0];
}

export async function initializeVault(c: Connection, owner: PublicKey) {
  const random = crypto.getRandomValues(new Uint8Array(8));
  const id = new BN(random,'le');
  const [vault] = vaultAddress(owner,BigInt(id.toString()),configuredProgramId());
  const instruction = await chainProgram(c).methods.initializeVault(id).accountsStrict({
    owner,mint:USDC_MINT,vault,vaultToken:tokenAddress(vault),
    tokenProgram:TOKEN_PROGRAM_ID,associatedTokenProgram:ATA_PROGRAM,systemProgram:SystemProgram.programId,
  }).instruction();
  return {vault,instructions:[instruction]};
}

export async function vaultTransfer(c: Connection, owner: PublicKey, vault: PublicKey, kind:'deposit'|'withdraw', amount:string) {
  const ownerToken = tokenAddress(owner);
  const quantity = units(amount);
  if (kind==='deposit' && !await c.getAccountInfo(ownerToken)) throw Error('Bağlı cüzdanda test USDC hesabı bulunamadı.');
  const transfer = await chainProgram(c).methods[kind](quantity).accountsStrict({
    owner,vault,mint:USDC_MINT,vaultToken:tokenAddress(vault),ownerToken,tokenProgram:TOKEN_PROGRAM_ID,
  }).instruction();
  if (kind==='deposit') return [transfer];

  // An owner who closed their ATA can still withdraw to the same wallet.
  const createOwnerToken = new TransactionInstruction({
    programId:ATA_PROGRAM,data:Buffer.from([1]),
    keys:[meta(owner,true,true),meta(ownerToken,false,true),meta(owner),meta(USDC_MINT),meta(SystemProgram.programId),meta(TOKEN_PROGRAM_ID)],
  });
  return [createOwnerToken,transfer];
}

export async function vaultMovements(c: Connection, owner: PublicKey, vault: PublicKey) {
  const parser = new EventParser(configuredProgramId(),chainProgram(c).coder);
  const signatures = await c.getSignaturesForAddress(vault,{limit:15},'confirmed');
  const successful = signatures.filter(row=>!row.err);
  if (!successful.length) return [];
  const transactions = await c.getTransactions(successful.map(row=>row.signature),{commitment:'confirmed',maxSupportedTransactionVersion:0});
  return transactions.flatMap((tx,index)=>{
    if (!tx?.meta?.logMessages || tx.meta.err) return [];
    const movements = [];
    for (const event of parser.parseLogs(tx.meta.logMessages)) {
      if (event.name!=='vaultMovement' && event.name!=='vaultCreated') continue;
      const data = event.data as {vault:PublicKey;owner:PublicKey;amount?:BN;withdrawal?:boolean};
      if (!data.vault.equals(vault) || !data.owner.equals(owner)) continue;
      movements.push({
        signature:successful[index].signature, time:successful[index].blockTime,
        label:event.name==='vaultCreated'?'Kasa oluşturuldu':data.withdrawal?'Para çekildi':'Para yatırıldı',
        amount:data.amount?.toString(),
      });
    }
    return movements;
  });
}

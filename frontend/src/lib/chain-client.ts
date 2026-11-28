import {BN, Program, type Idl, utils, type AccountClient} from '@coral-xyz/anchor';
import {Connection, PublicKey, SystemProgram, Transaction, type TransactionInstruction} from '@solana/web3.js';
import {getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {Buffer} from 'buffer';
import idl from '../idl/agentvault.json';
import {localConnection, inspectLocalnet} from './agentvault-localnet';

export const PROGRAM_ID = new PublicKey(idl.address);
export const USDC_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
export const reasonText = ['Tamamlandı','Talep süresi doldu','Agent yetkili değil','Agent ödemeleri durduruldu','Tutar pozitif olmalı','Yasaklı alıcı','İşlem başına limit','Günlük limit','Toplam limit','Yetersiz bakiye','Kullanıcı onayı bekleniyor','Kullanıcı reddetti'];
export const agentStatusText = ['Yetkili','Duraklatıldı','Kullanıcı onayı bekliyor','Yetki iptal edildi'];
export const paymentStatusText = ['Onay bekliyor','Tamamlandı','Reddedildi','Süresi doldu'];
export type ChainPolicy = {dailyLimit: BN; maxTransfer: BN; totalLimit: BN; allowlist: PublicKey[]; denylist: PublicKey[]};
export type AgentAccount = {vault:PublicKey; key:PublicKey; status:number; epoch:BN; lastNonce:BN; day:BN; dailySpent:BN; totalSpent:BN; violations:BN; policy:ChainPolicy};
export type PaymentAccount = {agent:PublicKey; vault:PublicKey; recipient:PublicKey; recipientLabel:string; amount:BN; nonce:BN; expiresAt:BN; createdAt:BN; resolvedAt:BN; status:number; reason:number};
export function accounts(c: Connection) {
  return chainProgram(c).account as unknown as {
    vaultGuard: AccountClient<Idl, never, never, {epoch: BN; frozen: boolean}>;
    agentRegistration: AccountClient<Idl, never, never, AgentAccount>;
    paymentRequest: AccountClient<Idl, never, never, PaymentAccount>;
  };
}
export function chainProgram(c:Connection) { return new Program(idl as Idl, {connection:c}); }
export function guardAddress(vault:PublicKey) {return PublicKey.findProgramAddressSync([Buffer.from('guard'),vault.toBuffer()],PROGRAM_ID)[0];}
export async function currentGuard(c: Connection, vault: PublicKey) {
  const guard = await accounts(c).vaultGuard.fetchNullable(guardAddress(vault));
  return guard ?? {epoch: new BN(0), frozen: false};
}
export function agentAddress(vault:PublicKey,key:PublicKey) {return PublicKey.findProgramAddressSync([Buffer.from('agent'),vault.toBuffer(),key.toBuffer()],PROGRAM_ID)[0];}
export function paymentAddress(agent:PublicKey,nonce:BN) {return PublicKey.findProgramAddressSync([Buffer.from('request'),agent.toBuffer(),nonce.toArrayLike(Buffer,'le',8)],PROGRAM_ID)[0];}
export function units(value:string):BN {
  if(!/^\d+(\.\d{1,6})?$/.test(value))throw Error('En fazla 6 ondalıklı pozitif USDC tutarı girin.');
  const [a,b='']=value.split('.');const n=BigInt(a)*BigInt(1_000_000)+BigInt(b.padEnd(6,'0'));
  if(n<=BigInt(0)||n>BigInt('18446744073709551615'))throw Error('Tutar u64 aralığında ve pozitif olmalı.');
  return new BN(n.toString());
}
export async function chainAgents(c:Connection,vault:PublicKey) {
  const rows=await accounts(c).agentRegistration.all([{memcmp:{offset:8,bytes:vault.toBase58()}}]);
  return rows.map(r=>({address:r.publicKey,account:r.account as unknown as AgentAccount}));
}
export async function chainPayments(c:Connection,vault:PublicKey) {
  const rows=await accounts(c).paymentRequest.all([{memcmp:{offset:40,bytes:vault.toBase58()}}]);
  return rows.map(r=>({address:r.publicKey,account:r.account as unknown as PaymentAccount})).sort((a,b)=>b.account.createdAt.cmp(a.account.createdAt));
}
export async function agentInstruction(c:Connection,owner:PublicKey,vault:PublicKey,key:PublicKey,policy:ChainPolicy,existing=false) {
  if(!PublicKey.isOnCurve(key.toBytes()))throw Error('Agent için imzalanabilir bir public key girin.');
  const p=chainProgram(c),agent=agentAddress(vault,key);
  return existing?p.methods.updateAgentPolicy(policy).accountsStrict({owner,vault,agent,guard:guardAddress(vault)}).instruction():p.methods.registerAgent(key,policy).accountsStrict({owner,vault,agent,guard:guardAddress(vault),systemProgram:SystemProgram.programId}).instruction();
}
export async function statusInstruction(c:Connection,owner:PublicKey,vault:PublicKey,agent:PublicKey,status:number) {
  return chainProgram(c).methods.setAgentStatus(status).accountsStrict({owner,vault,agent,guard:guardAddress(vault)}).instruction();
}
export async function resolveInstruction(c:Connection,owner:PublicKey,request:PublicKey,r:PaymentAccount,approved:boolean) {
  return chainProgram(c).methods.resolvePayment(approved).accountsStrict({owner,vault:r.vault,agent:r.agent,guard:guardAddress(r.vault),request,mint:USDC_MINT,vaultToken:getAssociatedTokenAddressSync(USDC_MINT,r.vault,true),recipientToken:getAssociatedTokenAddressSync(USDC_MINT,r.recipient,true),tokenProgram:TOKEN_PROGRAM_ID}).instruction();
}
export async function submitInstruction(c:Connection,key:PublicKey,vault:PublicKey,recipient:PublicKey,nonce:BN,amount:BN,expiresAt:BN,recipientLabel:string) {
  const agent=agentAddress(vault,key),request=paymentAddress(agent,nonce);
  const instruction=await chainProgram(c).methods.submitPayment(nonce,amount,expiresAt,recipientLabel).accountsStrict({agentSigner:key,vault,agent,guard:guardAddress(vault),request,mint:USDC_MINT,vaultToken:getAssociatedTokenAddressSync(USDC_MINT,vault,true),recipient,recipientToken:getAssociatedTokenAddressSync(USDC_MINT,recipient,true),tokenProgram:TOKEN_PROGRAM_ID,associatedTokenProgram:ASSOCIATED_TOKEN_PROGRAM_ID,systemProgram:SystemProgram.programId}).instruction();
  return {instruction,request};
}
export async function sendOwnerTransaction(owner:PublicKey,instructions:TransactionInstruction[],sign:(tx:Transaction)=>Promise<Transaction>,onSigned:(signature:string)=>void) {
  const c=localConnection();await inspectLocalnet(c);
  const block=await c.getLatestBlockhash('confirmed');
  const tx=new Transaction({feePayer:owner,...block}).add(...instructions);
  const signed=await sign(tx);
  if(!signed.signature||!signed.verifySignatures())throw Error('Cüzdan işlem imzası geçersiz.');
  const signature=utils.bytes.bs58.encode(signed.signature); onSigned(signature);
  try {
    await c.sendRawTransaction(signed.serialize(),{skipPreflight:false,maxRetries:3});
    const result=await c.confirmTransaction({...block,signature},'confirmed');
    if(result.value.err)throw Error(JSON.stringify(result.value.err));
    return signature;
  }catch(error){
    const result=await c.getSignatureStatus(signature,{searchTransactionHistory:true}).catch(()=>null);
    if(result?.value?.err)throw Error(`Zincir işlemi reddetti: ${JSON.stringify(result.value.err)}`);
    if(result?.value?.confirmationStatus==='confirmed'||result?.value?.confirmationStatus==='finalized')return signature;
    throw Error(`İşlem sonucu henüz doğrulanamadı. Aynı işlemi yeniden oluşturmayın; imzayı geçmişten kontrol edin. ${error instanceof Error?error.message:''}`);
  }
}

import { Connection, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
import idl from '../idl/agentvault.json';

const PROGRAM = new PublicKey(idl.address);
const MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
const TOKEN = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const ATA = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const DISC = Buffer.from([211,8,232,43,2,152,117,119]);
export function localConnection() {
  const rpc = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;
  const ws = process.env.NEXT_PUBLIC_SOLANA_WS_URL;
  if (process.env.NEXT_PUBLIC_SOLANA_NETWORK !== 'localnet' || rpc !== 'http://127.0.0.1:8899' || ws !== 'ws://127.0.0.1:8900' || process.env.NEXT_PUBLIC_AGENTVAULT_PROGRAM_ID !== PROGRAM.toBase58() || process.env.NEXT_PUBLIC_USDC_MINT !== MINT.toBase58()) throw Error('Localnet ortam değişkenleri eksik veya IDL ile uyumsuz.');
  return new Connection(rpc, { commitment: 'confirmed', wsEndpoint: ws, disableRetryOnRateLimit: true });
}
export function vaultAddress(owner: PublicKey, id: bigint, program = PROGRAM) {
  const bytes = Buffer.alloc(8); bytes.writeBigUInt64LE(id);
  return PublicKey.findProgramAddressSync([Buffer.from('vault'), owner.toBuffer(), bytes], program);
}
export function formatUnits(n: bigint, decimals=6) {
  const base=BigInt(10)**BigInt(decimals); return `${n/base}.${(n%base).toString().padStart(decimals,'0')}`;
}
export async function inspectLocalnet(c: Connection, programId = PROGRAM) {
  const [version, program, mint] = await Promise.all([c.getVersion(), c.getAccountInfo(programId), c.getAccountInfo(MINT)]);
  if (!program?.executable || !program.owner.equals(new PublicKey('BPFLoaderUpgradeab1e11111111111111111111111'))) throw Error('Beklenen çalıştırılabilir program bulunamadı.');
  if (!mint || !mint.owner.equals(TOKEN) || mint.data.length!==82 || mint.data[44]!==6 || mint.data[45]!==1) throw Error('Test mint hesabı geçersiz.');
  return {version:version['solana-core'], program:programId.toBase58(), mint:MINT.toBase58(), supply:formatUnits(mint.data.readBigUInt64LE(36))};
}
export async function readVaults(c: Connection, address: string, programId = PROGRAM) {
  const owner = new PublicKey(address);
  const rows = await c.getProgramAccounts(programId,{filters:[{dataSize:82},{memcmp:{offset:8,bytes:owner.toBase58()}}]});
  // Vault Borsh: discriminator(8), owner(32), mint(32), id(8), bump(1), frozen(1).
  return Promise.all(rows.map(async ({pubkey,account})=>{
    const d=account.data;
    if (!d.subarray(0,8).equals(DISC) || !new PublicKey(d.subarray(8,40)).equals(owner) || !new PublicKey(d.subarray(40,72)).equals(MINT) || d[81]>1) throw Error('Geçersiz Vault hesabı.');
    const id=d.readBigUInt64LE(72); const [expected,bump]=vaultAddress(owner,id,programId);
    if (!expected.equals(pubkey)||bump!==d[80]) throw Error('Vault PDA doğrulanamadı.');
    const [token]=PublicKey.findProgramAddressSync([pubkey.toBuffer(),TOKEN.toBuffer(),MINT.toBuffer()],ATA);
    const a=await c.getAccountInfo(token);
    if (!a || !a.owner.equals(TOKEN)||a.data.length!==165||!new PublicKey(a.data.subarray(0,32)).equals(MINT)||!new PublicKey(a.data.subarray(32,64)).equals(pubkey)||![1,2].includes(a.data[108])) throw Error('Vault token hesabı doğrulanamadı.');
    return {address:pubkey.toBase58(),id:id.toString(),frozen:d[81]===1,balance:formatUnits(a.data.readBigUInt64LE(64))};
  }));
}

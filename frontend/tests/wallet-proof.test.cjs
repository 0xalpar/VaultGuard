const {test}=require('node:test');
const assert=require('node:assert/strict');
const {webcrypto}=require('node:crypto');
globalThis.crypto=webcrypto;
const {publicKeyBytes,createProof,verifyProof,PROOF_TTL}=require('../.wallet-build/wallet-proof.js');
const alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
function encode(bytes){let n=BigInt('0x'+Buffer.from(bytes).toString('hex')),s='';while(n){s=alphabet[Number(n%58n)]+s;n/=58n;}let zeros=0;while(zeros<bytes.length&&bytes[zeros]===0)zeros++;return '1'.repeat(zeros)+s;}
async function pair(){const key=await webcrypto.subtle.generateKey('Ed25519',true,['sign','verify']);const raw=new Uint8Array(await webcrypto.subtle.exportKey('raw',key.publicKey));return {key,address:encode(raw),raw};}
test('base58 public key round trips and leading zero bytes',async()=>{const {raw,address}=await pair();assert.deepEqual(publicKeyBytes(address),raw);assert.deepEqual(publicKeyBytes('1'.repeat(32)),new Uint8Array(32));});
test('invalid base58 and length rejected',()=>{for(const s of ['','0'.repeat(32),'1'.repeat(33),'z'.repeat(44)])assert.throws(()=>publicKeyBytes(s));});
test('challenge uses address, origin, unique nonce, expiry and no transfer authorization',async()=>{const {address}=await pair();const now=Date.now(),a=createProof(address,'http://localhost:3000',now),b=createProof(address,'http://localhost:3000',now);const msg=new TextDecoder().decode(a.message);assert.ok(msg.includes(address));assert.ok(msg.includes('http://localhost:3000'));assert.ok(msg.includes('harcama yetkisi vermez'));assert.equal(a.expiresAt,now+PROOF_TTL);assert.notDeepEqual(a.message,b.message);});
test('real Ed25519 signature verifies',async()=>{const {key,address}=await pair();const {message}=createProof(address,'http://localhost:3000');const sig=new Uint8Array(await webcrypto.subtle.sign('Ed25519',key.privateKey,message));assert.equal(await verifyProof(address,message,sig),true);});
test('tampered message fails',async()=>{const {key,address}=await pair();const {message}=createProof(address,'http://localhost:3000');const sig=new Uint8Array(await webcrypto.subtle.sign('Ed25519',key.privateKey,message));message[0]^=1;assert.equal(await verifyProof(address,message,sig),false);});
test('wrong public key, changed signature and wrong length fail',async()=>{const {key,address}=await pair();const other=await pair();const {message}=createProof(address,'http://localhost:3000');const sig=new Uint8Array(await webcrypto.subtle.sign('Ed25519',key.privateKey,message));assert.equal(await verifyProof(other.address,message,sig),false);sig[0]^=1;assert.equal(await verifyProof(address,message,sig),false);assert.equal(await verifyProof(address,message,new Uint8Array(63)),false);});

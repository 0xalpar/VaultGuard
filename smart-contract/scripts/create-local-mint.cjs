// Synthetic mint at the Devnet address, ONLY for a disposable local validator.
const fs = require('node:fs');
const {PublicKey} = require('@solana/web3.js');
const {TOKEN_PROGRAM_ID} = require('@solana/spl-token');
const mint = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU';
const authority = new PublicKey(process.argv[2]);
const data = Buffer.alloc(82);
data.writeUInt32LE(1,0); authority.toBuffer().copy(data,4);
data.writeBigUInt64LE(0n,36); data[44]=6; data[45]=1;
// Freeze authority = None. Mint authority is the local test wallet only.
fs.mkdirSync('fixtures',{recursive:true});
fs.writeFileSync('fixtures/devnet-usdc.json', JSON.stringify({pubkey:mint,account:{lamports:10000000,data:[data.toString('base64'),'base64'],owner:TOKEN_PROGRAM_ID.toBase58(),executable:false,rentEpoch:0,space:82}},null,2));
console.log('Synthetic mint fixture created; never use it outside localnet.');

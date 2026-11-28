const assert = require('node:assert/strict');
const {Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction, sendAndConfirmTransaction} = require('@solana/web3.js');
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
const meta = (pubkey, isSigner = false, isWritable = false) => ({pubkey, isSigner, isWritable});

function onlyLocal(connection) {
  const endpoint = new URL(connection.rpcEndpoint);
  assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(endpoint.hostname), 'Local validator required for token fixtures');
}

function getAssociatedTokenAddressSync(mint, owner) {
  return PublicKey.findProgramAddressSync(
    [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  )[0];
}

function send(connection, signers, ...instructions) {
  onlyLocal(connection);
  return sendAndConfirmTransaction(connection, new Transaction().add(...instructions), signers, {commitment:'confirmed'});
}

async function getOrCreateAssociatedTokenAccount(connection, payer, mint, owner) {
  onlyLocal(connection);
  const address = getAssociatedTokenAddressSync(mint, owner);
  const existing = await connection.getAccountInfo(address);
  if (existing) {
    assert.ok(existing.owner.equals(TOKEN_PROGRAM_ID) && existing.data.length === 165);
    assert.ok(existing.data.subarray(0,32).equals(mint.toBuffer()));
    assert.ok(existing.data.subarray(32,64).equals(owner.toBuffer()));
    return {address};
  }
  await send(connection, [payer], new TransactionInstruction({
    programId: ASSOCIATED_TOKEN_PROGRAM_ID,
    data: Buffer.from([1]), // CreateIdempotent
    keys: [meta(payer.publicKey,true,true), meta(address,false,true), meta(owner), meta(mint), meta(SystemProgram.programId), meta(TOKEN_PROGRAM_ID)],
  }));
  return {address};
}

async function mintTo(connection, payer, mint, destination, authority, amount) {
  const data = Buffer.alloc(9);
  data[0] = 7; // MintTo
  data.writeBigUInt64LE(amount,1);
  const signers = payer.publicKey.equals(authority.publicKey) ? [payer] : [payer,authority];
  return send(connection,signers,new TransactionInstruction({
    programId:TOKEN_PROGRAM_ID, data,
    keys:[meta(mint,false,true),meta(destination,false,true),meta(authority.publicKey,true)],
  }));
}

async function getAccount(connection, address) {
  onlyLocal(connection);
  const info = await connection.getAccountInfo(address);
  assert.ok(info?.owner.equals(TOKEN_PROGRAM_ID), 'Expected a legacy SPL Token account');
  assert.equal(info.data.length,165);
  assert.ok([1,2].includes(info.data[108]), 'Expected an initialized token account');
  return {amount:info.data.readBigUInt64LE(64)};
}

async function createMint(connection, payer, authority, freezeAuthority, decimals) {
  onlyLocal(connection);
  assert.equal(freezeAuthority,null);
  const key = Keypair.generate();
  const rent = await connection.getMinimumBalanceForRentExemption(82);
  const data = Buffer.concat([Buffer.from([20,decimals]),authority.toBuffer(),Buffer.from([0])]); // InitializeMint2, no freeze authority
  await send(connection,[payer,key],
    SystemProgram.createAccount({fromPubkey:payer.publicKey,newAccountPubkey:key.publicKey,lamports:rent,space:82,programId:TOKEN_PROGRAM_ID}),
    new TransactionInstruction({programId:TOKEN_PROGRAM_ID,data,keys:[meta(key.publicKey,false,true)]}),
  );
  return key.publicKey;
}

module.exports = {TOKEN_PROGRAM_ID,ASSOCIATED_TOKEN_PROGRAM_ID,getAssociatedTokenAddressSync,getOrCreateAssociatedTokenAccount,mintTo,getAccount,createMint};

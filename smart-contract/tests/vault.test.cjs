const {test} = require('node:test');
const assert = require('node:assert/strict');
const anchor = require('@coral-xyz/anchor');
const {PublicKey, Keypair, SystemProgram} = require('@solana/web3.js');
const spl = require('@solana/spl-token');
const mint = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');

test('Vault PDA lifecycle and authorization (local validator only)', async t => {
  const provider = anchor.AnchorProvider.env();
  const endpoint = new URL(provider.connection.rpcEndpoint);
  assert.ok(['localhost','127.0.0.1','[::1]'].includes(endpoint.hostname), 'Local validator required');
  anchor.setProvider(provider);
  const program = new anchor.Program(require('../target/idl/agentvault.json'),provider);
  const payer = provider.wallet.payer;
  const owner = provider.wallet.publicKey;
  const id = new anchor.BN(Date.now());
  const [vault] = PublicKey.findProgramAddressSync([Buffer.from('vault'),owner.toBuffer(),id.toArrayLike(Buffer,'le',8)],program.programId);
  const vaultToken = spl.getAssociatedTokenAddressSync(mint,vault,true);
  const ownerToken = (await spl.getOrCreateAssociatedTokenAccount(provider.connection,payer,mint,owner)).address;
  await spl.mintTo(provider.connection,payer,mint,ownerToken,payer,100_000_000n);
  const init = {owner,mint,vault,vaultToken,tokenProgram:spl.TOKEN_PROGRAM_ID,associatedTokenProgram:spl.ASSOCIATED_TOKEN_PROGRAM_ID,systemProgram:SystemProgram.programId};
  const transfer = {owner,mint,vault,vaultToken,ownerToken,tokenProgram:spl.TOKEN_PROGRAM_ID};
  const balance = async () => (await spl.getAccount(provider.connection,vaultToken)).amount;
  const amount = n=>new anchor.BN(n);
  await t.test('create vault and recover owner from chain',async()=>{
    await program.methods.initializeVault(id).accountsStrict(init).rpc();
    const state=await program.account.vault.fetch(vault);
    assert.ok(state.owner.equals(owner)); assert.ok(state.mint.equals(mint)); assert.equal(state.frozen,false);
    assert.equal(await balance(),0n);
    const records=await program.account.vault.all([{memcmp:{offset:8,bytes:owner.toBase58()}}]);
    assert.ok(records.some(r=>r.publicKey.equals(vault)));
  });
  await t.test('deposit 25 USDC',async()=>{await program.methods.deposit(amount(25_000_000)).accountsStrict(transfer).rpc(); assert.equal(await balance(),25_000_000n);});
  await t.test('reject zero and excessive withdrawals',async()=>{
    await assert.rejects(program.methods.withdraw(amount(0)).accountsStrict(transfer).rpc(),/ZeroAmount|positive/i);
    await assert.rejects(program.methods.withdraw(amount(26_000_000)).accountsStrict(transfer).rpc(),/InsufficientBalance|Insufficient vault/i);
    assert.equal(await balance(),25_000_000n);
  });
  await t.test('reject attacker freeze and withdrawal',async()=>{
    const attacker=Keypair.generate();
    await assert.rejects(program.methods.setFrozen(true).accountsStrict({owner:attacker.publicKey,vault}).signers([attacker]).rpc());
    await assert.rejects(program.methods.withdraw(amount(1)).accountsStrict({...transfer,owner:attacker.publicKey}).signers([attacker]).rpc());
    assert.equal((await program.account.vault.fetch(vault)).frozen,false); assert.equal(await balance(),25_000_000n);
  });
  await t.test('agent stop preserves owner withdrawal and deposit',async()=>{
    await program.methods.setFrozen(true).accountsStrict({owner,vault}).rpc();
    assert.equal((await program.account.vault.fetch(vault)).frozen,true);
    const before=(await spl.getAccount(provider.connection,ownerToken)).amount;
    await program.methods.withdraw(amount(1_000_000)).accountsStrict(transfer).rpc();
    assert.equal((await spl.getAccount(provider.connection,ownerToken)).amount,before+1_000_000n);
    assert.equal((await program.account.vault.fetch(vault)).frozen,true);
    await program.methods.deposit(amount(5_000_000)).accountsStrict(transfer).rpc(); assert.equal(await balance(),29_000_000n);
  });
  await t.test('unfreeze and withdraw 10 USDC',async()=>{
    await program.methods.setFrozen(false).accountsStrict({owner,vault}).rpc();
    const before=(await spl.getAccount(provider.connection,ownerToken)).amount;
    await program.methods.withdraw(amount(10_000_000)).accountsStrict(transfer).rpc();
    assert.equal(await balance(),19_000_000n); assert.equal((await spl.getAccount(provider.connection,ownerToken)).amount,before+10_000_000n);
  });
  await t.test('reject alternate mint',async()=>{
    const other=await spl.createMint(provider.connection,payer,owner,null,6);
    const next=id.addn(1);const [v]=PublicKey.findProgramAddressSync([Buffer.from('vault'),owner.toBuffer(),next.toArrayLike(Buffer,'le',8)],program.programId);
    await assert.rejects(program.methods.initializeVault(next).accountsStrict({...init,mint:other,vault:v,vaultToken:spl.getAssociatedTokenAddressSync(other,v,true)}).rpc(),/WrongMint|configured Devnet/i);
  });
});

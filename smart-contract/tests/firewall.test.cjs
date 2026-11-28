const {test}=require('node:test');
const assert=require('node:assert/strict');
const anchor=require('@coral-xyz/anchor');
const {Keypair, PublicKey, SystemProgram, LAMPORTS_PER_SOL}=require('@solana/web3.js');
const spl=require('@solana/spl-token');
const mint=new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
const n=x=>new anchor.BN(x);

test('agent payment lifecycle on the isolated local validator', async () => {
  const provider=anchor.AnchorProvider.env();
  const c=provider.connection;
  assert.equal(new URL(c.rpcEndpoint).hostname,'127.0.0.1');
  const owner=provider.wallet.publicKey, payer=provider.wallet.payer;
  const p=new anchor.Program(require('../target/idl/agentvault.json'),provider);
  const pda=(...seeds)=>PublicKey.findProgramAddressSync(seeds,p.programId)[0];
  const pub=k=>k.toBuffer();
  const le=x=>n(x).toArrayLike(Buffer,'le',8);
  const ata=k=>spl.getAssociatedTokenAddressSync(mint,k,true);
  const sys=SystemProgram.programId, tokenProgram=spl.TOKEN_PROGRAM_ID, associatedTokenProgram=spl.ASSOCIATED_TOKEN_PROGRAM_ID;
  const id=n(901);
  const vault=pda(Buffer.from('vault'),pub(owner),le(id));
  const guard=pda(Buffer.from('guard'),pub(vault)), vaultToken=ata(vault);
  await p.methods.initializeVault(id).accountsStrict({owner,mint,vault,vaultToken,tokenProgram,associatedTokenProgram,systemProgram:sys}).rpc();
  const ownerToken=(await spl.getOrCreateAssociatedTokenAccount(c,payer,mint,owner)).address;
  await spl.mintTo(c,payer,mint,ownerToken,payer,100_000_000n);
  await p.methods.deposit(n(100_000_000)).accountsStrict({owner,mint,vault,vaultToken,ownerToken,tokenProgram}).rpc();

  const signer=Keypair.generate();
  const allowed=Keypair.generate().publicKey, pending=Keypair.generate().publicKey, denied=Keypair.generate().publicKey;
  const agent=pda(Buffer.from('agent'),pub(vault),pub(signer.publicKey));
  const block=await c.getLatestBlockhash();
  const funding=await c.requestAirdrop(signer.publicKey,LAMPORTS_PER_SOL);
  assert.equal((await c.confirmTransaction({...block,signature:funding},'confirmed')).value.err,null);
  const policy={dailyLimit:n(20_000_000),maxTransfer:n(15_000_000),totalLimit:n(40_000_000),allowlist:[allowed,denied],denylist:[denied]};
  await p.methods.registerAgent(signer.publicKey,policy).accountsStrict({owner,vault,agent,guard,systemProgram:sys}).rpc();
  const expiry=n(Math.floor(Date.now()/1000)+600);
  const submit=(nonce,amount,recipient)=> {
    const request=pda(Buffer.from('request'),pub(agent),le(nonce));
    const builder=p.methods.submitPayment(n(nonce),n(amount),expiry,'Yerel test alıcısı').accountsStrict({agentSigner:signer.publicKey,vault,agent,request,guard,mint,vaultToken,recipient,recipientToken:ata(recipient),tokenProgram,associatedTokenProgram,systemProgram:sys});
    return {request,builder};
  };
  const state=()=>p.account.agentRegistration.fetch(agent);
  const receipt=request=>p.account.paymentRequest.fetch(request);
  async function send(nonce,amount,recipient) {
    const {request,builder}=submit(nonce,amount,recipient);
    await builder.signers([signer]).rpc();
    return {request,...await receipt(request)};
  }
  async function resolve(request,recipient,approved=true) {
    await p.methods.resolvePayment(approved).accountsStrict({owner,vault,agent,request,guard,mint,vaultToken,recipientToken:ata(recipient),tokenProgram}).rpc();
    return receipt(request);
  }

  await assert.rejects(submit(1,1,allowed).builder.rpc(),/signature/i);
  assert.equal((await state()).violations.toNumber(),0);
  const payment=await send(1,10_000_000,allowed);
  assert.equal(payment.status,1);
  assert.equal(payment.recipientLabel,'Yerel test alıcısı');
  assert.equal((await spl.getAccount(c,ata(allowed))).amount,10_000_000n);
  await assert.rejects(submit(1,9_000_000,allowed).builder.signers([signer]).rpc());
  assert.equal((await spl.getAccount(c,ata(allowed))).amount,10_000_000n);

  const waiting=await send(2,5_000_000,pending);
  assert.equal(waiting.status,0);
  assert.equal((await spl.getAccount(c,ata(pending))).amount,0n);
  assert.equal((await resolve(waiting.request,pending)).status,1);
  await assert.rejects(resolve(waiting.request,pending,false),/AlreadyResolved|already resolved/i);

  const old=await send(3,1,pending);
  const emergency=frozen=>p.methods.setAgentEmergency(frozen).accountsStrict({owner,vault,guard,systemProgram:sys}).rpc();
  const status=status=>p.methods.setAgentStatus(status).accountsStrict({owner,vault,agent,guard}).rpc();
  await emergency(true);
  await emergency(false);
  assert.equal((await send(4,1,allowed)).reason,3);
  await status(0);
  assert.equal((await resolve(old.request,pending)).reason,3);

  for(let i=0;i<5;i++) {
    const r=await send(5+i,1,denied);
    assert.equal(r.reason,5);
    assert.equal((await state()).status,i===4?2:0);
  }
  assert.equal((await send(10,1,allowed)).reason,2);
  await status(0);
  const resumed=await state();
  assert.equal(resumed.violations.toNumber(),0);
  assert.equal(resumed.totalSpent.toNumber(),15_000_000);
  assert.equal((await send(11,6_000_000,allowed)).reason,7);
  const queuedA=await send(12,3_000_000,pending);
  const queuedB=await send(13,3_000_000,pending);
  assert.equal(queuedA.status,0);
  assert.equal(queuedB.status,0);
  const resolved=await Promise.allSettled([
    resolve(queuedA.request,pending),
    resolve(queuedB.request,pending),
  ]);
  assert.ok(resolved.every(result=>result.status==='fulfilled'));
  assert.deepEqual(resolved.map(result=>result.value.status).sort(),[1,2]);
  assert.equal(resolved.find(result=>result.value.status===2).value.reason,7);

  const last=await send(14,1,pending);
  await status(3);
  assert.equal((await resolve(last.request,pending)).reason,2);
  assert.equal((await spl.getAccount(c,vaultToken)).amount,82_000_000n);
});

const {test}=require('node:test');
const assert=require('node:assert/strict');
const anchor=require('@coral-xyz/anchor');
const {Keypair, PublicKey, SystemProgram, LAMPORTS_PER_SOL}=require('@solana/web3.js');
const spl=require('./local-token-fixtures.cjs');
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
  const submit=(nonce,amount,recipient,label='Yerel test alıcısı')=> {
    const request=pda(Buffer.from('request'),pub(agent),le(nonce));
    const builder=p.methods.submitPayment(n(nonce),n(amount),expiry,label).accountsStrict({agentSigner:signer.publicKey,vault,agent,request,guard,mint,vaultToken,recipient,recipientToken:ata(recipient),tokenProgram,associatedTokenProgram,systemProgram:sys});
    return {request,builder};
  };
  const state=()=>p.account.agentRegistration.fetch(agent);
  const receipt=request=>p.account.paymentRequest.fetch(request);
  async function send(nonce,amount,recipient,label) {
    const {request,builder}=submit(nonce,amount,recipient,label);
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

  const label='Onaylandı — alıcı etiketi';
  const waiting=await send(2,5_000_000,pending,label);
  assert.equal(waiting.recipientLabel,label);
  assert.equal(waiting.reason,10);
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
  const batchSize=Number(process.env.VAULTGUARD_LOAD_COUNT ?? 2);
  assert.ok(Number.isInteger(batchSize)&&batchSize>=2&&batchSize<=32);
  const paymentAmount=batchSize===2?3_000_000:1_000_000;
  const expectedPaid=Math.min(batchSize,Math.floor(5_000_000/paymentAmount));
  const queue=[];
  for(let i=0;i<batchSize;i++) {
    const entry=await send(12+i,paymentAmount,pending);
    assert.equal(entry.status,0);
    queue.push(entry);
  }

  const start=performance.now();
  const resolved=await Promise.allSettled(queue.map(({request})=>resolve(request,pending)));
  const failures=resolved.filter(result=>result.status==='rejected');
  assert.deepEqual(failures,[]);
  const receipts=resolved.map(result=>result.value);
  assert.equal(receipts.filter(entry=>entry.status===1).length,expectedPaid);
  const deniedByLimits=receipts.filter(entry=>entry.status===2);
  assert.equal(deniedByLimits.length,batchSize-expectedPaid);
  assert.ok(deniedByLimits.every(entry=>entry.reason===7||entry.reason===2));
  if(batchSize>2) console.log({batchSize, paid:expectedPaid, refused:deniedByLimits.length, elapsedMs:Math.round(performance.now()-start)});

  await status(0);
  await p.methods.updateAgentPolicy({...policy,dailyLimit:n(21_000_000)}).accountsStrict({owner,vault,agent,guard}).rpc();
  const last=await send(12+batchSize,1,pending);
  await status(3);
  assert.equal((await resolve(last.request,pending)).reason,2);
  assert.equal((await spl.getAccount(c,vaultToken)).amount,85_000_000n-BigInt(expectedPaid*paymentAmount));
  const otherOwner=Keypair.generate();
  const otherFunding=await c.requestAirdrop(otherOwner.publicKey,LAMPORTS_PER_SOL);
  await c.confirmTransaction(otherFunding,'confirmed');
  const secondVault=pda(Buffer.from('vault'),pub(otherOwner.publicKey),le(id));
  const secondGuard=pda(Buffer.from('guard'),pub(secondVault));
  const secondAgent=pda(Buffer.from('agent'),pub(secondVault),pub(signer.publicKey));
  const otherKey=Keypair.generate().publicKey;
  const thirdAgent=pda(Buffer.from('agent'),pub(secondVault),pub(otherKey));
  await p.methods.initializeVault(id).accountsStrict({
    owner:otherOwner.publicKey,mint,vault:secondVault,vaultToken:ata(secondVault),
    tokenProgram,associatedTokenProgram,systemProgram:sys,
  }).signers([otherOwner]).rpc();
  for(const [agentId,key] of [[secondAgent,signer.publicKey],[thirdAgent,otherKey]]) {
    await p.methods.registerAgent(key,policy).accountsStrict({
      owner:otherOwner.publicKey,vault:secondVault,agent:agentId,guard:secondGuard,systemProgram:sys,
    }).signers([otherOwner]).rpc();
  }
  await assert.rejects(p.methods.updateAgentPolicy(policy).accountsStrict({
    owner:otherOwner.publicKey,vault,agent,guard,
  }).signers([otherOwner]).rpc(),/ConstraintHasOne/);
  assert.equal((await state()).status,3);
  assert.notEqual(secondAgent.toBase58(),agent.toBase58());
  assert.equal((await p.account.agentRegistration.fetch(secondAgent)).status,0);
  assert.equal((await p.account.agentRegistration.fetch(thirdAgent)).totalSpent.toNumber(),0);

});

const { test } = require('node:test');
const assert = require('node:assert/strict');
const {parseUsdc: u,simulateTransfer: run,setDemoFrozen,setDemoAgentStatus,demoDeposit,demoWithdraw,resolveDemoApproval,policyDay} = require('../.policy-build/agentvault-policy.js');
const now = Date.parse('2026-11-27T10:00:00Z');
const fresh = () => ({id:'demo-vault',ownerPublicKey:'demo-owner',frozen:false,balance:u('100'),logs:[],ownerMovements:[],agents:[{id:'a',publicKey:'demo-key-a',status:'active',day:'2026-11-27',dailySpent:0,totalSpent:0,violations:0,lastNonce:0,policy:{dailyLimit:u('40'),maxTransfer:u('25'),totalLimit:u('60'),allowlistEnabled:true,allowlist:['demo-recipient','demo-denied'],denylist:['demo-denied']}}]});
const req = (overrides={})=>({vaultId:'demo-vault',agentId:'a',agentPublicKey:'demo-key-a',recipientWallet:'demo-recipient',recipientIdentity:'Demo recipient',amount:u('10'),nonce:1,expiresAt:now+86400000*3,...overrides});
test('USDC precision',()=>{assert.equal(u('1,000001'),1000001);assert.throws(()=>u('0.0000001'));});
test('approval, balances and logs',()=>{const s=fresh(); const r=run(s,req(),'demo-key-a',now);assert.equal(r.entry.decision,'approved');assert.equal(r.state.balance,u('90'));assert.equal(r.state.agents[0].dailySpent,u('10'));assert.equal(s.balance,u('100'));assert.equal(r.state.logs.length,1);});
test('wrong signer never penalizes victim',()=>{const r=run(fresh(),req(),'attacker',now);assert.equal(r.entry.reason,'IDENTITY_NOT_VERIFIED');assert.equal(r.state.agents[0].violations,0);});
test('unknown agent and wrong vault',()=>{assert.equal(run(fresh(),req({agentId:'unknown'}),'demo-key-a',now).entry.reason,'UNKNOWN_AGENT');assert.equal(run(fresh(),req({vaultId:'other'}),'demo-key-a',now).entry.reason,'WRONG_VAULT');});
test('denylist overrides allowlist; blank allowlist requires approval',()=>{assert.equal(run(fresh(),req({recipientWallet:'demo-denied'}),'demo-key-a',now).entry.reason,'DENYLIST'); const s=fresh();s.agents[0].policy.allowlist=[];assert.equal(run(s,req(),'demo-key-a',now).entry.reason,'NOT_ALLOWLISTED');});
test('positive amounts and maximum',()=>{assert.equal(run(fresh(),req({amount:u('0.000001')}),'demo-key-a',now).entry.decision,'approved');assert.equal(run(fresh(),req({amount:0}),'demo-key-a',now).entry.reason,'INVALID_REQUEST');assert.equal(run(fresh(),req({amount:u('26')}),'demo-key-a',now).entry.reason,'ABOVE_MAXIMUM');});
test('daily and lifetime limits',()=>{let s=run(fresh(),req({amount:u('25')}),'demo-key-a',now).state;assert.equal(run(s,req({amount:u('20'),nonce:2}),'demo-key-a',now).entry.reason,'DAILY_LIMIT');s.agents[0].totalSpent=u('55');assert.equal(run(s,req({nonce:2}),'demo-key-a',now).entry.reason,'TOTAL_LIMIT');});
test('Calendar day rollover preserves total',()=>{let s=run(fresh(),req({amount:u('25')}),'demo-key-a',now).state;const r=run(s,req({amount:u('20'),nonce:2}),'demo-key-a',now+86400000);assert.equal(r.entry.decision,'approved');assert.equal(r.state.agents[0].dailySpent,u('20'));assert.equal(r.state.agents[0].totalSpent,u('45'));});
test('fifth authenticated policy violation suspends; resume resets violations not spend',()=>{let s=fresh();for(let i=1;i<=5;i++){s=run(s,req({amount:u('30'),nonce:i}),'demo-key-a',now).state;}assert.equal(s.agents[0].status,'suspended');assert.equal(s.balance,u('100'));assert.equal(s.logs.length,5);assert.equal(run(s,req({nonce:6}),'demo-key-a',now).entry.reason,'AGENT_INACTIVE');s=setDemoAgentStatus(s,'a','active');assert.equal(s.agents[0].violations,0);assert.equal(s.agents[0].lastNonce,5);assert.equal(run(s,req({nonce:6}),'demo-key-a',now).entry.decision,'approved');});
test('freeze and revocation',()=>{const s=setDemoFrozen(fresh(),true);assert.equal(run(s,req(),'demo-key-a',now).entry.reason,'VAULT_FROZEN');assert.equal(demoWithdraw(s,u('1'),now).balance,u('99'));const revoked=setDemoAgentStatus(fresh(),'a','revoked');assert.equal(setDemoAgentStatus(revoked,'a','active').agents[0].status,'revoked');assert.equal(run(revoked,req(),'demo-key-a',now).entry.reason,'AGENT_INACTIVE');});
test('replay and expiry',()=>{const s=run(fresh(),req(),'demo-key-a',now).state;assert.equal(run(s,req(),'demo-key-a',now).entry.reason,'REPLAY');assert.equal(run(s,req({nonce:2,expiresAt:now}),'demo-key-a',now).entry.reason,'EXPIRED');});
test('insufficient balance and owner demo operations',()=>{const s=demoWithdraw(fresh(),u('95'),now);assert.equal(run(s,req(),'demo-key-a',now).entry.reason,'INSUFFICIENT_BALANCE');assert.equal(demoDeposit(s,u('2'),now).balance,u('7'));});

test('separate agent limits and owner movement records',()=>{const s=fresh();s.agents.push({...s.agents[0],id:'b',publicKey:'demo-key-b',dailySpent:u('39')});const r=run(s,req(),'demo-key-a',now);assert.equal(r.entry.decision,'approved');assert.equal(r.state.agents[1].dailySpent,u('39'));const funded=demoDeposit(r.state,u('5'),now);assert.equal(funded.ownerMovements[0].kind,'deposit');assert.equal(funded.balance,u('95'));});

test('Istanbul midnight resets daily spend, not at UTC midnight',()=>{
 assert.equal(policyDay(Date.parse('2026-11-27T20:59:59.999Z')),'2026-11-27');
 assert.equal(policyDay(Date.parse('2026-11-27T21:00:00Z')),'2026-11-28');
 let s=fresh(); s.agents[0].dailySpent=u('39');s.agents[0].totalSpent=u('39');
 const r=run(s,req(),'demo-key-a',Date.parse('2026-11-27T21:00:00Z'));
 assert.equal(r.entry.decision,'approved');assert.equal(r.state.agents[0].dailySpent,u('10'));assert.equal(r.state.agents[0].totalSpent,u('49'));
});
test('unlisted recipient waits without spend or suspension; owner approval is one-use',()=>{
 let s=run(fresh(),req({recipientWallet:'new-recipient'}),'demo-key-a',now).state;
 assert.equal(s.logs[0].decision,'pending');assert.equal(s.balance,u('100'));assert.equal(s.agents[0].violations,0);assert.equal(s.agents[0].status,'active');
 s=resolveDemoApproval(s,0,true,now+1);
 assert.equal(s.balance,u('90'));assert.equal(s.logs.length,1);assert.equal(s.logs[0].decision,'approved');assert.equal(s.agents[0].dailySpent,u('10'));
 assert.deepEqual(s.agents[0].policy.allowlist,['demo-recipient','demo-denied']);
 assert.throws(()=>resolveDemoApproval(s,0,true,now+2));
 assert.equal(run(s,req({recipientWallet:'new-recipient',nonce:2}),'demo-key-a',now+2).entry.decision,'pending');
});
test('approval rechecks current freeze, revocation, expiry, denylist, balance and limits',()=>{
 const pending=()=>run(fresh(),req({recipientWallet:'new-recipient'}),'demo-key-a',now).state;
 const cases=[
  ['VAULT_FROZEN',s=>setDemoFrozen(s,true),now+1],
  ['AGENT_INACTIVE',s=>setDemoAgentStatus(s,'a','revoked'),now+1],
  ['EXPIRED',s=>s,now+86400000*3],
  ['DENYLIST',s=>{s.agents[0].policy.denylist.push('new-recipient');return s;},now+1],
  ['INSUFFICIENT_BALANCE',s=>demoWithdraw(s,u('99'),now),now+1],
  ['DAILY_LIMIT',s=>{s.agents[0].dailySpent=u('35');return s;},now+1],
 ];
 for(const [reason,mutate,at]of cases){const s=mutate(pending()),r=resolveDemoApproval(s,0,true,at);assert.equal(r.logs[0].reason,reason);assert.equal(r.balance,s.balance);}
});
test('owner rejection does not penalize agent; approval does not lower nonce watermark',()=>{
 let s=run(fresh(),req({recipientWallet:'new-recipient'}),'demo-key-a',now).state;
 const rejected=resolveDemoApproval(s,0,false,now+1);assert.equal(rejected.logs[0].reason,'OWNER_REJECTED');assert.equal(rejected.agents[0].violations,0);assert.equal(rejected.balance,u('100'));
 s=run(s,req({nonce:2}),'demo-key-a',now+1).state;s=resolveDemoApproval(s,0,true,now+2);
 assert.equal(s.agents[0].lastNonce,2);assert.equal(s.balance,u('80'));assert.equal(run(s,req({nonce:2}),'demo-key-a',now+3).entry.reason,'REPLAY');
});
test('resume preserves spending, and unfreeze does not reactivate suspended agent',()=>{
 let s=run(fresh(),req(),'demo-key-a',now).state;for(let nonce=2;nonce<=6;nonce++)s=run(s,req({nonce,amount:u('30')}),'demo-key-a',now).state;
 assert.equal(s.agents[0].status,'suspended');s=setDemoFrozen(setDemoFrozen(s,true),false);assert.equal(s.agents[0].status,'suspended');
 s=setDemoAgentStatus(s,'a','active');assert.equal(s.agents[0].violations,0);assert.equal(s.agents[0].dailySpent,u('10'));assert.equal(s.agents[0].totalSpent,u('10'));assert.equal(s.balance,u('90'));
});

test('queued approvals share the current daily limit',()=>{
 let s=fresh();
 for(let nonce=1;nonce<=2;nonce++)s=run(s,req({recipientWallet:'new-recipient',amount:u('25'),nonce}),'demo-key-a',now).state;
 assert.equal(s.logs.filter(l=>l.decision==='pending').length,2);
 s=resolveDemoApproval(s,0,true,now+1);
 s=resolveDemoApproval(s,1,true,now+2);
 assert.equal(s.logs[0].decision,'approved');assert.equal(s.logs[1].reason,'DAILY_LIMIT');
 assert.equal(s.balance,u('75'));assert.equal(s.agents[0].dailySpent,u('25'));assert.equal(s.agents[0].status,'active');assert.equal(s.agents[0].violations,1);
});
test('saved demo state preserves pending approval and prevents a second execution',()=>{
 let s=run(fresh(),req({recipientWallet:'new-recipient'}),'demo-key-a',now).state;
 s=JSON.parse(JSON.stringify(s));s=resolveDemoApproval(s,0,true,now+1);
 s=JSON.parse(JSON.stringify(s));assert.throws(()=>resolveDemoApproval(s,0,true,now+2));
 assert.equal(run(s,req({recipientWallet:'new-recipient'}),'demo-key-a',now+2).entry.reason,'REPLAY');
 assert.equal(s.balance,u('90'));
});
test('legacy unrestricted setting cannot bypass recipient approval',()=>{
 const s=fresh();s.agents[0].policy.allowlistEnabled=false;
 const r=run(s,req({recipientWallet:'new-recipient'}),'demo-key-a',now);
 assert.equal(r.entry.decision,'pending');assert.equal(r.state.balance,s.balance);assert.equal(r.state.agents[0].violations,0);
});

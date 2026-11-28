"use client";
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {demoDeposit,demoWithdraw,resolveDemoApproval,setDemoFrozen,simulateTransfer,type AgentPolicy,type AuditEntry} from '../lib/agentvault-policy';
import {initialDemo,putAgent,updatePolicy,changeAgentStatus,recordsFor,dayAt,CENT,type DemoData,type Profile} from '../lib/demo-vault';
const KEY='agentvault-demo-vault-v1';
// Explicitly local simulation; localStorage is not an authorization boundary.
function restore(raw:string):DemoData {
 const d=JSON.parse(raw) as DemoData;
 if(!d||!d.vault||d.vault.id!=='demo-vault-001'||!Number.isSafeInteger(d.vault.balance)||d.vault.balance<0||!Array.isArray(d.vault.agents)||!Array.isArray(d.vault.logs)||!Array.isArray(d.vault.ownerMovements)||!d.profiles)throw Error('Geçersiz demo kaydı');
 // Access all derived records now; corrupted records fall back to fresh demo.
 recordsFor(d);
 for(const a of d.vault.agents){if(!a.policy||!Array.isArray(a.policy.allowlist)||!Array.isArray(a.policy.denylist)||!d.profiles[a.id])throw Error('Geçersiz asistan kaydı');}
 return d;
}
type Context={data:DemoData;ready:boolean;storageAvailable:boolean;day:string;move:(kind:'deposit'|'withdraw',cents:number)=>boolean;freeze:(frozen:boolean)=>void;saveAgent:(id:string,profile:Profile,dailyCents:number)=>void;status:(id:string,status:'active'|'paused'|'revoked')=>void;savePolicy:(id:string,policy:AgentPolicy)=>void;approve:(index:number,accepted:boolean)=>void;request:(id:string,cents:number,recipient:string,identity:string,matchingSigner:boolean)=>AuditEntry;reset:()=>void};
const C=createContext<Context|null>(null);
export default function DemoVaultProvider({children}:{children:ReactNode}){
 const [data,setData]=useState(()=>initialDemo(0)); const ref=useRef(data);
 const [ready,setReady]=useState(false),[storageAvailable,setStorageAvailable]=useState(true),[day,setDay]=useState('1970-01-01');
 function commit(next:DemoData){ref.current=next;setData(next);try{localStorage.setItem(KEY,JSON.stringify(next));setStorageAvailable(true);}catch{setStorageAvailable(false);}}
 useEffect(()=>{let next=initialDemo(Date.now());try{const raw=localStorage.getItem(KEY);if(raw)next=restore(raw);else localStorage.setItem(KEY,JSON.stringify(next));}catch{setStorageAvailable(false);}ref.current=next;setData(next);setDay(dayAt(Date.now()));setReady(true);const timer=window.setInterval(()=>setDay(dayAt(Date.now())),1000*30);return()=>window.clearInterval(timer);},[]);
 function move(kind:'deposit'|'withdraw',cents:number){if(!ready||!Number.isSafeInteger(cents)||cents<=0||cents>100000000)return false;try{const prev=ref.current;const vault=(kind==='deposit'?demoDeposit:demoWithdraw)(prev.vault,cents*CENT,Date.now());commit({...prev,vault});return true;}catch{return false;}}
 function request(id:string,cents:number,recipient:string,identity:string,matchingSigner:boolean){if(!ready)throw Error('Demo yükleniyor.');const prev=ref.current,a=prev.vault.agents.find(x=>x.id===id);if(!a||!Number.isSafeInteger(cents)||cents<=0||cents>100000000)throw Error('Geçersiz talep.');const now=Date.now();const outcome=simulateTransfer(prev.vault,{vaultId:prev.vault.id,agentId:id,agentPublicKey:a.publicKey,recipientWallet:recipient,recipientIdentity:identity,amount:cents*CENT,nonce:a.lastNonce+1,expiresAt:now+60000},matchingSigner?a.publicKey:null,now);commit({...prev,vault:outcome.state});return outcome.entry;}
 const value:Context={data,ready,storageAvailable,day,move,request,approve:(index,accepted)=>{if(ready){const p=ref.current;commit({...p,vault:resolveDemoApproval(p.vault,index,accepted,Date.now())});}},freeze:f=>{if(ready){const p=ref.current;commit({...p,vault:setDemoFrozen(p.vault,f)});}},saveAgent:(id,profile,daily)=>{if(!ready)throw Error('Demo yükleniyor.');commit(putAgent(ref.current,id,profile,daily,Date.now()));},status:(id,s)=>{if(ready)commit(changeAgentStatus(ref.current,id,s));},savePolicy:(id,p)=>{if(!ready)throw Error('Demo yükleniyor.');commit(updatePolicy(ref.current,id,p));},reset:()=>{if(ready)commit(initialDemo(Date.now()));}};
 return <C.Provider value={value}>{!ready?<div role="status" style={{padding:24}}>AgentVault demo verileri yükleniyor…</div>:children}</C.Provider>;
}
export function useDemoVault(){const ctx=useContext(C);if(!ctx)throw Error('DemoVaultProvider eksik.');return ctx;}

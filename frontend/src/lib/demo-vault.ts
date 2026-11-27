import { demoDeposit, simulateTransfer, setDemoAgentStatus, validPolicy, type AgentPolicy, type AgentStatus, type Reason, type VaultState } from './agentvault-policy';
export type Profile = {name:string; type:'payment'|'trading'|'subscription'|'custom'};
export type DemoData = { vault:VaultState; profiles:Record<string,Profile> };
export const CENT=10_000;
export const DEMO_RECIPIENT='11111111111111111111111111111111';
export const statusLabel:Record<AgentStatus,string>={active:'Yetkili',paused:'Duraklatıldı',suspended:'Askıya alındı',revoked:'Yetkisi iptal edildi'};
export const reasonLabel:Record<Reason,string>={IDENTITY_NOT_VERIFIED:'Örnek imzacı eşleşmedi',WRONG_VAULT:'Yanlış kasa',UNKNOWN_AGENT:'Kayıtsız asistan',REPLAY:'Tekrarlanan talep',EXPIRED:'Talep süresi doldu',INVALID_REQUEST:'Geçersiz talep',AGENT_INACTIVE:'Asistan yetkili değil',VAULT_FROZEN:'Kasa donduruldu',INVALID_POLICY:'Geçersiz kural',DENYLIST:'Yasaklanan alıcı',NOT_ALLOWLISTED:'Alıcı izin listesinde değil',BELOW_MINIMUM:'Minimum tutarın altında',ABOVE_MAXIMUM:'İşlem başına sınır aşıldı',DAILY_LIMIT:'Günlük sınır aşıldı',TOTAL_LIMIT:'Toplam yetki sınırı aşıldı',INSUFFICIENT_BALANCE:'Yetersiz kasa bakiyesi'};
export const dayAt=(now:number)=>new Date(now).toISOString().slice(0,10);
export const defaultPolicy=(daily:number):AgentPolicy=>({dailyLimit:daily,minTransfer:0,maxTransfer:Math.min(daily,25*100*CENT),totalLimit:Math.min(daily*10,1e12),allowlistEnabled:false,allowlist:[],denylist:[]});
export function initialDemo(now:number):DemoData {
 const a='demo-payment-01',b='demo-trading-02';
 let vault:VaultState={id:'demo-vault-001',ownerPublicKey:'demo-owner',frozen:false,balance:0,agents:[a,b].map((id,i)=>({id,publicKey:'demo-key-'+id,status:'active',policy:defaultPolicy((i?5000:2500)*CENT),day:dayAt(now),dailySpent:0,totalSpent:0,violations:0,lastNonce:0})),logs:[],ownerMovements:[]};
 vault=demoDeposit(vault,10000*CENT,now);
 for(const [id,amount] of [[a,1000],[b,2500]] as const){vault=simulateTransfer(vault,{vaultId:vault.id,agentId:id,agentPublicKey:'demo-key-'+id,recipientWallet:DEMO_RECIPIENT,recipientIdentity:'Örnek alıcı',amount:amount*CENT,nonce:1,expiresAt:now+60000},'demo-key-'+id,now).state;}
 return {vault,profiles:{[a]:{name:'Ödeme asistanı',type:'payment'},[b]:{name:'Alım satım asistanı',type:'trading'}}};
}
export function updatePolicy(data:DemoData,id:string,policy:AgentPolicy):DemoData {
 if(!validPolicy(policy))throw Error('Minimum ≤ maksimum; maksimum ≤ günlük ve toplam sınır olmalı.');
 if(!data.vault.agents.some(a=>a.id===id&&a.status!=='revoked'))throw Error('Yetkisi iptal edilmiş veya bulunamayan asistan.');
 return {...data,vault:{...data.vault,agents:data.vault.agents.map(a=>a.id===id?{...a,policy:{...policy,allowlist:[...policy.allowlist],denylist:[...policy.denylist]}}:a)}};
}
export function putAgent(data:DemoData,id:string,profile:Profile,dailyCents:number,now:number):DemoData {
 if(!Number.isSafeInteger(dailyCents)||dailyCents<=0||dailyCents>100000000||profile.name.trim().length<2||profile.name.trim().length>40)throw Error('Geçersiz asistan bilgisi.');
 const daily=dailyCents*CENT, existing=data.vault.agents.find(a=>a.id===id);
 let vault=data.vault;
 if(existing){const p={...existing.policy,dailyLimit:daily};if(!validPolicy(p)||existing.status==='revoked')throw Error('Güvenliğim ekranındaki işlem sınırlarını kontrol edin.');vault=updatePolicy(data,id,p).vault;}
 else {if(vault.agents.filter(a=>a.status!=='revoked').length>=6)throw Error('En fazla 6 yetkisi iptal edilmemiş demo asistanı.');vault={...vault,agents:[...vault.agents,{id,publicKey:'demo-key-'+id,status:'paused',policy:defaultPolicy(daily),day:dayAt(now),dailySpent:0,totalSpent:0,violations:0,lastNonce:0}]};}
 return {...data,vault,profiles:{...data.profiles,[id]:profile}};
}
export function changeAgentStatus(data:DemoData,id:string,status:'active'|'paused'|'revoked'):DemoData{return {...data,vault:setDemoAgentStatus(data.vault,id,status)};}
export type DemoRecord={id:string;name:string;description:string;date:string;amount:number;status:'Tamamlandı'|'Engellendi';agentId?:string;recipient?:string;reason?:Reason;nonce?:number;suspended?:boolean};
export function recordsFor(data:DemoData):DemoRecord[]{
 const owners:DemoRecord[]=data.vault.ownerMovements.map((m,i)=>({id:'OWNER-'+(i+1),name:m.kind==='deposit'?'Para yatırma':'Para çekme',description:'Demo kasa sahibi',date:new Date(m.at).toISOString(),amount:(m.kind==='deposit'?1:-1)*m.amount/CENT,status:'Tamamlandı'}));
 const requests:DemoRecord[]=data.vault.logs.map((l,i)=>({id:'REQ-'+(i+1),name:data.profiles[l.request.agentId]?.name??'Bilinmeyen asistan',description:l.reason?reasonLabel[l.reason]:'Örnek USDC transferi',date:new Date(l.at).toISOString(),amount:-l.request.amount/CENT,status:l.decision==='approved'?'Tamamlandı':'Engellendi',agentId:l.request.agentId,recipient:l.request.recipientWallet,reason:l.reason,nonce:l.request.nonce,suspended:l.suspended}));
 return [...owners,...requests].reverse().sort((a,b)=>b.date.localeCompare(a.date));
}
export function validAddress(value:string){const alphabet='123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';if(!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value))return false;let bytes:number[]=[];for(const ch of value){let carry=alphabet.indexOf(ch);for(let i=0;i<bytes.length;i++){carry+=bytes[i]*58;bytes[i]=carry&255;carry>>=8;}while(carry){bytes.push(carry&255);carry>>=8;}}return bytes.length+(value.match(/^1*/)?.[0].length??0)===32;}

"use client";
import ChainWorkspace from "../../components/ChainWorkspace";
import { useState, useRef } from "react";
import { ArrowDownLeft, ArrowUpRight, Wallet, ShieldAlert, Search, Download, X, History, Eye, EyeOff } from "lucide-react";
import { useAdaptive } from "../../components/AdaptiveProvider";
import "./adaptive-transactions.css";
import {useDemoVault} from "../../components/DemoVaultProvider";
import {recordsFor,type DemoRecord} from "../../lib/demo-vault";

type Transaction = DemoRecord;
const statuses = ["Tümü", "Tamamlandı", "Engellendi", "Onay bekliyor"] as const;
const money = (cents:number) => (Math.abs(cents)/100).toLocaleString("tr-TR",{minimumFractionDigits:2,maximumFractionDigits:2});
const dateLabel = (date:string) => `${date.slice(8,10)}.${date.slice(5,7)}.${date.slice(0,4)} · ${date.slice(11,16)}`;
function TransactionsPage(){
  const {preferences,setHideBalance}=useAdaptive();
  const {data}=useDemoVault();
  const records=recordsFor(data);
  const hidden=preferences.hideBalance, easy=preferences.mode==="easy", pro=preferences.mode==="professional";
  const [search,setSearch]=useState("");
  const [status,setStatus]=useState<(typeof statuses)[number]>("Tümü");
  const [from,setFrom]=useState(""); const [to,setTo]=useState("");
  const [sort,setSort]=useState("new"); const [selected,setSelected]=useState<Transaction|null>(null);
  const [notice,setNotice]=useState(""); const dialog=useRef<HTMLDialogElement>(null);
  const invalid=Boolean(from&&to&&from>to);
  const filtered=invalid?[]:records.filter(t=>(status==="Tümü"||t.status===status)&&(!from||t.date.slice(0,10)>=from)&&(!to||t.date.slice(0,10)<=to)&&`${t.name} ${t.description} ${t.id}`.toLocaleLowerCase("tr-TR").includes(search.trim().toLocaleLowerCase("tr-TR"))).sort((a,b)=>sort==="old"?a.date.localeCompare(b.date):b.date.localeCompare(a.date));
  const completed=records.filter(t=>t.status==="Tamamlandı");
  const incoming=completed.reduce((s,t)=>s+Math.max(0,t.amount),0), outgoing=completed.reduce((s,t)=>s+Math.max(0,-t.amount),0);
  const display=(n:number)=>hidden?"••••••":money(n)+" USDC";
  function exportCsv(){
    if(hidden||!filtered.length)return;
    const cell=(s:string)=>'"'+(/^[=+@\-\t\r]/.test(s)&&!/^[-+]?[0-9]+(?:\.[0-9]+)?$/.test(s)?"'"+s:s).replace(/"/g,'""')+'"';
    const csv=[['Kimlik','İşlem','Tarih','Durum','Tutar (USDC)','Açıklama','AgentID','Alıcı','Ret kodu','Nonce','Askıya alma'],...filtered.map(t=>[t.id,t.name,t.date,t.status,(t.amount/100).toFixed(2),t.description,t.agentId??'',t.recipient??'',t.reason??'',String(t.nonce??''),t.suspended?'Evet':'Hayır'])].map(r=>r.map(cell).join(';')).join('\r\n');
    const url=URL.createObjectURL(new Blob(['\uFEFF',csv],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='agentvault-islemler.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setNotice('CSV indirme isteği başlatıldı.');
  }
  function open(t:Transaction){setSelected(t);dialog.current?.showModal();}
  return <div className="adaptive-transactions adaptive-stack">
    <header className="adaptive-row adaptive-between"><div className="adaptive-stack"><p className="adaptive-small">FİNANSAL HAREKETLER</p><h1 className="adaptive-heading">İşlemlerim</h1><p className="adaptive-description">Paranızla yapılan işlemleri tek bir yerden takip edin.</p></div><button type="button" className="adaptive-icon-button" aria-label={hidden?'Tutarları göster':'Tutarları gizle'} onClick={()=>setHideBalance(!hidden)}>{hidden?<EyeOff/>:<Eye/>}</button></header>
    <p className="adaptive-small">Demo ortamı · Ortak demo işlem geçmişi</p>
    <div className="tx-summary">{[{label:'Gelen para',value:incoming,Icon:ArrowDownLeft},{label:'Giden para',value:outgoing,Icon:ArrowUpRight}].map(({label,value,Icon})=><section key={label} className="adaptive-card adaptive-stack"><span className="adaptive-icon-box"><Icon/></span><p className="adaptive-label">{label}</p><strong className="tx-total">{display(value)}</strong><p className="adaptive-small">Tüm örnek tamamlanan işlemler</p></section>)}</div>
    {!easy&&!hidden&&<section className="adaptive-card adaptive-stack"><h2 className="adaptive-section-heading">Harcama dağılımı</h2>{completed.filter(t=>t.amount<0).map(t=><div key={t.id} className="adaptive-stack"><div className="adaptive-row adaptive-between"><span>{t.name}</span><strong>{display(t.amount)}</strong></div><div className="tx-track" role="progressbar" aria-label={t.name+' harcama payı'} aria-valuenow={Math.round(-t.amount/outgoing*100)} aria-valuemin={0} aria-valuemax={100}><div style={{width:`${-t.amount/outgoing*100}%`}}/></div></div>)}</section>}
    <section className="adaptive-card adaptive-stack"><h2 className="adaptive-section-heading">İşlem ara ve filtrele</h2><label htmlFor="tx-search" className="adaptive-label">İşlem adı veya kimliği</label><div className="adaptive-row"><Search size={20}/><input id="tx-search" className="adaptive-input adaptive-grow" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Örneğin: ödeme"/></div><div className="adaptive-row" aria-label="İşlem durumu">{statuses.map(s=><button key={s} type="button" aria-pressed={status===s} className={'adaptive-button '+(status===s?'adaptive-button-primary':'adaptive-button-secondary')} onClick={()=>setStatus(s)}>{s}</button>)}</div><div className="tx-summary"><label className="adaptive-stack adaptive-label">Başlangıç tarihi<input type="date" className="adaptive-input" value={from} onChange={e=>setFrom(e.target.value)}/></label><label className="adaptive-stack adaptive-label">Bitiş tarihi<input type="date" className="adaptive-input" value={to} onChange={e=>setTo(e.target.value)}/></label></div>{invalid&&<p role="alert" className="adaptive-status adaptive-status-danger">Başlangıç tarihi bitiş tarihinden sonra olamaz.</p>}<div className="adaptive-row adaptive-between"><label className="adaptive-label">Sıralama <select className="adaptive-input" value={sort} onChange={e=>setSort(e.target.value)}><option value="new">En yeni</option><option value="old">En eski</option></select></label><button type="button" className="adaptive-button adaptive-button-secondary" onClick={()=>{setSearch('');setStatus('Tümü');setFrom('');setTo('');setSort('new');}}>Filtreleri temizle</button></div></section>
    <div className="adaptive-row adaptive-between"><h2 className="adaptive-section-heading">İşlem geçmişi ({filtered.length})</h2><button type="button" className="adaptive-button adaptive-button-secondary" disabled={hidden||!filtered.length} onClick={exportCsv}><Download size={19}/> CSV indir</button></div>{hidden&&<p className="adaptive-small">CSV indirmek için tutarları görünür yapın.</p>}{notice&&<p role="status">{notice}</p>}
    {filtered.length===0&&<section className="adaptive-card adaptive-stack"><History/><p>Aramanıza uygun işlem bulunamadı.</p></section>}
    {filtered.map(t=>{const Icon=t.status==='Engellendi'?ShieldAlert:t.amount>0?ArrowDownLeft:Wallet;return <button key={t.id} type="button" className="adaptive-card tx-row" onClick={()=>open(t)}><span className="adaptive-icon-box"><Icon/></span><span className="tx-info"><strong>{t.name}</strong><span className="adaptive-small">{t.description}</span><span className="adaptive-small">{dateLabel(t.date)}{pro?' · '+t.id:''}</span></span><span className="tx-value"><strong>{!hidden&&t.status==='Tamamlandı'?(t.amount>0?'+':'−'):''}{display(t.amount)}</strong><span className="tx-status" data-status={t.status}>{t.status}</span></span></button>})}
    <dialog ref={dialog} className="tx-dialog" onClose={()=>setSelected(null)} aria-labelledby="tx-detail-title"><div className="adaptive-stack"><div className="adaptive-row adaptive-between"><h2 id="tx-detail-title" className="adaptive-section-heading">İşlem detayları</h2><button type="button" className="adaptive-icon-button" aria-label="Kapat" onClick={()=>dialog.current?.close()}><X/></button></div>{selected&&<><strong className="tx-total">{display(selected.amount)}</strong><dl className="adaptive-stack">{[['İşlem',selected.name],['Durum',selected.status],['Tarih',dateLabel(selected.date)],['Açıklama',selected.description],['Kimlik',selected.id],['AgentID',selected.agentId??'Kasa sahibi'],['Alıcı adresi',selected.recipient??'—'],['Ret kodu',selected.reason??'—'],['Talep nonce',String(selected.nonce??'—')],['Askıya alma',selected.suspended?'Evet':'Hayır']].map(([k,v])=><div key={k} className="adaptive-row adaptive-between"><dt className="adaptive-label">{k}</dt><dd>{v}</dd></div>)}</dl><p className="adaptive-small">{selected.status==='Tamamlandı'?'Örnek tamamlanan işlem.':'Bu tutar gerçekleşen harcamaya dahil değildir.'}</p></>}<button type="button" className="adaptive-button adaptive-button-secondary" onClick={()=>dialog.current?.close()}>Kapat</button></div></dialog>
  </div>;
}

export default function Page() {
  return process.env.NEXT_PUBLIC_VAULTGUARD_MODE === "chain" ? <ChainWorkspace view="transactions"/> : <TransactionsPage/>;
}

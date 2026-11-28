import {BN} from '@coral-xyz/anchor';
import {PublicKey, SystemProgram} from '@solana/web3.js';
import Link from 'next/link';
import {useEffect, useRef, useState, type FormEvent} from 'react';
import {useWalletConnection} from './WalletProvider';
import {useAdaptive} from './AdaptiveProvider';
import {agentInstruction, agentStatusText, chainAgents, chainPayments, chainProgram, currentGuard, guardAddress, paymentStatusText, reasonText, resolveInstruction, sendOwnerTransaction, statusInstruction, units, type AgentAccount, type PaymentAccount} from '../lib/chain-client';
import {formatUnits, inspectLocalnet, localConnection, readVaults} from '../lib/agentvault-localnet';

type View = 'home' | 'agents' | 'policies' | 'approvals' | 'transactions';
type Row<T> = {address: PublicKey; account: T};
type Snapshot = {
  owner: string;
  vaults: Awaited<ReturnType<typeof readVaults>>;
  vault: string;
  guard: {epoch: BN; frozen: boolean};
  agents: Row<AgentAccount>[];
  payments: Row<PaymentAccount>[];
};
const headings = {home:'VaultGuard', agents:'Asistanlarım', policies:'Güvenliğim', approvals:'Onaylarım', transactions:'İşlemlerim'};
const button = 'adaptive-button adaptive-button-secondary';

function parseAddresses(value: FormDataEntryValue | null) {
  return [...new Set(String(value ?? '').trim().split(/\s+/).filter(Boolean))].map(x => new PublicKey(x));
}

export default function ChainWorkspace({view}:{view:View}) {
  const {connection, signTransaction} = useWalletConnection();
  const {preferences} = useAdaptive();
  const owner = connection?.address;
  const [selected, setSelected] = useState('');
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [revision, setRevision] = useState(0);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [signature, setSignature] = useState('');
  const [pendingCheck, setPendingCheck] = useState(false);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const [agentFilter, setAgentFilter] = useState('');
  const [receipts, setReceipts] = useState<{request:string; signatures:string[]}>();
  const refresh = () => setRevision(v => v + 1);
  const display = (value: BN) => preferences.hideBalance ? '••••' : formatUnits(BigInt(value.toString())) + ' test USDC';
  const latest = snapshot?.owner === owner ? snapshot : null;
  const activeVault = latest?.vaults.find(v => v.address === latest.vault);
  const frozen = Boolean(activeVault?.frozen || latest?.guard.frozen);

  useEffect(() => {
    if (!owner) return;
    let disposed = false;
    let loading = false;
    async function load() {
      if (loading || !owner) return;
      loading = true;
      try {
        const c = localConnection();
        await inspectLocalnet(c);
        const vaults = await readVaults(c, owner);
        const address = vaults.find(v => v.address === selected)?.address ?? vaults[0]?.address ?? '';
        const key = address ? new PublicKey(address) : null;
        const [guard, agents, payments] = key
          ? await Promise.all([currentGuard(c,key),chainAgents(c,key),chainPayments(c,key)])
          : [{epoch: new BN(0), frozen:false},[],[]] as const;
        if (!disposed) {
          setSnapshot({owner, vaults, vault:address, guard, agents:[...agents], payments:[...payments]});
          setError('');
        }
      } catch (e) {
        if (!disposed) {
          setSnapshot(null);
          setError(e instanceof Error ? e.message : 'Zincir bilgisi okunamadı.');
        }
      } finally { loading = false; }
    }
    void load();
    const timer = setInterval(load, 15_000);
    return () => {disposed = true;clearInterval(timer);};
  }, [owner, selected, revision]);

  async function execute(build: (c: ReturnType<typeof localConnection>, user: PublicKey, vault: PublicKey) => Promise<import('@solana/web3.js').TransactionInstruction>) {
    if (!owner || !activeVault || lock.current || pendingCheck) return;
    lock.current = true;
    setBusy(true);
    setNotice('');
    setSignature('');
    try {
      const c = localConnection();
      const user = new PublicKey(owner);
      const ix = await build(c,user,new PublicKey(activeVault.address));
      await sendOwnerTransaction(user,[ix],signTransaction,setSignature);
      setNotice('İşlem zincirde onaylandı.');
      refresh();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'İşlem tamamlanamadı.';
      setPendingCheck(message.includes('henüz doğrulanamadı'));
      setNotice(message);
    } finally { lock.current = false; setBusy(false); }
  }

  function save(event: FormEvent<HTMLFormElement>, existing?: PublicKey) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    void execute((c,user,vault) => agentInstruction(c,user,vault,existing ?? new PublicKey(String(form.get('key'))),{
      dailyLimit:units(String(form.get('daily')).replace(',','.')),
      maxTransfer:units(String(form.get('max')).replace(',','.')),
      totalLimit:units(String(form.get('total')).replace(',','.')),
      allowlist:parseAddresses(form.get('allow')),
      denylist:parseAddresses(form.get('deny')),
    },Boolean(existing)));
  }

  function policyForm(agent?: Row<AgentAccount>) {
    const policy = agent?.account.policy;
    return <form className="adaptive-card adaptive-stack" onSubmit={event=>save(event,agent?.account.key)}>
      <h2 className="adaptive-section-heading">{agent ? 'Harcama kurallarını güncelle' : 'Kasaya agent kaydet'}</h2>
      {!agent && <label>Agent public key <input required name="key" className="adaptive-input" /></label>}
      {([['daily','Günlük limit',policy?.dailyLimit],['max','İşlem başına limit',policy?.maxTransfer],['total','Toplam limit',policy?.totalLimit]] as const).map(([name,label,value])=>
        <label key={name}>{label} (test USDC) <input required name={name} inputMode="decimal" className="adaptive-input" defaultValue={value ? formatUnits(BigInt(value.toString())) : ''}/></label>
      )}
      <label>İzinli alıcılar <textarea name="allow" className="adaptive-input" defaultValue={policy?.allowlist.map(k=>k.toBase58()).join('\n')} /></label>
      <label>Yasaklı alıcılar <textarea name="deny" className="adaptive-input" defaultValue={policy?.denylist.map(k=>k.toBase58()).join('\n')} /></label>
      <p>Her satıra bir cüzdan adresi girin. Liste dışı ödemeler onaya gider.</p>
      <button className={button} disabled={busy||pendingCheck||(!agent&&frozen)}>Cüzdanla imzala</button>
    </form>;
  }

  const agents = latest?.agents ?? [];
  const payments = (latest?.payments ?? []).filter(row=>!agentFilter||row.account.agent.toBase58()===agentFilter);
  const status = (a: AgentAccount) => a.status === 0 && (frozen || !a.epoch.eq(latest!.guard.epoch)) ? 'Yeniden etkinleştirme gerekiyor' : (agentStatusText[a.status] ?? 'Bilinmiyor');
  const canAct = !busy && !pendingCheck;

  return <div className="adaptive-stack">
    <header><p className="adaptive-small">Solana Localnet · test USDC</p><h1 className="adaptive-heading">{headings[view]}</h1></header>
    {!owner && <p>Solana cüzdanınızı bağlayın. <Link href="/blockchain">Blockchain bağlantısı</Link></p>}
    {error && <p role="alert">{error}</p>}
    {notice && <p role="status">{notice}</p>}
    {signature && <p style={{overflowWrap:'anywhere'}}>İşlem imzası {signature}</p>}
    {pendingCheck && <button className={button} onClick={async()=>{
      try {
        const result = await localConnection().getSignatureStatus(signature,{searchTransactionHistory:true});
        if (result.value?.err || ['confirmed','finalized'].includes(result.value?.confirmationStatus ?? '')) {
          setPendingCheck(false);setNotice(result.value?.err?'İşlem reddedildi.':'İşlem zincirde onaylandı.');refresh();
        } else setNotice('Zincir sonucu henüz doğrulanamadı.');
      } catch {setNotice('RPC erişilemiyor.');}
    }}>İşlem sonucunu kontrol et</button>}
    {latest && !latest.vaults.length && <p>Bağlı cüzdana ait kasa bulunamadı. <Link href="/blockchain">Blockchain bağlantısı</Link></p>}
    {activeVault && <>
      <label>Kasa <select className="adaptive-input" value={activeVault.address} onChange={e=>{setSelected(e.target.value);setAgentFilter('');setReceipts(undefined);}}>
        {latest!.vaults.map(v=><option key={v.address} value={v.address}>Kasa #{v.id}</option>)}
      </select></label>
      <button className={button} onClick={refresh}>Zincir verilerini yenile</button>
      {view==='home' && <section className="adaptive-card adaptive-stack">
        <p>Kasa bakiyesi {preferences.hideBalance?'••••':activeVault.balance+' test USDC'}</p>
        <p>Etkin agentlar {agents.filter(a=>status(a.account)==='Yetkili').length}</p>
        <Link href="/approvals">Bekleyen ödeme {payments.filter(p=>p.account.status===0).length} · Askıdaki agent {agents.filter(a=>a.account.status===2).length}</Link>
        <Link href="/transactions">Zincir işlem kayıtları</Link>
      </section>}
      {view==='agents' && policyForm()}
      {view==='policies' && <section className="adaptive-card adaptive-stack">
        <h2 className="adaptive-section-heading">Acil durdurma</h2>
        <p>{frozen ? 'Agent ödemeleri durduruldu.' : 'Agent ödemelerine kasa düzeyinde engel yok.'}</p>
        <button disabled={!canAct || Boolean(activeVault.frozen)} className={button} onClick={()=>void execute((c,user,vault)=>chainProgram(c).methods.setAgentEmergency(!latest!.guard.frozen).accountsStrict({owner:user,vault,guard:guardAddress(vault),systemProgram:SystemProgram.programId}).instruction())}>{latest!.guard.frozen?'Durdurmayı kaldır':'Agent ödemelerini durdur'}</button>
      </section>}
      {(view==='agents'||view==='policies'||view==='approvals') && agents.filter(row=>view!=='approvals'||row.account.status===2).map(row=><section key={row.address.toBase58()} className="adaptive-card adaptive-stack">
        <strong>{status(row.account)}</strong>
        <p>AgentID <code style={{overflowWrap:'anywhere'}}>{row.address.toBase58()}</code></p>
        <p>Public key <code style={{overflowWrap:'anywhere'}}>{row.account.key.toBase58()}</code></p>
        <p>Doğrulanmış ihlaller {row.account.violations.toString()}/5</p>
        {row.account.status!==3 && (view==='policies' ? policyForm(row) : <div className="adaptive-row">
          <button disabled={!canAct || (status(row.account)!=='Yetkili'&&frozen)} className={button} onClick={()=>void execute((c,user,vault)=>statusInstruction(c,user,vault,row.address,status(row.account)==='Yetkili'?1:0))}>{status(row.account)==='Yetkili'?'Duraklat':'Etkinleştir'}</button>
          <button disabled={!canAct} className={button} onClick={()=>{if(window.confirm('Bu kasadaki agent yetkisi iptal edilsin mi?'))void execute((c,user,vault)=>statusInstruction(c,user,vault,row.address,3));}}>Yetkiyi iptal et</button>
        </div>)}
      </section>)}
      {view==='transactions' && <label>Agent filtresi <select className="adaptive-input" value={agentFilter} onChange={e=>setAgentFilter(e.target.value)}><option value="">Tümü</option>{agents.map(a=><option key={a.address.toBase58()} value={a.address.toBase58()}>{a.address.toBase58()}</option>)}</select></label>}
      {(view==='approvals'||view==='transactions') && payments.filter(row=>view==='transactions'||row.account.status===0).map(({address,account:r})=><section key={address.toBase58()} className="adaptive-card adaptive-stack">
        <strong>{paymentStatusText[r.status]} · {display(r.amount)}</strong>
        <p>{reasonText[r.reason]}</p>
        <p>Alıcı <code style={{overflowWrap:'anywhere'}}>{r.recipient.toBase58()}</code></p>
        <p>Alıcı etiketi (agent beyanı) {r.recipientLabel}</p>
        <p>AgentID <code style={{overflowWrap:'anywhere'}}>{r.agent.toBase58()}</code></p>
        <p>{new Date(r.createdAt.toNumber()*1000).toLocaleString('tr-TR',{timeZone:'Europe/Istanbul'})}</p>
        {view==='approvals' && <div className="adaptive-row">
          <button className={button} disabled={!canAct||frozen} onClick={()=>void execute((c,user)=>resolveInstruction(c,user,address,r,true))}>Onayla</button>
          <button className={button} disabled={!canAct} onClick={()=>void execute((c,user)=>resolveInstruction(c,user,address,r,false))}>Reddet</button>
        </div>}
        <button className={button} onClick={async()=>{
          try {const rows=await localConnection().getSignaturesForAddress(address,{limit:20});setReceipts({request:address.toBase58(),signatures:rows.filter(x=>!x.err).map(x=>x.signature)});}
          catch {setNotice('İşlem imzaları alınamadı.');}
        }}>Zincir imzalarını göster</button>
        {receipts?.request===address.toBase58() && receipts.signatures.map(s=><code key={s} style={{overflowWrap:'anywhere'}}>{s}</code>)}
      </section>)}
      {view==='approvals' && !payments.some(p=>p.account.status===0) && <p>Bekleyen ödeme yok.</p>}
      {view==='transactions' && !payments.length && <p>Zincirde agent ödeme kaydı yok.</p>}
    </>}
  </div>;
}

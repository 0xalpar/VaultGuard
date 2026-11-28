import {useEffect, useRef, useState, type FormEvent} from 'react';
import {PublicKey, type TransactionInstruction} from '@solana/web3.js';
import Link from 'next/link';
import {useWalletConnection} from './WalletProvider';
import WalletConnectionCard from './WalletConnectionCard';
import {useAdaptive} from './AdaptiveProvider';
import {chainConnection, chainLabel, chainNetwork, inspectChain, readChainVaults} from '../lib/chain-network';
import {sendOwnerTransaction} from '../lib/chain-client';
import {formatUnits} from '../lib/agentvault-localnet';
import {initializeVault, vaultMovements, vaultTransfer} from '../lib/chain-vault';

type Vault = Awaited<ReturnType<typeof readChainVaults>>[number];
type Movement = Awaited<ReturnType<typeof vaultMovements>>[number];
const button = 'adaptive-button adaptive-button-secondary';

type Pending = {signature:string;lastValidBlockHeight:number};

function readPending(key:string):Pending|undefined {
  try {
    const raw=sessionStorage.getItem(key);
    const item:Pending|null=raw?JSON.parse(raw):null;
    if(item && /^[1-9A-HJ-NP-Za-km-z]{64,88}$/.test(item.signature) && Number.isSafeInteger(item.lastValidBlockHeight) && item.lastValidBlockHeight>0) return item;
  } catch { /* Storage may be unavailable. In-memory checks remain active. */ }
}

export default function ChainVault() {
  const {connection} = useWalletConnection();
  return <OwnerVault key={connection?.address ?? 'disconnected'}/>;
}

function OwnerVault() {
  const {connection,signTransaction} = useWalletConnection();
  const {preferences} = useAdaptive();
  const owner = connection?.address;
  const [snapshot,setSnapshot] = useState<{owner:string;vaults:Vault[]}>();
  const [selected,setSelected] = useState('');
  const [refresh,setRefresh] = useState(0);
  const [error,setError] = useState('');
  const [notice,setNotice] = useState('');
  const [history,setHistory] = useState<{vault:string;rows?:Movement[];error?:string}>();
  const [kind,setKind] = useState<'deposit'|'withdraw'>('deposit');
  const [amount,setAmount] = useState('');
  const [busy,setBusy] = useState(false);
  const storageKey = 'vaultguard:vault-pending:'+chainNetwork+':'+owner;
  const [pending,setPending] = useState<Pending|undefined>(()=>owner?readPending(storageKey):undefined);
  const [signature,setSignature] = useState(pending?.signature ?? '');
  const [checking,setChecking] = useState(false);
  const lock = useRef(false);
  const vaults = snapshot?.owner===owner ? snapshot?.vaults : undefined;
  const vault = vaults?.find(v=>v.address===selected) ?? vaults?.[0];
  const address = vault?.address;

  function remember(item?:Pending) {
    setPending(item);
    try {
      if(item) sessionStorage.setItem(storageKey,JSON.stringify(item));
      else sessionStorage.removeItem(storageKey);
    } catch { /* In-memory checks remain active. */ }
  }

  useEffect(()=>{
    if(!owner) return;
    let active=true;
    void (async()=>{
      try {
        const c=chainConnection();
        await inspectChain(c);
        const rows=await readChainVaults(c,owner);
        if(active) {setSnapshot({owner,vaults:rows});setError('');}
      } catch(e) {
        if(active) {setSnapshot(undefined);setError(e instanceof Error?e.message:'Kasalar okunamadı.');}
      }
    })();
    return ()=>{active=false;};
  },[owner,refresh]);

  useEffect(()=>{
    if(!owner || !address) return;
    let active=true;
    void (async()=>{
      try {
        const rows=await vaultMovements(chainConnection(),new PublicKey(owner),new PublicKey(address));
        if(active) setHistory({vault:address,rows});
      } catch {
        if(active) setHistory({vault:address,error:'Kasa hareketleri şu anda okunamadı.'});
      }
    })();
    return ()=>{active=false;};
  },[owner,address,refresh]);

  async function execute(build:(c:ReturnType<typeof chainConnection>,owner:PublicKey)=>Promise<{instructions:TransactionInstruction[];vault?:PublicKey}>) {
    if(!owner || lock.current || pending) return;
    lock.current=true;setBusy(true);setNotice('');setSignature('');
    try {
      const c=chainConnection();
      const key=new PublicKey(owner);
      const result=await build(c,key);
      await sendOwnerTransaction(key,result.instructions,signTransaction,(signature,lastValidBlockHeight)=>{
        setSignature(signature);
        remember({signature,lastValidBlockHeight});
      });
      remember();
      if(result.vault) setSelected(result.vault.toBase58());
      setAmount('');
      setNotice('İşlem zincirde onaylandı.');
      setRefresh(n=>n+1);
    } catch(e) {
      const message=e instanceof Error?e.message:'İşlem tamamlanamadı.';
      if (!message.includes('henüz doğrulanamadı')) remember();
      setNotice(message);
    } finally {lock.current=false;setBusy(false);}
  }

  function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(!address) return;
    void execute(async(c,key)=>({instructions:await vaultTransfer(c,key,new PublicKey(address),kind,amount.trim().replace(',','.'))}));
  }

  return <div className="adaptive-stack">
    <header><p className="adaptive-small">Solana {chainLabel} · test USDC</p><h1 className="adaptive-heading">Param</h1></header>
    {!owner && <WalletConnectionCard/>}
    {owner && <>
      <div className="adaptive-row">
        <button className={button} disabled={busy||!!pending||!vaults} onClick={()=>void execute(initializeVault)}>Kasa oluştur</button>
        <button className={button} disabled={busy} onClick={()=>setRefresh(n=>n+1)}>Yenile</button>
      </div>
      {error && <p role="alert">{error}</p>}
      {!vaults && !error && <p role="status">Kasalar yükleniyor…</p>}
      {vaults?.length===0 && <p>Bu cüzdan için henüz kasa bulunamadı.</p>}
      {notice && <p role="status">{notice}</p>}
      {signature && <p style={{overflowWrap:'anywhere'}}>İşlem imzası {chainNetwork==='devnet'
        ? <a href={'https://explorer.solana.com/tx/'+signature+'?cluster=devnet'} target="_blank" rel="noreferrer">{signature}</a>
        : <code>{signature}</code>}</p>}
      {pending && <button className={button} disabled={busy||checking} onClick={async()=>{
        setChecking(true);
        try {
          const c=chainConnection();
          const height=await c.getBlockHeight('finalized');
          const {value}=await c.getSignatureStatus(pending.signature,{searchTransactionHistory:true});
          if (value?.err || value?.confirmationStatus==='confirmed' || value?.confirmationStatus==='finalized') {
            remember();
            setNotice(value?.err?'İşlem zincirde reddedildi.':'İşlem zincirde onaylandı.');
            setRefresh(n=>n+1);
          } else if(!value && height>pending.lastValidBlockHeight) {
            remember();
            setNotice('İşlemin geçerlilik süresi doldu. Bakiye ve geçmiş yenilendi.');
            setRefresh(n=>n+1);
          } else setNotice('İşlem sonucu doğrulanıyor.');
        } catch {setNotice('RPC erişilemiyor.');}
        finally {setChecking(false);}
      }}>İşlem sonucunu kontrol et</button>}
      {vault && <>
        <div className="adaptive-card adaptive-stack">
          <label>Kasa <select className="adaptive-input" value={vault.address} disabled={busy} onChange={e=>{setSelected(e.target.value);setAmount('');}}>
            {vaults!.map(v=><option value={v.address} key={v.address}>Kasa #{v.id}</option>)}
          </select></label>
          <strong>Kasa bakiyesi {preferences.hideBalance?'••••':vault.balance+' test USDC'}</strong>
          <code style={{overflowWrap:'anywhere'}}>{vault.address}</code>
          <Link href="/policies">Agent ödemelerini Güvenliğim ekranından yönet</Link>
        </div>
        <form className="adaptive-card adaptive-stack" onSubmit={submit}>
          <label>İşlem <select className="adaptive-input" value={kind} disabled={busy} onChange={e=>setKind(e.target.value==='withdraw'?'withdraw':'deposit')}>
            <option value="deposit">Para yatır</option><option value="withdraw">Kendi cüzdanıma çek</option>
          </select></label>
          <label>Tutar (test USDC) <input className="adaptive-input" required inputMode="decimal" maxLength={27} disabled={busy} value={amount} onChange={e=>setAmount(e.target.value)}/></label>
          <button className={button} disabled={busy||!!pending}>Cüzdanla imzala</button>
        </form>
        <section className="adaptive-card adaptive-stack">
          <h2 className="adaptive-section-heading">Son kasa hareketleri</h2>
          {!history || history.vault!==address ? <p>Hareketler yükleniyor…</p> : history.error ? <p role="alert">{history.error}</p> : <>
            {history.rows?.length===0 && <p>Son 15 zincir işlemi içinde kasa hareketi bulunamadı.</p>}
            {history.rows?.map((row,i)=><article key={row.signature+i} className="adaptive-card-soft adaptive-stack">
              <strong>{row.label}{row.amount!==undefined && !preferences.hideBalance?' · '+formatUnits(BigInt(row.amount))+' test USDC':''}</strong>
              {row.time && <p>{new Date(row.time*1000).toLocaleString('tr-TR',{timeZone:'Europe/Istanbul'})}</p>}
              <code style={{overflowWrap:'anywhere'}}>{row.signature}</code>
            </article>)}
          </>}
        </section>
      </>}
    </>}
  </div>;
}

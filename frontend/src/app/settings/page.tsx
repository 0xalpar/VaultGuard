"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWalletConnection } from "../../components/WalletProvider";
import { Settings, Palette, Accessibility, EyeOff, Bell, Info, RotateCcw, Check, Sun, Moon, Monitor, SlidersHorizontal } from "lucide-react";
import { useAdaptive, ADAPTIVE_MODES, ADAPTIVE_ACCENTS, type AdaptiveAppearance, type AdaptiveTextSize } from "../../components/AdaptiveProvider";
import "./adaptive-settings.css";
import {useDemoVault} from "../../components/DemoVaultProvider";

const themes = [{id:"light",name:"Açık tema",Icon:Sun},{id:"dark",name:"Koyu tema",Icon:Moon},{id:"system",name:"Sistem teması",Icon:Monitor}] as const;
const sizes = [{id:"normal",name:"Normal"},{id:"large",name:"Büyük"},{id:"extra-large",name:"Çok büyük"}] as const;
const notificationKey = "agentvault-demo-notifications";

export default function SettingsPage() {
  const { preferences, resolvedAppearance, motionEnabled, storageAvailable, setMode, setAppearance, setAccent, setTextSize, setMotion, setHideBalance, resetPreferences } = useAdaptive();
  const {data}=useDemoVault();
  const {connection}=useWalletConnection();
  const [notifications, setNotifications] = useState(true);
  const [notificationStorage, setNotificationStorage] = useState(true);
  const [notice, setNotice] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => {
    try { const value = localStorage.getItem(notificationKey); if(value !== null) setNotifications(value !== "false"); }
    catch { setNotificationStorage(false); }
  }, []);
  function changeNotifications(value: boolean) {
    setNotifications(value);
    try { localStorage.setItem(notificationKey, String(value)); setNotificationStorage(true); }
    catch { setNotificationStorage(false); }
  }
  function reset() {
    resetPreferences(); changeNotifications(true); setConfirmReset(false); setNotice("Kişiselleştirme tercihleri varsayılan değerlere döndürüldü.");
  }
  return <div className="adaptive-settings adaptive-stack">
    <header className="adaptive-row"><span className="adaptive-icon-box"><Settings/></span><div className="adaptive-grow"><p className="adaptive-small">KİŞİSELLEŞTİRME MERKEZİ</p><h1 className="adaptive-heading">Ayarlarım</h1><p className="adaptive-description">AgentVault'u kendinize göre düzenleyin.</p></div></header>
    <div role="status" className={'adaptive-status '+(storageAvailable&&notificationStorage?'adaptive-status-success':'adaptive-status-warning')}><Check aria-hidden="true"/><span>{storageAvailable&&notificationStorage?'Tercihleriniz bu tarayıcıda otomatik kaydedilir.':'Tarayıcı depolaması kullanılamıyor. Tercihler yenilemede kaybolabilir.'}</span></div>
    <section className="adaptive-card adaptive-stack" aria-labelledby="settings-mode"><h2 id="settings-mode" className="adaptive-section-heading adaptive-row"><SlidersHorizontal/> Kullanım biçimim</h2><p className="adaptive-description">Size uygun bilgi ve kontrol düzeyini seçin.</p><div className="settings-options">{ADAPTIVE_MODES.map(m=><button type="button" key={m.id} className="settings-option" aria-pressed={preferences.mode===m.id} onClick={()=>setMode(m.id)}><span><strong>{m.name}</strong><span className="adaptive-small">{m.description}</span></span>{preferences.mode===m.id&&<Check aria-hidden="true"/>}</button>)}</div></section>
    <section className="adaptive-card adaptive-stack" aria-labelledby="settings-theme"><h2 id="settings-theme" className="adaptive-section-heading adaptive-row"><Palette/> Görünüm</h2><p className="adaptive-label">Tema</p><div className="settings-grid">{themes.map(({id,name,Icon})=><button type="button" key={id} className="settings-option settings-theme" aria-pressed={preferences.appearance===id} onClick={()=>setAppearance(id as AdaptiveAppearance)}><span className="settings-theme-preview" data-preview={id}><Icon aria-hidden="true"/><span/><span/></span><strong>{name}</strong>{preferences.appearance===id&&<Check aria-hidden="true"/>}</button>)}</div><p className="adaptive-small">Etkin tema: {resolvedAppearance==='dark'?'Koyu':'Açık'}</p><div className="adaptive-divider"/><p className="adaptive-label">Vurgu rengi</p><div className="settings-grid">{ADAPTIVE_ACCENTS.map(a=><button type="button" key={a.id} className="settings-option settings-color" aria-pressed={preferences.accent===a.id} onClick={()=>setAccent(a.id)}><span className="settings-swatch" style={{background:a.light}}>{preferences.accent===a.id&&<Check color="white" aria-hidden="true"/>}</span><strong>{a.name}</strong></button>)}</div></section>
    <section className="adaptive-card adaptive-stack" aria-labelledby="settings-access"><h2 id="settings-access" className="adaptive-section-heading adaptive-row"><Accessibility/> Erişilebilirlik</h2><p className="adaptive-label">Yazı boyutu</p><div className="settings-grid">{sizes.map(s=><button type="button" key={s.id} className="settings-option settings-color" aria-pressed={preferences.textSize===s.id} onClick={()=>setTextSize(s.id as AdaptiveTextSize)}><span style={{fontSize:s.id==='normal'?'1em':s.id==='large'?'1.25em':'1.375em'}}>Aa</span><strong>{s.name}</strong>{preferences.textSize===s.id&&<Check aria-hidden="true"/>}</button>)}</div><div className="adaptive-card-soft">Örnek metin: Paranızı kolayca takip edin.</div><label className="settings-toggle"><span><strong>Hareket ve animasyonlar</strong><span className="adaptive-small">Ekran geçişlerinde hareket kullanılmasına izin verin.</span></span><input type="checkbox" checked={preferences.motion} onChange={e=>setMotion(e.target.checked)}/></label><p className="adaptive-small">Etkin hareket durumu: {motionEnabled?'Açık':'Kapalı'}. Sisteminizin hareket azaltma tercihi önceliklidir.</p></section>
    <section className="adaptive-card adaptive-stack" aria-labelledby="settings-privacy"><h2 id="settings-privacy" className="adaptive-section-heading adaptive-row"><EyeOff/> Gizlilik</h2><label className="settings-toggle"><span><strong>Finansal tutarları gizle</strong><span className="adaptive-small">Destekleyen ekranlarda tutarları maskele.</span></span><input type="checkbox" checked={preferences.hideBalance} onChange={e=>setHideBalance(e.target.checked)}/></label><div className="adaptive-card-soft"><p className="adaptive-label">Ortak demo kasa bakiyesi</p><strong className="adaptive-balance">{preferences.hideBalance?'••••••':(data.vault.balance/1e6).toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})+' USDC'}</strong></div><p className="adaptive-small">Bu özellik ekran gizliliği sağlar; şifreleme veya erişim kontrolü değildir.</p></section>
    <section className="adaptive-card adaptive-stack" aria-labelledby="settings-wallet"><h2 id="settings-wallet" className="adaptive-section-heading">Cüzdan bağlantısı</h2><p className="adaptive-description">{connection ? `${connection.name} · Tarayıcıda imza doğrulandı.` : "Henüz cüzdan bağlanmadı."}</p><p className="adaptive-small">Gerçek Vault PDA ve ağ bağlantısı henüz etkin değil.</p><Link href="/vault#wallet-connection" className="adaptive-button adaptive-button-secondary">Cüzdanı yönet</Link></section>
    <section className="adaptive-card adaptive-stack" aria-labelledby="settings-bell"><h2 id="settings-bell" className="adaptive-section-heading adaptive-row"><Bell/> Bildirimler</h2><label className="settings-toggle"><span><strong>Güvenlik bildirimleri</strong><span className="adaptive-small">Demo bildirim tercihi. Henüz gerçek bildirim gönderilmez.</span></span><input type="checkbox" checked={notifications} onChange={e=>changeNotifications(e.target.checked)}/></label></section>
    <section className="adaptive-card adaptive-stack"><h2 className="adaptive-section-heading adaptive-row"><Info/> Uygulama hakkında</h2><strong>AgentVault — Adaptive One 2.0</strong><p className="adaptive-description">Geliştirme sürümü · Demo ortamı. Gerçek para ve blockchain bağlantısı henüz etkin değil.</p>{preferences.mode==='professional'&&<p className="adaptive-small">Tercih deposu: localStorage · Kullanım modu: {preferences.mode}</p>}</section>
    <section className="adaptive-card adaptive-stack"><h2 className="adaptive-section-heading adaptive-row"><RotateCcw/> Varsayılan ayarlar</h2><p className="adaptive-description">Kişiselleştirme tercihlerini sıfırlayın. Karşılama durumu ve finansal veriler değiştirilmez.</p>{confirmReset?<div className="adaptive-stack"><p>Tercihlerinizi sıfırlamak istediğinizden emin misiniz?</p><div className="adaptive-row"><button type="button" className="adaptive-button adaptive-button-primary" onClick={reset}>Evet, sıfırla</button><button type="button" className="adaptive-button adaptive-button-secondary" onClick={()=>setConfirmReset(false)}>Vazgeç</button></div></div>:<button type="button" className="adaptive-button adaptive-button-secondary" onClick={()=>{setNotice('');setConfirmReset(true);}}>Varsayılan ayarlara dön</button>}{notice&&<p role="status" className="adaptive-status adaptive-status-success">{notice}</p>}</section>
  </div>;
}

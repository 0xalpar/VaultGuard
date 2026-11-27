"use client";
import { Wallet, ShieldCheck, ExternalLink, LogOut, LoaderCircle, Link2 } from 'lucide-react';
import { useWalletConnection } from './WalletProvider';

export default function WalletConnectionCard(){
  const {connection,busy,error,connect,disconnect}=useWalletConnection();
  return <section id="wallet-connection" className="adaptive-card adaptive-stack av-wallet-card" aria-labelledby="wallet-heading" aria-busy={busy}>
    <div className="adaptive-row"><span className="adaptive-icon-box"><Wallet aria-hidden="true" size={24}/></span><div className="adaptive-grow"><h2 id="wallet-heading" className="adaptive-section-heading">Cüzdanım</h2><p className="adaptive-description">Solana cüzdanınızı bağlayın ve bir mesaj imzalayarak sahipliğini doğrulayın.</p></div></div>
    {connection ? <>
      <div className="adaptive-status adaptive-status-success" role="status"><ShieldCheck aria-hidden="true" size={24}/><div><strong>{connection.name} · İmza doğrulandı</strong><p className="adaptive-small">Tarayıcıda doğrulanan cüzdan adresi</p><code className="av-wallet-address">{connection.address}</code></div></div>
      <button type="button" className="adaptive-button adaptive-button-secondary" disabled={busy} onClick={()=>void disconnect()}><LogOut aria-hidden="true" size={20}/> Bağlantıyı kes</button>
    </> : <>
      <div className="av-wallet-options">
        <button type="button" className="adaptive-button adaptive-button-secondary" disabled={busy} onClick={()=>void connect('Phantom')}><span className="av-wallet-mark av-wallet-phantom" aria-hidden="true">P</span> Phantom ile bağlan</button>
        <button type="button" className="adaptive-button adaptive-button-secondary" disabled={busy} onClick={()=>void connect('Solflare')}><span className="av-wallet-mark av-wallet-solflare" aria-hidden="true">S</span> Solflare ile bağlan</button>
      </div>
      <p className="adaptive-small">Uzantınız yoksa resmî sitesinden yükleyin: <a href="https://phantom.com/" target="_blank" rel="noreferrer">Phantom <ExternalLink size={13} aria-hidden="true"/></a> · <a href="https://solflare.com/" target="_blank" rel="noreferrer">Solflare <ExternalLink size={13} aria-hidden="true"/></a>.</p>
    </>}
    {busy&&<div className="adaptive-row" role="status"><LoaderCircle aria-hidden="true" size={20}/> Cüzdan onayı bekleniyor...</div>}
    {error&&<div className="adaptive-status adaptive-status-danger" role="alert">{error}</div>}
    <div className="adaptive-card-soft adaptive-stack"><div className="adaptive-row"><Link2 aria-hidden="true" size={20}/><strong>Gerçek kasa bağlantısı henüz yok</strong></div><p className="adaptive-small">Cüzdan imzası yalnızca sahiplik kanıtıdır. Vault PDA, zincir ağı ve USDC işlemleri henüz bağlanmadı. Aşağıdaki demo kasa gerçek cüzdanınızdan tamamen ayrıdır. Private key veya kurtarma kelimeleri istenmez.</p><button type="button" className="adaptive-button adaptive-button-secondary" disabled>Kasa oluştur (Smart Contract gerekli)</button></div>
  </section>;
}

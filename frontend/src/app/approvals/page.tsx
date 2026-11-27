"use client";

import {useState} from 'react';
import {useDemoVault} from '../../components/DemoVaultProvider';
import {useAdaptive} from '../../components/AdaptiveProvider';

export default function ApprovalsPage() {
  const {data, approve, status} = useDemoVault();
  const {preferences} = useAdaptive();
  const [notice, setNotice] = useState('');
  const pending = data.vault.logs.map((entry, index) => ({entry, index})).filter(({entry}) => entry.decision === 'pending');
  const suspended = data.vault.agents.filter(agent => agent.status === 'suspended');

  function decide(index: number, accepted: boolean) {
    try {
      approve(index, accepted);
      setNotice(accepted ? 'Karar işlendi. Güncel kontrollerin sonucunu İşlemlerim ekranında görebilirsiniz.' : 'Talep reddedildi. Para gönderilmedi.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Karar işlenemedi.');
    }
  }

  return <div className="adaptive-stack">
    <header><h1 className="adaptive-heading">Onaylarım</h1><p className="adaptive-description">Demo ödeme talepleri ve durdurulan asistanlar.</p></header>
    <p className="adaptive-small">Bu ekran yalnızca demo verilerini değiştirir. Gerçek imza ve blockchain işlemi yapılmaz.</p>
    {notice && <p role="status">{notice}</p>}
    <section className="adaptive-card adaptive-stack">
      <h2 className="adaptive-section-heading">Bekleyen ödeme talepleri</h2>
      <p>Onay yalnızca gösterilen alıcı ve tutar içindir. Alıcı izin listesine eklenmez. Güncel limitler, bakiye ve agent durumu yeniden kontrol edilir.</p>
      {!pending.length && <p>Bekleyen ödeme yok.</p>}
      {pending.map(({entry, index}) => <article key={index} className="adaptive-card-soft adaptive-stack">
        <strong>{data.profiles[entry.request.agentId]?.name ?? entry.request.agentId}</strong>
        <p>{preferences.hideBalance ? '••••' : `${entry.request.amount / 1e6} USDC`}</p>
        <code style={{overflowWrap: 'anywhere'}}>{entry.request.recipientWallet}</code>
        <p>Son geçerlilik: {new Date(entry.request.expiresAt).toLocaleString('tr-TR', {timeZone: 'Europe/Istanbul'})} (Türkiye saati)</p>
        <div className="adaptive-row">
          <button className="adaptive-button adaptive-button-primary" onClick={() => decide(index, true)}>Bu ödemeyi onayla</button>
          <button className="adaptive-button adaptive-button-secondary" onClick={() => decide(index, false)}>Reddet</button>
        </div>
      </article>)}
    </section>
    <section className="adaptive-card adaptive-stack">
      <h2 className="adaptive-section-heading">Durdurulan asistanlar</h2>
      <p>Yeniden etkinleştirme ihlal sayacını sıfırlar. Günlük ve toplam harcama korunur; reddedilmiş ödeme kendiliğinden gönderilmez.</p>
      {!suspended.length && <p>Onayınızı bekleyen durdurulmuş asistan yok.</p>}
      {suspended.map(agent => <article key={agent.id} className="adaptive-card-soft adaptive-stack">
        <strong>{data.profiles[agent.id]?.name ?? agent.id}</strong>
        <p>İlk doğrulanmış kural ihlali nedeniyle durduruldu.</p>
        <button className="adaptive-button adaptive-button-primary" onClick={() => {
          if (window.confirm('Asistan yeniden etkinleştirilsin mi? Harcama sınırları ve geçmişi korunur.')) {
            status(agent.id, 'active');
            setNotice('Asistan yeniden etkinleştirildi. İhlal sayacı sıfırlandı.');
          }
        }}>Yeniden etkinleştir</button>
      </article>)}
    </section>
  </div>;
}

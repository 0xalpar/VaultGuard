"use client";

import Link from "next/link";
import { useState, useRef } from "react";

import WalletConnectionCard from "../../components/WalletConnectionCard";
import {useDemoVault} from "../../components/DemoVaultProvider";
import {CENT} from "../../lib/demo-vault";

import {
  Wallet,
  Database,
  PlusCircle,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Bot,
  DollarSign,
  History,
  Cpu,
  FlaskConical,
  RotateCcw,
} from "lucide-react";

import {
  useAdaptive,
} from "../../components/AdaptiveProvider";

import AdaptiveMoneyWizard, {
  type MoneyAction,
} from "../../components/AdaptiveMoneyWizard";

import "./adaptive-vault.css";

/* ==========================================
   ADAPTIVE ONE 2.0
   MY MONEY
========================================== */

/* MONEY FORMAT */

function formatMoney(cents: number) {

  return (cents / 100).toLocaleString(
    "tr-TR",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
}

/* MAIN PAGE */

export default function VaultPage() {

  const {
    preferences,
    setHideBalance,
  } = useAdaptive();

  const {data,move,reset,freeze}=useDemoVault();
  const balance=data.vault.balance/CENT;

  const [action, setAction] =
    useState<MoneyAction | null>(null);

  const [wizardId, setWizardId] =
    useState(0);

  const transactions=data.vault.ownerMovements.map((m,i)=>({id:`OWNER-${i+1}`,action:m.kind,amount:m.amount/CENT})).reverse();

  const wizardRef =
    useRef<HTMLDivElement>(null);

  const easy =
    preferences.mode === "easy";

  const professional =
    preferences.mode === "professional";

  const hidden =
    preferences.hideBalance;

  const allocated = 0; // Agent limits and stops do not reserve owner funds.

  const available = Math.max(
    0,
    balance - allocated
  );

  const percentage = balance > 0
    ? available / balance * 100
    : 0;

  const circumference =
    2 * Math.PI * 53;

  function money(value: number) {

    return hidden
      ? "••••••"
      : formatMoney(value);
  }

  /* OPEN WIZARD */

  function openWizard(next: MoneyAction) {

    setWizardId((previous) => previous + 1);

    setAction(next);

    requestAnimationFrame(() => {

      wizardRef.current?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });

      wizardRef.current?.focus({
        preventScroll: true,
      });

    });
  }

  /* CONFIRM TRANSACTION */

  function confirmTransaction(
    amount: number
  ): boolean {

    if (
      !action ||
      !Number.isSafeInteger(amount) ||
      amount <= 0 ||
      amount > 100000000
    ) {
      return false;
    }

    if (
      action === "withdraw" &&
      amount > available
    ) {
      return false;
    }

    return move(action,amount);
  }

  /* RESET DEMO */

  function resetDemo() {

    const confirmed = window.confirm(
      "Tüm ortak demo verileri (bakiye, asistanlar, kurallar ve kayıtlar) sıfırlansın mı?"
    );

    if (!confirmed) return;

    reset();
    setAction(null);
  }

  return (
    <div className="adaptive-vault">

      {/* PAGE HEADER */}

      <header className="adaptive-vault-header">

        <p className="adaptive-vault-eyebrow">
          PARA YÖNETİMİ
        </p>

        <h1 className="adaptive-heading">
          Param
        </h1>

        <p className="adaptive-description">

          {easy
            ? "Paranızı kolayca yönetin."
            : professional
              ? "Dijital varlıklarınızı, kullanılabilir bakiyenizi ve sermaye dağılımınızı yönetin."
              : "Bakiyenizi görüntüleyin, para yatırın ve para çekin."}

        </p>

      </header>

      <WalletConnectionCard />

      {/* BLOCKCHAIN CONNECTION */}
      <section className="adaptive-card adaptive-stack">
        <div className="adaptive-row">
          <span className="adaptive-icon-box">
            <Database size={26} />
          </span>
          <div className="adaptive-grow">
            <h2 className="adaptive-section-heading">
              Blockchain bağlantısı
            </h2>
            <p className="adaptive-small">
              Solana Localnet · Test ortamı
            </p>
          </div>
        </div>

        <p className="adaptive-description">
          Blockchain üzerindeki kasalarınızı görüntüleyin ve ağ bağlantınızı kontrol edin.
          Bu veriler demo kasadan ayrıdır.
        </p>

        <Link
          href="/blockchain"
          className="adaptive-button adaptive-button-secondary adaptive-button-full"
          style={{ textDecoration: "none", color: "var(--ad-text)" }}
        >
          Blockchain sayfasına git
          <ArrowRight size={18} />
        </Link>
      </section>


      <section className="adaptive-card adaptive-stack">
        <div className="adaptive-row adaptive-between"><div><h2 className="adaptive-section-heading">Demo kasa #001</h2><p className="adaptive-small">{data.vault.frozen?"Donduruldu":"Aktif"} · Gerçek cüzdandan bağımsız · PDA henüz bağlı değil</p></div><button type="button" className="adaptive-button adaptive-button-secondary" onClick={()=>{if(window.confirm(data.vault.frozen?"Demo kasayı yeniden aç?":"Demo agent ödemelerini durdur? Kendi cüzdanına çekme açık kalır.")){freeze(!data.vault.frozen);setAction(null);}}}>{data.vault.frozen?"Dondurmayı kaldır":"Kasayı dondur"}</button></div>
      </section>
      {/* DEMO NOTICE */}

      <div className="adaptive-row">

        <FlaskConical
          size={19}
          style={{
            color: "var(--ad-muted)",
          }}
        />

        <p className="adaptive-small">
          Demo hesabı · Gerçek para kullanılmaz.
        </p>

      </div>

      {/* MAIN GRID */}

      <div className="adaptive-vault-grid">

        {/* PRIMARY COLUMN */}

        <div className="adaptive-vault-column">

          {/* BALANCE */}

          <section
            className="adaptive-vault-balance"
            style={{
              background: "var(--ad-surface)",
              color: "var(--ad-text)",
              border: "1px solid var(--ad-border)",
            }}
          >

            <div className="adaptive-row adaptive-between">

              <h2 className="adaptive-vault-balance-label">
                Kullanılabilir paranız
              </h2>

              <button
                type="button"
                className="adaptive-vault-eye"
                aria-label={
                  hidden
                    ? "Bakiyeyi göster"
                    : "Bakiyeyi gizle"
                }
                onClick={() =>
                  setHideBalance(!hidden)
                }
              >

                {hidden ? (
                  <EyeOff size={23} />
                ) : (
                  <Eye size={23} />
                )}

              </button>

            </div>

            <div className="adaptive-vault-balance-number">

              <strong>
                {money(available)}
              </strong>

              <span>USDC</span>

            </div>

            <p className="adaptive-small">
              Çekebileceğiniz kullanılabilir tutar
            </p>

            <div className="adaptive-vault-balance-divider" />

            <div className="adaptive-vault-balance-details">

              <div className="adaptive-vault-balance-detail">

                <span>Toplam paranız</span>

                <strong>
                  {money(balance)} USDC
                </strong>

              </div>

              <div className="adaptive-vault-balance-detail">

                <span>Dondurulan tutar</span>

                <strong>
                  {money(allocated)} USDC
                </strong>

              </div>

            </div>

          </section>

          {/* QUICK ACTIONS */}

          <div className="adaptive-vault-actions">

            <button
              type="button"
              className="adaptive-card adaptive-vault-action"
              onClick={() =>
                openWizard("deposit")
              }
            >

              <span className="adaptive-icon-box">

                <PlusCircle size={30} />

              </span>

              <strong>Para yatır</strong>

              <span className="adaptive-small">
                Bakiyenizi artırın
              </span>

            </button>

            <button
              type="button"
              className="adaptive-card adaptive-vault-action"
              disabled={balance===0}
              onClick={() =>
                openWizard("withdraw")
              }
            >

              <span className="adaptive-icon-box">

                <ArrowUpRight size={30} />

              </span>

              <strong>Para çek</strong>

              <span className="adaptive-small">
                Paranızı geri alın
              </span>

            </button>

          </div>

          {/* MONEY WIZARD */}

          <div
            ref={wizardRef}
            tabIndex={-1}
            style={{
              scrollMarginTop: "120px",
            }}
          >

            {action && (
              <AdaptiveMoneyWizard
                key={wizardId}
                action={action}
                balance={balance}
                available={available}
                hidden={hidden}
                onClose={() =>
                  setAction(null)
                }
                onConfirm={confirmTransaction}
              />
            )}

          </div>

          {/* CAPITAL ALLOCATION */}

          <section className="adaptive-card adaptive-stack">

            <div className="adaptive-row">

              <span className="adaptive-icon-box">

                <Wallet size={24} />

              </span>

              <div className="adaptive-grow">

                <h2 className="adaptive-section-heading">
                  Paranızın dağılımı
                </h2>

                <p className="adaptive-small">
                  Paranızın nerede kullanıldığını görün.
                </p>

              </div>

            </div>

            {hidden ? (

              <div className="adaptive-vault-empty">

                <EyeOff size={32} />

                <p>Finansal tutarlar gizlendi.</p>

              </div>

            ) : (

              <div className="adaptive-vault-allocation">

                <div
                  className="adaptive-vault-ring"
                  role="img"
                  aria-label={
                    `Paranızın yüzde ${Math.round(percentage)} kadarı kullanılabilir.`
                  }
                >

                  <svg
                    viewBox="0 0 140 140"
                    aria-hidden="true"
                  >

                    <circle
                      cx="70"
                      cy="70"
                      r="53"
                      fill="none"
                      stroke="var(--ad-border)"
                      strokeWidth="16"
                    />

                    <circle
                      cx="70"
                      cy="70"
                      r="53"
                      fill="none"
                      stroke="var(--ad-accent)"
                      strokeWidth="16"
                      strokeDasharray={
                        `${percentage / 100 * circumference} ${circumference}`
                      }
                      transform="rotate(-90 70 70)"
                    />

                  </svg>

                  <div className="adaptive-vault-ring-center">

                    <strong>
                      %{Math.round(percentage)}
                    </strong>

                    <span>Kullanılabilir</span>

                  </div>

                </div>

                <div className="adaptive-vault-legend">

                  <div className="adaptive-vault-legend-item">

                    <span className="adaptive-vault-legend-dot" />

                    <div className="adaptive-grow">

                      <p className="adaptive-small">
                        Kullanılabilir para
                      </p>

                      <strong>
                        {money(available)} USDC
                      </strong>

                    </div>

                  </div>

                  <div className="adaptive-vault-legend-item">

                    <span
                      className="adaptive-vault-legend-dot"
                      data-allocated="true"
                    />

                    <div className="adaptive-grow">

                      <p className="adaptive-small">
                        Dondurulan tutar
                      </p>

                      <strong>
                        {money(allocated)} USDC
                      </strong>

                    </div>

                  </div>

                </div>

              </div>

            )}

            <div className="adaptive-divider" />

            <Link
              href="/agents"
              className="adaptive-vault-link"
            >

              Asistanlarımı yönet

              <ArrowRight size={18} />

            </Link>

          </section>

          {/* SESSION TRANSACTIONS */}

          <section className="adaptive-card adaptive-stack">

            <div className="adaptive-row adaptive-between">

              <h2 className="adaptive-section-heading">
                Son para işlemleriniz
              </h2>

              <History
                size={24}
                style={{
                  color: "var(--ad-accent)",
                }}
              />

            </div>

            {transactions.length === 0 ? (

              <div className="adaptive-vault-empty">

                <History size={34} />

                <p>
                  Henüz para işlemi yapmadınız.
                </p>

                <p className="adaptive-small">
                  Para yatırdığınızda veya çektiğinizde
                  işlemler burada görünecek.
                </p>

              </div>

            ) : (

              <div>

                {transactions.map((item) => (

                  <div
                    key={item.id}
                    className="adaptive-vault-history-row"
                  >

                    <span className="adaptive-icon-box">

                      {item.action === "deposit" ? (

                        <ArrowDownLeft size={24} />

                      ) : (

                        <ArrowUpRight size={24} />

                      )}

                    </span>

                    <div className="adaptive-grow">

                      <p style={{
                        fontWeight: 600,
                      }}>

                        {item.action === "deposit"
                          ? "Para yatırıldı"
                          : "Para çekildi"}

                      </p>

                      <p className="adaptive-small">
                        Tamamlandı · Demo
                      </p>

                    </div>

                    <strong
                      className="adaptive-vault-history-amount"
                    >

                      {hidden
                        ? "••••••"
                        : `${item.action === "deposit" ? "+" : "−"}${formatMoney(item.amount)}`}

                      {" "}USDC

                    </strong>

                  </div>

                ))}

              </div>

            )}

            <Link
              href="/transactions"
              className="adaptive-vault-link"
            >

              Genel işlem geçmişini gör

              <ArrowRight size={18} />

            </Link>

          </section>

        </div>

        {/* SECONDARY COLUMN */}

        <div className="adaptive-vault-column">

          {/* MONEY EXPLANATION */}

          <section className="adaptive-card adaptive-stack">

            <div className="adaptive-row">

              <span className="adaptive-icon-box">

                <Bot size={25} />

              </span>

              <h2 className="adaptive-section-heading">
                Dondurulan kasa bakiyesi
              </h2>

            </div>

            <p className="adaptive-vault-result-value">

              {money(allocated)} USDC

            </p>

            <p className="adaptive-description">

              Agent limitleri para rezervasyonu değildir. Dondurma yalnızca agent ödemelerini durdurur. Kendi cüzdanınıza para çekebilirsiniz.

            </p>

            <Link
              href="/agents"
              className="adaptive-button adaptive-button-secondary adaptive-button-full"
            >

              Asistanlarımı incele

              <ArrowRight size={18} />

            </Link>

          </section>

          {/* SECURITY INFORMATION */}

          <section className="adaptive-card adaptive-stack">

            <div className="adaptive-row">

              <span className="adaptive-icon-box">

                <ShieldCheck size={26} />

              </span>

              <h2 className="adaptive-section-heading">
                Kontrollü para yönetimi
              </h2>

            </div>

            <p className="adaptive-description">

              Kasa sahibi yatırma ve çekme işlemlerini onaylar. Agent talepleri kendi demo kurallarına göre değerlendirilir.

            </p>

            <p className="adaptive-small">

              Bu ekran demo ortamında çalışır.
              Gerçek blockchain güvenlik sistemi
              henüz bağlı değildir.

            </p>

            <Link
              href="/policies"
              className="adaptive-vault-link"
            >

              Güvenlik kurallarını incele

              <ArrowRight size={18} />

            </Link>

          </section>

          {/* STANDARD AND PROFESSIONAL */}

          {!easy && (
            <section className="adaptive-card adaptive-stack">

              <h2 className="adaptive-section-heading">
                Varlıklarım
              </h2>

              <div className="adaptive-vault-asset">

                <span className="adaptive-vault-asset-logo">

                  <DollarSign size={30} />

                </span>

                <div className="adaptive-grow">

                  <p style={{
                    fontWeight: 600,
                  }}>
                    USD Coin
                  </p>

                  <p className="adaptive-small">
                    USDC · Dijital dolar
                  </p>

                </div>

                <strong
                  className="adaptive-vault-asset-value"
                >

                  {money(balance)} USDC

                </strong>

              </div>

              <div className="adaptive-divider" />

              <p className="adaptive-small">

                Gösterilen varlıklar simülasyon
                verileridir.

              </p>

            </section>
          )}

          {/* PROFESSIONAL INFORMATION */}

          {professional && (
            <section className="adaptive-card adaptive-stack">

              <div className="adaptive-row">

                <Cpu
                  size={25}
                  style={{
                    color: "var(--ad-accent)",
                  }}
                />

                <h2 className="adaptive-section-heading">
                  Teknik bilgiler
                </h2>

              </div>

              {[
                ["Blockchain ağı", "Bağlı değil (demo)"],
                ["Varlık türü", "USDC"],
                ["Cüzdan bağlantısı", "Bağlı değil"],
                ["İşlem ortamı", "Simülasyon"],
                ["İşlem ücreti (demo)", "0 USDC"],
                ["On-chain bağlantı", "Henüz bağlı değil"],
              ].map(([label, value]) => (

                <div
                  key={label}
                  className="adaptive-stack"
                >

                  <div className="adaptive-vault-summary-row">

                    <span className="adaptive-small">
                      {label}
                    </span>

                    <strong>{value}</strong>

                  </div>

                  <div className="adaptive-divider" />

                </div>

              ))}

            </section>
          )}

          {/* RESET DEMO */}

          <section className="adaptive-card adaptive-stack">

            <h2 className="adaptive-section-heading">
              Demo hesabı
            </h2>

            <p className="adaptive-small">

              Tüm ekranların ortak demo verileri başlangıç durumuna döner.

            </p>

            <button
              type="button"
              className="adaptive-button adaptive-button-secondary adaptive-button-full"
              onClick={resetDemo}
            >

              <RotateCcw size={19} />

              Tüm demo verilerini sıfırla

            </button>

          </section>

        </div>

      </div>

    </div>
  );
}

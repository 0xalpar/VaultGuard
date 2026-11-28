
"use client";
import ChainWorkspace from "../components/ChainWorkspace";

import Link from "next/link";
import {useDemoVault} from "../components/DemoVaultProvider";
import {recordsFor,statusLabel,dayAt} from "../lib/demo-vault";

import {
  Wallet,
  Bot,
  ShieldCheck,
  ShieldAlert,
  History,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRight,
  ChevronRight,
  Eye,
  EyeOff,
  Cpu,
  CheckCircle2,
  FlaskConical,
} from "lucide-react";

import {
  useAdaptive,
} from "../components/AdaptiveProvider";

import AdaptiveSpendingChart
  from "../components/AdaptiveSpendingChart";

import "./adaptive-home.css";

/* ==========================================
   ADAPTIVE ONE 2.0
   HOME DASHBOARD
========================================== */

/* DEMO DATA */

const quickLinks = [
  {
    href: "/agents",
    icon: Bot,
    title: "Asistanlarım",
    description: "Dijital asistanlarınızı yönetin.",
  },
  {
    href: "/policies",
    icon: ShieldCheck,
    title: "Güvenliğim",
    description: "Harcama sınırlarınızı belirleyin.",
  },
  {
    href: "/transactions",
    icon: History,
    title: "İşlemlerim",
    description: "Paranızın nasıl kullanıldığını görün.",
  },
];

/* NUMBER FORMAT */

function formatMoney(value: number) {
  return value.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* MAIN HOME PAGE */

function HomePage() {
  const {
    preferences,
    setHideBalance,
  } = useAdaptive();

  const {data,day,storageAvailable}=useDemoVault();
  const vault=data.vault;
  const liveAgents=vault.agents.filter(a=>a.status!=="revoked");
  const assistants=liveAgents.map(a=>({id:a.id,name:data.profiles[a.id].name,active:a.status==="active",status:statusLabel[a.status],spent:(a.day===day?a.dailySpent:0)/1e6,limit:a.policy.dailyLimit/1e6}));
  const demo={balance:vault.balance/1e6,available:vault.balance/1e6,allocated:0,dailySpent:vault.logs.filter(l=>l.decision==="approved"&&dayAt(l.at)===day).reduce((sum,l)=>sum+l.request.amount/1e6,0),dailyLimit:liveAgents.reduce((sum,a)=>sum+a.policy.dailyLimit/1e6,0),activeAgents:liveAgents.filter(a=>a.status==="active").length,blockedTransactions:vault.logs.filter(l=>l.decision==="rejected").length};
  const transactions=recordsFor(data).slice(0,5).map(r=>({id:r.id,icon:r.status==="Engellendi"?ShieldAlert:r.amount>0?ArrowDownLeft:Bot,title:r.name,description:r.description,amount:(r.status==="Engellendi"?"":r.amount>0?"+":"−")+formatMoney(Math.abs(r.amount)/100),blocked:r.status==="Engellendi"}));
  const easy =
    preferences.mode === "easy";

  const professional =
    preferences.mode === "professional";

  const hidden =
    preferences.hideBalance;

  const remaining =
    Math.max(
      0,
      (vault.frozen?0:Math.min(vault.balance/1e6,liveAgents.filter(a=>a.status==="active").reduce((sum,a)=>sum+Math.max(0,Math.min(a.policy.dailyLimit-(a.day===day?a.dailySpent:0),a.policy.totalLimit-a.totalSpent))/1e6,0)))
    );

  const dailyPercentage =
    Math.min(
      100,
      demo.dailyLimit===0?0:demo.dailySpent /
      demo.dailyLimit * 100
    );

  function money(value: number) {
    return hidden
      ? "••••••"
      : formatMoney(value);
  }

  const stats = [
    {
      icon: Bot,
      label: "Yetkili asistanlar",
      value: String(demo.activeAgents),
      href: "/agents",
    },
    {
      icon: Wallet,
      label: "Günlük harcama",
      value: `${money(demo.dailySpent)} USDC`,
      href: "/transactions",
    },
    {
      icon: ShieldAlert,
      label: "Engellenen işlemler",
      value: String(
        demo.blockedTransactions
      ),
      href: "/transactions",
    },
    {
      icon: ShieldCheck,
      label: "Tahmini kalan agent bütçesi",
      value: `${money(remaining)} USDC`,
      href: "/policies",
    },
  ];

  return (
    <div className="adaptive-home">

      {/* =================================
          PAGE HEADER
      ================================== */}

      <header className="adaptive-home-header">

        <p className="adaptive-home-eyebrow">
          ANA SAYFA
        </p>

        <h1 className="adaptive-heading">

          {easy
            ? "Her şey kontrolünüzde."
            : professional
              ? "Finansal kontrol merkezi."
              : "Finansal durumunuz."}

        </h1>

        <p className="adaptive-description">

          {easy
            ? "Paranızı ve dijital asistanlarınızı kolayca yönetin."
            : professional
              ? "Finansal verilerinizi, asistan yetkilerini ve işlem güvenliğini takip edin."
              : "Bakiyeniz, harcamalarınız ve dijital asistanlarınız tek bir yerde."}

        </p>

      </header>

      {/* DEMO INFORMATION */}

      <div className="adaptive-row">

        <FlaskConical
          size={19}
          style={{
            color: "var(--ad-muted)",
          }}
        />

        <p className="adaptive-small">
          Demo hesabı · Gerçek para kullanılmaz. {storageAvailable?"":"Tarayıcı depolaması kullanılamıyor."}
        </p>

      </div>

      {/* =================================
          MAIN DASHBOARD GRID
      ================================== */}

      <div className="adaptive-home-grid">

        {/* PRIMARY COLUMN */}

        <div className="adaptive-home-primary">

          {/* BALANCE CARD */}

          <section className="adaptive-card adaptive-stack adaptive-home-balance">

            <div className="adaptive-row adaptive-between">

              <h2 className="adaptive-label">
                Toplam paranız
              </h2>

              <button
                type="button"
                className="adaptive-icon-button"
                aria-label={
                  hidden
                    ? "Finansal tutarları göster"
                    : "Finansal tutarları gizle"
                }
                onClick={() =>
                  setHideBalance(!hidden)
                }
              >

                {hidden ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}

              </button>

            </div>

            <div className="adaptive-home-balance-value">

              <strong>
                {money(demo.balance)}
              </strong>

              <span>USDC</span>

            </div>

            <p className="adaptive-small">

              Dijital dolar bakiyesi · Örnek veri

            </p>

            <div className="adaptive-divider" />

            <div className="adaptive-home-balance-details">

              <div className="adaptive-home-detail">

                <span className="adaptive-small">
                  Kullanılabilir para
                </span>

                <strong>
                  {money(demo.available)} USDC
                </strong>

              </div>

              <div className="adaptive-home-detail">

                <span className="adaptive-small">
                  Dondurulan tutar
                </span>

                <strong>
                  {money(demo.allocated)} USDC
                </strong>

              </div>

            </div>

            <div className="adaptive-home-actions">

              <Link
                href="/vault"
                className="adaptive-button adaptive-button-primary"
              >

                <Plus size={23} />

                Para yatır

              </Link>

              <Link
                href="/vault"
                className="adaptive-button adaptive-button-secondary"
              >

                <ArrowUpRight size={23} />

                Para çek

              </Link>

            </div>

            <Link
              href="/vault"
              className="adaptive-home-text-link"
            >

              Para detaylarını gör

              <ArrowRight size={17} />

            </Link>

          </section>

          {/* SECURITY STATUS */}

          <Link
            href="/policies"
            className={`adaptive-status ${vault.frozen?"adaptive-status-danger":"adaptive-status-success"} adaptive-home-security`}
          >

            <ShieldCheck size={30} />

            <div className="adaptive-grow">

              <p style={{
                fontWeight: 600,
              }}>
                {vault.frozen?"Demo agent ödemeleri durduruldu":"Demo kuralları etkin"}
              </p>

              <p
                className="adaptive-small"
                style={{
                  color: "inherit",
                  marginTop: 4,
                }}
              >
                Örnek güvenlik kurallarınızı
                inceleyin ve yönetin.
              </p>

            </div>

            <ChevronRight size={22} />

          </Link>

          {/* EASY MODE QUICK ACCESS */}

          {easy && (
            <section className="adaptive-home-quick">

              <h2 className="adaptive-section-heading">
                Hızlı işlemler
              </h2>

              {quickLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="adaptive-list-item"
                  >

                    <span className="adaptive-icon-box">

                      <Icon size={25} />

                    </span>

                    <div className="adaptive-grow">

                      <p style={{
                        fontSize: "1.1em",
                        fontWeight: 600,
                      }}>
                        {item.title}
                      </p>

                      <p className="adaptive-small">

                        {item.description}

                      </p>

                    </div>

                    <ChevronRight
                      size={21}
                      style={{
                        flexShrink: 0,
                        color: "var(--ad-muted)",
                      }}
                    />

                  </Link>
                );
              })}

            </section>
          )}

          {/* STANDARD / PROFESSIONAL STATS */}

          {!easy && (
            <>

              <section className="adaptive-home-stats">

                {stats.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="adaptive-card adaptive-home-stat"
                    >

                      <span className="adaptive-icon-box">

                        <Icon size={24} />

                      </span>

                      <p className="adaptive-home-stat-value">

                        {item.value}

                      </p>

                      <p className="adaptive-small">
                        {item.label}
                      </p>

                    </Link>
                  );
                })}

              </section>

              <AdaptiveSpendingChart />

            </>
          )}

          {/* RECENT TRANSACTIONS */}

          <section className="adaptive-card adaptive-stack">

            <div className="adaptive-row adaptive-between">

              <h2 className="adaptive-section-heading">
                Son işlemler
              </h2>

              <Link
                href="/transactions"
                className="adaptive-home-text-link"
              >

                Tümünü gör

                <ArrowRight size={16} />

              </Link>

            </div>

            <div className="adaptive-home-transactions">

              {transactions.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.id}
                    className="adaptive-home-transaction"
                  >

                    <span
                      className="adaptive-home-transaction-icon"
                      data-blocked={item.blocked}
                    >

                      <Icon size={23} />

                    </span>

                    <div className="adaptive-grow">

                      <p style={{
                        fontWeight: 600,
                      }}>
                        {item.title}
                      </p>

                      <p className="adaptive-small">
                        {item.description}
                      </p>

                    </div>

                    <div
                      className="adaptive-home-transaction-amount"
                      style={{
                        color: item.blocked
                          ? "var(--ad-danger)"
                          : "var(--ad-text)",
                      }}
                    >

                      <span>
                        {hidden
                          ? "••••"
                          : item.amount}
                      </span>

                      <span className="adaptive-small">

                        USDC

                      </span>

                      {item.blocked && (
                        <span className="adaptive-small">

                          Para çekilmedi

                        </span>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

            <p className="adaptive-small">
              Ortak demo işlem geçmişi
            </p>

          </section>

        </div>

        {/* =================================
            SECONDARY COLUMN
        ================================== */}

        <div className="adaptive-home-secondary">

          {/* DAILY SPENDING LIMIT */}

          <section className="adaptive-card adaptive-stack">

            <div className="adaptive-row">

              <span className="adaptive-icon-box">

                <Wallet size={23} />

              </span>

              <div className="adaptive-grow">

                <h2 className="adaptive-section-heading">

                  Agent günlük limitleri toplamı

                </h2>

                <p className="adaptive-small">
                  Bugünkü örnek kullanım
                </p>

              </div>

            </div>

            <p className="adaptive-home-limit-value">

              {hidden
                ? "•••• / ••••"
                : `${demo.dailySpent} / ${demo.dailyLimit}`}

              {" "}USDC

            </p>

            {!hidden && (
              <>

                <div
                  className="adaptive-progress"
                  role="progressbar"
                  aria-label="Agent günlük limitleri toplamı"
                  aria-valuenow={dailyPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >

                  <div
                    className="adaptive-progress-fill"
                    style={{
                      width:
                        `${dailyPercentage}%`,
                    }}
                  />

                </div>

                <p className="adaptive-description">

                  Kasa bakiyesi ve kalan agent limitlerine göre üst sınır: {formatMoney(remaining)} USDC.

                </p>

              </>
            )}

            <Link
              href="/policies"
              className="adaptive-button adaptive-button-secondary adaptive-button-full"
            >

              Harcama sınırlarını düzenle

              <ChevronRight size={18} />

            </Link>

          </section>

          {/* ASSISTANT SUMMARY */}

          <section className="adaptive-card adaptive-stack">

            <div className="adaptive-row adaptive-between">

              <h2 className="adaptive-section-heading">
                Asistanlarım
              </h2>

              <Bot
                size={24}
                style={{
                  color: "var(--ad-accent)",
                }}
              />

            </div>

            <p className="adaptive-description">

              {demo.activeAgents} dijital asistan
              demo işlemi yapmaya yetkili.

            </p>

            {assistants.map((item) => (
              <div
                key={item.id}
                className="adaptive-stack"
              >

                <div className="adaptive-divider" />

                <div className="adaptive-home-agent-row">

                  <span className="adaptive-icon-box">

                    <Bot size={23} />

                  </span>

                  <div className="adaptive-grow">

                    <p style={{
                      fontWeight: 600,
                    }}>
                      {item.name}
                    </p>

                    <div className="adaptive-row">

                      <CheckCircle2
                        size={16}
                        style={{
                          color: "var(--ad-success)",
                        }}
                      />

                      <span className="adaptive-small">

                        {item.status} · Demo

                      </span>

                    </div>

                  </div>

                </div>

                {!easy && !hidden && (
                  <>

                    <div className="adaptive-row adaptive-between">

                      <span className="adaptive-small">
                        Günlük harcama
                      </span>

                      <span style={{
                        fontWeight: 500,
                      }}>

                        {item.spent} / {item.limit}
                        {" "}USDC

                      </span>

                    </div>

                    <div className="adaptive-progress">

                      <div
                        className="adaptive-progress-fill"
                        style={{
                          width:
                            `${item.spent / item.limit * 100}%`,
                        }}
                      />

                    </div>

                  </>
                )}

              </div>
            ))}

            <Link
              href="/agents"
              className="adaptive-button adaptive-button-secondary adaptive-button-full"
            >

              Asistanlarımı yönet

              <ChevronRight size={18} />

            </Link>

          </section>

          {/* SECURITY WARNING */}

          <section className="adaptive-status adaptive-status-warning">

            <ShieldAlert size={26} />

            <div className="adaptive-grow">

              <p style={{
                fontWeight: 600,
              }}>
                {demo.blockedTransactions} örnek işlem engellendi
              </p>

              <p
                className="adaptive-small"
                style={{
                  color: "inherit",
                  marginTop: 6,
                }}
              >

                Bu kayıtlar güvenlik kurallarının
                nasıl çalışacağını gösteren
                simülasyon örnekleridir.

              </p>

              <Link
                href="/transactions"
                className="adaptive-home-text-link"
                style={{
                  color: "inherit",
                }}
              >

                İşlemleri incele

                <ArrowRight size={17} />

              </Link>

            </div>

          </section>

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

                  Sistem bilgileri

                </h2>

              </div>

              {[
                [
                  "Blockchain ağı",
                  "Bağlı değil (demo)",
                ],
                [
                  "Yetkilendirme motoru",
                  "Simülasyon",
                ],
                [
                  "Cüzdan bağlantısı",
                  "Bağlı değil",
                ],
                [
                  "İşlem başına limit",
                  "Agent bazında",
                ],
                [
                  "On-chain güvenlik",
                  "Henüz bağlı değil",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="adaptive-home-system-row"
                >

                  <span className="adaptive-small">

                    {label}

                  </span>

                  <span style={{
                    fontSize: "0.9em",
                    fontWeight: 500,
                  }}>

                    {value}

                  </span>

                </div>
              ))}

            </section>
          )}

        </div>

      </div>

    </div>
  );
}

export default function Page() {
  return process.env.NEXT_PUBLIC_VAULTGUARD_MODE === "chain" ? <ChainWorkspace view="home"/> : <HomePage/>;
}

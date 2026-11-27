
"use client";

import { useState } from "react";

import {
  ShieldCheck,
  ShieldAlert,
  Sun,
  Moon,
  Monitor,
  Heart,
  LayoutDashboard,
  Cpu,
  Type,
  Plus,
  ArrowUpRight,
  Bot,
  History,
  ChevronRight,
  Check,
  Eye,
  EyeOff,
  RotateCcw,
  Database,
} from "lucide-react";

import {
  AdaptiveRoot,
  useAdaptive,
  ADAPTIVE_MODES,
  ADAPTIVE_ACCENTS,
} from "../../components/AdaptiveProvider";

const modeIcons = {
  easy: Heart,
  standard: LayoutDashboard,
  professional: Cpu,
};

const menuItems = [
  {
    icon: Bot,
    title: "Asistanlarım",
    description: "2 asistan çalışıyor.",
  },
  {
    icon: ShieldCheck,
    title: "Güvenliğim",
    description:
      "Harcama sınırlarınızı yönetin.",
  },
  {
    icon: History,
    title: "İşlemlerim",
    description:
      "Geçmiş işlemlerinizi görün.",
  },
];

const statistics = [
  {
    label: "Aktif asistanlar",
    value: "02",
  },
  {
    label: "Günlük harcama",
    value: "35 USDC",
  },
  {
    label: "Engellenen işlemler",
    value: "02",
  },
  {
    label: "Kalan günlük limit",
    value: "65 USDC",
  },
];

const weeklySpending = [
  { day: "Pzt", value: 2 },
  { day: "Sal", value: 5 },
  { day: "Çar", value: 3 },
  { day: "Per", value: 8 },
  { day: "Cum", value: 4 },
  { day: "Cmt", value: 10 },
  { day: "Paz", value: 3 },
];

/* PREVIEW CONTENT */

function AdaptivePreviewContent() {
  const {
    preferences,
    resolvedAppearance,
    motionEnabled,
    ready,
    storageAvailable,
    setMode,
    setAppearance,
    setAccent,
    setTextSize,
    setMotion,
    setHideBalance,
    resetPreferences,
  } = useAdaptive();

  const [notice, setNotice] =
    useState("");

  const dark =
    resolvedAppearance === "dark";

  const easy =
    preferences.mode === "easy";

  const professional =
    preferences.mode === "professional";

  const currentMode =
    ADAPTIVE_MODES.find(
      (item) =>
        item.id === preferences.mode
    ) ?? ADAPTIVE_MODES[0];

  const heading = easy
    ? "Her şey kontrolünüzde."
    : professional
      ? "Finansal kontrol merkezi"
      : "Finansal durumunuz";

  function displayBalance(
    value: string
  ) {
    return preferences.hideBalance
      ? "••••••"
      : value;
  }

  if (!ready) {
    return (
      <div
        className="adaptive-card"
        role="status"
      >
        Tercihleriniz yükleniyor...
      </div>
    );
  }

  return (
    <div className="adaptive-stack">

      {/* HEADER */}

      <header className="adaptive-row">

        <div
          className="adaptive-icon-box"
          style={{
            background: "var(--ad-accent)",
            color: "var(--ad-on-accent)",
          }}
        >
          <ShieldCheck size={27} />
        </div>

        <div className="adaptive-grow">

          <h2 className="adaptive-section-heading">
            AgentVault.
          </h2>

          <p className="adaptive-small">
            ADAPTIVE ONE 2.0
          </p>

        </div>

        <button
          type="button"
          className="adaptive-icon-button"
          aria-label={
            dark
              ? "Açık temaya geç"
              : "Koyu temaya geç"
          }
          onClick={() =>
            setAppearance(
              dark ? "light" : "dark"
            )
          }
        >
          {dark ? (
            <Sun size={22} />
          ) : (
            <Moon size={22} />
          )}
        </button>

      </header>

      {/* DEMO STATUS */}

      <div className="adaptive-card-soft">

        <p className="adaptive-small">
          Demo hesabı · Gerçek para kullanılmaz.
        </p>

      </div>

      {/* USAGE MODE */}

      <section className="adaptive-card adaptive-stack">

        <h2 className="adaptive-section-heading">
          Nasıl kullanmak istersiniz?
        </h2>

        <p className="adaptive-description">
          Kendinize uygun kullanım biçimini
          seçebilirsiniz.
        </p>

        {ADAPTIVE_MODES.map((item) => {
          const Icon =
            modeIcons[item.id];

          const selected =
            preferences.mode === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className="adaptive-list-item"
              aria-pressed={selected}
              onClick={() =>
                setMode(item.id)
              }
              style={{
                borderColor: selected
                  ? "var(--ad-accent)"
                  : "var(--ad-border)",

                background: selected
                  ? "var(--ad-surface-secondary)"
                  : "var(--ad-surface)",
              }}
            >

              <span className="adaptive-icon-box">
                <Icon size={24} />
              </span>

              <div className="adaptive-grow">

                <p style={{ fontWeight: 600 }}>
                  {item.name}
                </p>

                <p className="adaptive-small">
                  {item.description}
                </p>

              </div>

              {selected && (
                <Check
                  size={22}
                  style={{
                    color: "var(--ad-accent)",
                    flexShrink: 0,
                  }}
                />
              )}

            </button>
          );
        })}

      </section>

      {/* LIVE PREVIEW */}

      <section className="adaptive-stack">

        <div className="adaptive-row adaptive-between">

          <span className="adaptive-label">
            Canlı önizleme
          </span>

          <span className="adaptive-small">
            {currentMode.name}
          </span>

        </div>

        <h1 className="adaptive-heading">
          {heading}
        </h1>

        <p className="adaptive-description">

          {easy
            ? "Paranızı ve dijital asistanlarınızı kolayca yönetin."
            : professional
              ? "Finansal veriler, asistan yetkileri ve sistem bilgileri."
              : "Bakiyeniz, harcamalarınız ve asistanlarınız tek yerde."}

        </p>

      </section>

      {/* BALANCE */}

      <section className="adaptive-card adaptive-stack">

        <div className="adaptive-row adaptive-between">

          <p className="adaptive-label">
            Toplam paranız
          </p>

          <button
            type="button"
            className="adaptive-icon-button"
            aria-label={
              preferences.hideBalance
                ? "Bakiyeyi göster"
                : "Bakiyeyi gizle"
            }
            onClick={() =>
              setHideBalance(
                !preferences.hideBalance
              )
            }
          >

            {preferences.hideBalance ? (
              <EyeOff size={21} />
            ) : (
              <Eye size={21} />
            )}

          </button>

        </div>

        <div className="adaptive-row">

          <p className="adaptive-balance">
            {displayBalance("100,00")}
          </p>

          <span className="adaptive-label">
            USDC
          </span>

        </div>

        {!easy && (
          <div className="adaptive-grid-two">

            <div className="adaptive-card-soft">

              <p className="adaptive-small">
                Kullanılabilir
              </p>

              <p style={{
                fontWeight: 600,
                fontSize: "1.25em",
              }}>
                {displayBalance("65,00")}
              </p>

            </div>

            <div className="adaptive-card-soft">

              <p className="adaptive-small">
                Asistanlara ayrılan
              </p>

              <p style={{
                fontWeight: 600,
                fontSize: "1.25em",
              }}>
                {displayBalance("35,00")}
              </p>

            </div>

          </div>
        )}

        <div className="adaptive-grid-two">

          <button
            type="button"
            className="adaptive-button adaptive-button-primary"
            onClick={() =>
              setNotice(
                "Para yatırma ekranı sonraki aşamalarda oluşturulacak."
              )
            }
          >

            <Plus size={22} />

            Para yatır

          </button>

          <button
            type="button"
            className="adaptive-button adaptive-button-secondary"
            onClick={() =>
              setNotice(
                "Para çekme ekranı sonraki aşamalarda oluşturulacak."
              )
            }
          >

            <ArrowUpRight size={22} />

            Para çek

          </button>

        </div>

        <div
          role="status"
          aria-live="polite"
          className="adaptive-small"
        >
          {notice}
        </div>

      </section>

      {/* SECURITY STATUS */}

      <section className="adaptive-status adaptive-status-success">

        <ShieldCheck size={28} />

        <div className="adaptive-grow">

          <p style={{ fontWeight: 600 }}>
            Harcama koruması açık
          </p>

          <p
            className="adaptive-small"
            style={{ color: "inherit" }}
          >
            Örnek güvenlik kuralları etkin.
          </p>

        </div>

      </section>

      {/* EASY MODE */}

      {easy && (
        <section className="adaptive-stack">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                className="adaptive-list-item"
                onClick={() =>
                  setNotice(
                    `${item.title} ekranı sonraki aşamalarda oluşturulacak.`
                  )
                }
              >

                <span className="adaptive-icon-box">
                  <Icon size={25} />
                </span>

                <div className="adaptive-grow">

                  <p style={{
                    fontWeight: 600,
                    fontSize: "1.1em",
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

              </button>
            );
          })}

        </section>
      )}

      {/* STANDARD AND PROFESSIONAL */}

      {!easy && (
        <>

          <section className="adaptive-grid-two">

            {statistics.map((item) => (
              <div
                key={item.label}
                className="adaptive-card adaptive-stack"
              >

                <p className="adaptive-small">
                  {item.label}
                </p>

                <p style={{
                  fontSize: "1.5em",
                  fontWeight: 600,
                }}>
                  {item.value}
                </p>

              </div>
            ))}

          </section>

          {/* WEEKLY SPENDING */}

          <section className="adaptive-card adaptive-stack">

            <h2 className="adaptive-section-heading">
              Haftalık harcamalar
            </h2>

            <p style={{
              fontSize: "1.75em",
              fontWeight: 600,
            }}>
              35,00 USDC
            </p>

            <svg
              viewBox="0 0 350 165"
              style={{
                width: "100%",
                height: "auto",
              }}
              role="img"
              aria-label="Haftalık örnek harcamalar: Pazartesi 2, Salı 5, Çarşamba 3, Perşembe 8, Cuma 4, Cumartesi 10, Pazar 3 USDC."
            >

              {[30, 60, 90, 120].map((y) => (
                <line
                  key={y}
                  x1="0"
                  x2="350"
                  y1={y}
                  y2={y}
                  stroke="var(--ad-border)"
                  strokeDasharray="4 4"
                />
              ))}

              {weeklySpending.map(
                (item, index) => (
                  <g key={item.day}>

                    <rect
                      x={12 + index * 48}
                      y={130 - item.value * 10}
                      width="28"
                      height={item.value * 10}
                      rx="6"
                      fill="var(--ad-accent)"
                      opacity={
                        index === 5 ? 1 : 0.65
                      }
                    />

                    <text
                      x={26 + index * 48}
                      y={123 - item.value * 10}
                      textAnchor="middle"
                      fill="var(--ad-text)"
                      fontSize="11"
                    >
                      {item.value}
                    </text>

                    <text
                      x={26 + index * 48}
                      y="153"
                      textAnchor="middle"
                      fill="var(--ad-muted)"
                      fontSize="11"
                    >
                      {item.day}
                    </text>

                  </g>
                )
              )}

            </svg>

            <p className="adaptive-small">
              Son 7 güne ait örnek harcamalar.
            </p>

          </section>

        </>
      )}

      {/* PROFESSIONAL MODE */}

      {professional && (
        <section className="adaptive-card adaptive-stack">

          <div className="adaptive-row">

            <Cpu
              size={24}
              style={{
                color: "var(--ad-accent)",
              }}
            />

            <h2 className="adaptive-section-heading">
              Sistem bilgileri
            </h2>

          </div>

          {[
            ["Blockchain ağı", "Solana Devnet"],
            ["Yetkilendirme motoru", "Simülasyon"],
            ["Günlük limit", "100 USDC"],
            ["İşlem başına limit", "25 USDC"],
            ["Cüzdan bağlantısı", "Bağlı değil"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="adaptive-stack"
            >

              <div className="adaptive-row adaptive-between">

                <span className="adaptive-small">
                  {label}
                </span>

                <span style={{
                  fontWeight: 500,
                }}>
                  {value}
                </span>

              </div>

              <div className="adaptive-divider" />

            </div>
          ))}

        </section>
      )}

      {/* IMPORTANT SECURITY WARNING */}

      <section className="adaptive-status adaptive-status-danger">

        <ShieldAlert size={26} />

        <div className="adaptive-grow">

          <p style={{ fontWeight: 600 }}>
            Güvensiz işlem engellendi
          </p>

          <p
            className="adaptive-small"
            style={{ color: "inherit" }}
          >
            Harcama sınırı aşıldığı için
            örnek işlem durduruldu.
          </p>

        </div>

      </section>

      {/* APPEARANCE SETTINGS */}

      <section className="adaptive-card adaptive-stack">

        <h2 className="adaptive-section-heading">
          Görünüm ayarları
        </h2>

        <p className="adaptive-description">
          Uygulamayı kendinize uygun hale
          getirin.
        </p>

        <p style={{ fontWeight: 600 }}>
          Ekran teması
        </p>

        <div className="adaptive-grid-three">

          {[
            {
              id: "light",
              name: "Açık",
              icon: Sun,
            },
            {
              id: "dark",
              name: "Koyu",
              icon: Moon,
            },
            {
              id: "system",
              name: "Sistem",
              icon: Monitor,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                className="adaptive-theme-option"
                aria-pressed={
                  preferences.appearance ===
                  item.id
                }
                onClick={() =>
                  setAppearance(
                    item.id as
                      | "light"
                      | "dark"
                      | "system"
                  )
                }
              >

                <Icon size={26} />

                {item.name}

              </button>
            );
          })}

        </div>

        <div className="adaptive-divider" />

        <p style={{ fontWeight: 600 }}>
          Renk tercihiniz
        </p>

        <div className="adaptive-grid-three">

          {ADAPTIVE_ACCENTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="adaptive-theme-option"
              aria-pressed={
                preferences.accent === item.id
              }
              onClick={() =>
                setAccent(item.id)
              }
            >

              <span
                className="adaptive-color-swatch"
                style={{
                  background: dark
                    ? item.dark
                    : item.light,

                  color: dark
                    ? "#101d17"
                    : "#ffffff",
                }}
              >

                {preferences.accent ===
                  item.id && (
                    <Check size={18} />
                  )}

              </span>

              {item.name}

            </button>
          ))}

        </div>

      </section>

      {/* ACCESSIBILITY SETTINGS */}

      <section className="adaptive-card adaptive-stack">

        <div className="adaptive-row">

          <Type
            size={25}
            style={{
              color: "var(--ad-accent)",
            }}
          />

          <h2 className="adaptive-section-heading">
            Erişilebilirlik
          </h2>

        </div>

        <p className="adaptive-label">
          Yazı boyutu
        </p>

        <div className="adaptive-grid-three">

          {[
            {
              id: "normal",
              name: "Normal",
              size: "1em",
            },
            {
              id: "large",
              name: "Büyük",
              size: "1.35em",
            },
            {
              id: "extra-large",
              name: "Çok büyük",
              size: "1.65em",
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className="adaptive-theme-option"
              aria-pressed={
                preferences.textSize === item.id
              }
              onClick={() =>
                setTextSize(
                  item.id as
                    | "normal"
                    | "large"
                    | "extra-large"
                )
              }
            >

              <span style={{
                fontSize: item.size,
                fontWeight: 600,
              }}>
                Aa
              </span>

              {item.name}

            </button>
          ))}

        </div>

        <div className="adaptive-card-soft">

          <p>
            Paranızı kolayca yönetin.
            Kontrol her zaman sizde.
          </p>

        </div>

        <div className="adaptive-divider" />

        <label
          className="adaptive-row"
          style={{ minHeight: 48 }}
        >

          <span className="adaptive-grow">
            Hareketli efektler
          </span>

          <input
            type="checkbox"
            checked={preferences.motion}
            onChange={(event) =>
              setMotion(event.target.checked)
            }
          />

        </label>

        <p className="adaptive-small">
          Etkin animasyon durumu:
          {" "}
          {motionEnabled ? "Açık" : "Kapalı"}
        </p>

        <div className="adaptive-divider" />

        <label
          className="adaptive-row"
          style={{ minHeight: 48 }}
        >

          <span className="adaptive-grow">
            Ana bakiye tutarlarını gizle
          </span>

          <input
            type="checkbox"
            checked={preferences.hideBalance}
            onChange={(event) =>
              setHideBalance(
                event.target.checked
              )
            }
          />

        </label>

      </section>

      {/* STORAGE INFORMATION */}

      <section className="adaptive-card adaptive-stack">

        <div className="adaptive-row">

          <Database
            size={24}
            style={{
              color: "var(--ad-accent)",
            }}
          />

          <h2 className="adaptive-section-heading">
            Tercihleriniz
          </h2>

        </div>

        <p className="adaptive-description">

          {storageAvailable
            ? "Ayarlarınız bu tarayıcıda otomatik olarak kaydedilir."
            : "Kalıcı depolama kullanılamıyor. Ayarlar yalnızca mevcut oturumda geçerli."}

        </p>

        <div
          role="status"
          className={
            storageAvailable
              ? "adaptive-status adaptive-status-success"
              : "adaptive-status adaptive-status-warning"
          }
        >

          {storageAvailable ? (
            <Check size={22} />
          ) : (
            <ShieldAlert size={22} />
          )}

          <span>
            {storageAvailable
              ? "Yerel depolama kullanılabilir"
              : "Tercihler kalıcı kaydedilemiyor"}
          </span>

        </div>

        <button
          type="button"
          className="adaptive-button adaptive-button-secondary adaptive-button-full"
          onClick={() => {
            resetPreferences();
            setNotice("");
          }}
        >

          <RotateCcw size={20} />

          Varsayılan ayarlara dön

        </button>

      </section>

      <footer
        className="adaptive-small"
        style={{
          textAlign: "center",
          paddingBlock: 16,
        }}
      >
        AgentVault — Adaptive One 2.0
        <br />
        Adaptive Engine · Test ortamı
      </footer>

    </div>
  );
}

/* MAIN PAGE */

export default function AdaptivePreviewPage() {
  return (
    <AdaptiveRoot
      className="adaptive-preview"
    >
      <div lang="tr">
        <AdaptivePreviewContent />
      </div>
    </AdaptiveRoot>
  );
}

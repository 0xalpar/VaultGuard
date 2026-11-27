
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  ShieldCheck,
  Wallet,
  Bot,
  Heart,
  LayoutDashboard,
  Cpu,
  Sun,
  Moon,
  Monitor,
  Check,
  CheckCircle2,
  Circle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

import {
  AdaptiveRoot,
  useAdaptive,
  ADAPTIVE_MODES,
  ADAPTIVE_ACCENTS,
  type AdaptiveAppearance,
  type AdaptiveTextSize,
} from "../../components/AdaptiveProvider";

import "../onboarding.css";

/* ==========================================
   ADAPTIVE ONE 2.0
   ONBOARDING EXPERIENCE
========================================== */

const modeIcons = {
  easy: Heart,
  standard: LayoutDashboard,
  professional: Cpu,
};

const appearanceOptions = [
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
] as const;

const textOptions = [
  {
    id: "normal",
    name: "Normal",
    size: "1em",
  },
  {
    id: "large",
    name: "Büyük",
    size: "1.3em",
  },
  {
    id: "extra-large",
    name: "Çok büyük",
    size: "1.6em",
  },
] as const;

/* WELCOME ILLUSTRATION */

function WelcomeIllustration() {
  return (
    <div className="adaptive-onboarding-illustration">

      <svg
        viewBox="0 0 320 230"
        aria-hidden="true"
      >

        <defs>

          <linearGradient
            id="adaptiveShieldGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >

            <stop
              offset="0%"
              stopColor="var(--ad-accent)"
              stopOpacity="0.55"
            />

            <stop
              offset="100%"
              stopColor="var(--ad-accent)"
            />

          </linearGradient>

        </defs>

        {/* BACKGROUND */}

        <circle
          cx="160"
          cy="112"
          r="100"
          fill="var(--ad-surface-secondary)"
        />

        <circle
          cx="160"
          cy="112"
          r="84"
          fill="none"
          stroke="var(--ad-accent)"
          opacity="0.15"
        />

        <circle
          cx="160"
          cy="112"
          r="68"
          fill="none"
          stroke="var(--ad-accent)"
          opacity="0.15"
        />

        {/* SHIELD */}

        <path
          d="M160 35
             L221 67
             V126
             Q211 169 160 196
             Q109 169 99 126
             V67Z"
          fill="url(#adaptiveShieldGradient)"
        />

        <path
          d="M160 47
             L209 74
             V126
             Q199 160 160 184
             Q121 160 111 126
             V74Z"
          fill="var(--ad-accent)"
        />

        {/* CHECKMARK */}

        <path
          d="M132 110
             L151 131
             L187 88"
          stroke="var(--ad-on-accent)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* WALLET ICON */}

        <rect
          x="45"
          y="61"
          width="49"
          height="49"
          rx="16"
          fill="var(--ad-surface)"
          stroke="var(--ad-border)"
        />

        <path
          d="M57 75 H82 V97 H57Z
             M75 81 H87 V91 H75Z"
          stroke="var(--ad-accent)"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />

        {/* ASSISTANT ICON */}

        <rect
          x="226"
          y="124"
          width="49"
          height="49"
          rx="16"
          fill="var(--ad-surface)"
          stroke="var(--ad-border)"
        />

        <rect
          x="236"
          y="136"
          width="29"
          height="25"
          rx="7"
          fill="none"
          stroke="var(--ad-accent)"
          strokeWidth="2"
        />

        <circle
          cx="244"
          cy="148"
          r="2.5"
          fill="var(--ad-accent)"
        />

        <circle
          cx="257"
          cy="148"
          r="2.5"
          fill="var(--ad-accent)"
        />

        <path
          d="M250 130 V136"
          stroke="var(--ad-accent)"
          strokeWidth="2"
        />

      </svg>

    </div>
  );
}

/* ONBOARDING CONTENT */

function OnboardingContent() {
  const {
    preferences,
    resolvedAppearance,
    ready,
    storageAvailable,
    setMode,
    setAppearance,
    setAccent,
    setTextSize,
    completeOnboarding,
  } = useAdaptive();

  const [step, setStep] = useState(0);

  const [editing, setEditing] =
    useState(false);

  const headingRef =
    useRef<HTMLHeadingElement>(null);

  const finished =
    preferences.onboardingCompleted &&
    !editing;

  /* ACCESSIBLE STEP FOCUS */

  useEffect(() => {
    if (ready) {
      headingRef.current?.focus();
    }
  }, [step, ready, finished]);

  const selectedMode =
    ADAPTIVE_MODES.find(
      (item) =>
        item.id === preferences.mode
    ) ?? ADAPTIVE_MODES[0];

  const selectedAccent =
    ADAPTIVE_ACCENTS.find(
      (item) =>
        item.id === preferences.accent
    ) ?? ADAPTIVE_ACCENTS[0];

  const appearanceName =
    appearanceOptions.find(
      (item) =>
        item.id === preferences.appearance
    )?.name ?? "Açık";

  const textSizeName =
    textOptions.find(
      (item) =>
        item.id === preferences.textSize
    )?.name ?? "Normal";

  function nextStep() {
    if (step < 2) {
      setStep((previous) =>
        previous + 1
      );
      return;
    }

    completeOnboarding();
    setEditing(false);
  }

  function previousStep() {
    setStep((previous) =>
      Math.max(0, previous - 1)
    );
  }

  function restartOnboarding() {
    setStep(0);
    setEditing(true);
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
    <div lang="tr">

      {/* HEADER */}

      <header className="adaptive-onboarding-header">

        <div className="adaptive-onboarding-brand">

          <div className="adaptive-onboarding-logo">

            <ShieldCheck size={27} />

          </div>

          <div>

            <p className="adaptive-section-heading">
              AgentVault.
            </p>

            <p className="adaptive-small">
              ADAPTIVE ONE 2.0
            </p>

          </div>

        </div>

        {!finished && (
          <span className="adaptive-small">
            Adım {step + 1} / 3
          </span>
        )}

      </header>

      {/* PROGRESS */}

      {!finished && (
        <div
          className="adaptive-onboarding-progress"
          role="progressbar"
          aria-label="Kurulum ilerlemesi"
          aria-valuemin={0}
          aria-valuemax={3}
          aria-valuenow={step + 1}
        >

          {[0, 1, 2].map((index) => (
            <span
              key={index}
              data-active={index <= step}
            />
          ))}

        </div>
      )}

      {/* STEP CONTENT */}

      <div
        key={finished ? "finished" : step}
        className="adaptive-onboarding-content adaptive-onboarding-enter"
        style={{
          marginTop: finished ? 32 : 0,
        }}
      >

        {/* ===========================
            COMPLETED SCREEN
        ============================ */}

        {finished ? (
          <>

            <div className="adaptive-onboarding-success">

              <CheckCircle2 size={54} />

            </div>

            <h1
              ref={headingRef}
              tabIndex={-1}
              className="adaptive-heading adaptive-onboarding-center"
            >
              Her şey hazır!
            </h1>

            <p className="adaptive-description adaptive-onboarding-center">

              AgentVault deneyiminiz
              kişiselleştirildi.

            </p>

            <section className="adaptive-card adaptive-stack">

              <h2 className="adaptive-section-heading">
                Seçtiğiniz tercihler
              </h2>

              {[
                [
                  "Kullanım biçimi",
                  selectedMode.name,
                ],
                [
                  "Ekran teması",
                  appearanceName,
                ],
                [
                  "Renk tercihi",
                  selectedAccent.name,
                ],
                [
                  "Yazı boyutu",
                  textSizeName,
                ],
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
                      fontWeight: 600,
                    }}>
                      {value}
                    </span>

                  </div>

                  <div className="adaptive-divider" />

                </div>
              ))}

              <p
                className="adaptive-small"
                role="status"
              >

                {storageAvailable
                  ? "Tercihleriniz bu tarayıcıda kaydedilir."
                  : "Kalıcı depolama kullanılamıyor. Tercihleriniz mevcut oturumda geçerli."}

              </p>

            </section>

            <Link
              href="/adaptive-preview"
              className="adaptive-button adaptive-button-primary adaptive-button-full"
            >

              Uygulamaya geç

              <ArrowRight size={22} />

            </Link>

            <button
              type="button"
              className="adaptive-button adaptive-button-secondary adaptive-button-full"
              onClick={restartOnboarding}
            >

              <RotateCcw size={20} />

              Tercihlerimi yeniden düzenle

            </button>

          </>
        ) : step === 0 ? (

          /* ===========================
              STEP 1 - WELCOME
          ============================ */

          <>

            <WelcomeIllustration />

            <h1
              ref={headingRef}
              tabIndex={-1}
              className="adaptive-heading adaptive-onboarding-center"
            >
              Finansın yeni haliyle
              tanışın.
            </h1>

            <p className="adaptive-description adaptive-onboarding-center">

              Paranızı, dijital asistanlarınızı
              ve güvenlik kurallarınızı tek
              bir yerden yönetin.

            </p>

            <div className="adaptive-onboarding-feature">

              <Wallet size={25} />

              <div className="adaptive-grow">

                <p style={{
                  fontWeight: 600,
                }}>
                  Paranızın kontrolü sizde.
                </p>

                <p className="adaptive-small">
                  Bakiyenizi kolayca takip edin.
                </p>

              </div>

            </div>

            <div className="adaptive-onboarding-feature">

              <Bot size={25} />

              <div className="adaptive-grow">

                <p style={{
                  fontWeight: 600,
                }}>
                  Akıllı dijital asistanlar
                </p>

                <p className="adaptive-small">
                  Sizin belirlediğiniz sınırlar
                  içinde çalışırlar.
                </p>

              </div>

            </div>

            <div className="adaptive-onboarding-feature">

              <ShieldCheck size={25} />

              <div className="adaptive-grow">

                <p style={{
                  fontWeight: 600,
                }}>
                  Güvenlik kurallarınızı
                  siz belirleyin.
                </p>

                <p className="adaptive-small">
                  Harcama sınırlarını istediğiniz
                  zaman düzenleyin.
                </p>

              </div>

            </div>

            <div className="adaptive-status adaptive-status-warning">

              <ShieldCheck size={22} />

              <p
                className="adaptive-small"
                style={{ color: "inherit" }}
              >

                Şu anda demo ortamındasınız.
                Gerçek para veya blockchain
                işlemi kullanılmaz.

              </p>

            </div>

          </>
        ) : step === 1 ? (

          /* ===========================
              STEP 2 - USAGE MODE
          ============================ */

          <>

            <h1
              ref={headingRef}
              tabIndex={-1}
              className="adaptive-heading"
            >
              Nasıl kullanmak istersiniz?
            </h1>

            <p className="adaptive-description">

              Kendinize en uygun kullanım
              biçimini seçin. Bu seçimi
              daha sonra değiştirebilirsiniz.

            </p>

            {ADAPTIVE_MODES.map((item) => {
              const Icon = modeIcons[item.id];

              const selected =
                preferences.mode === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  className="adaptive-onboarding-option"
                  aria-pressed={selected}
                  onClick={() =>
                    setMode(item.id)
                  }
                >

                  <span className="adaptive-icon-box">

                    <Icon size={26} />

                  </span>

                  <span className="adaptive-grow">

                    <span
                      className="adaptive-section-heading"
                      style={{
                        display: "block",
                        fontSize: "1.1em",
                      }}
                    >
                      {item.name}
                    </span>

                    <span
                      className="adaptive-small"
                      style={{
                        display: "block",
                        marginTop: 4,
                      }}
                    >
                      {item.description}
                    </span>

                  </span>

                  {selected ? (

                    <CheckCircle2
                      size={23}
                      style={{
                        color: "var(--ad-accent)",
                        flexShrink: 0,
                      }}
                    />

                  ) : (

                    <Circle
                      size={23}
                      style={{
                        color: "var(--ad-muted)",
                        flexShrink: 0,
                      }}
                    />

                  )}

                </button>
              );
            })}

            <div className="adaptive-card-soft">

              <p className="adaptive-description">

                Kullanım biçiminiz yalnızca
                arayüzü değiştirir.
                Paranız ve güvenlik
                kurallarınız değişmez.

              </p>

            </div>

          </>
        ) : (

          /* ===========================
              STEP 3 - PERSONALIZATION
          ============================ */

          <>

            <h1
              ref={headingRef}
              tabIndex={-1}
              className="adaptive-heading"
            >
              Kendi tarzınızı seçin.
            </h1>

            <p className="adaptive-description">

              Uygulamanın görünümünü
              kendinize uygun hale getirin.

            </p>

            {/* APPEARANCE */}

            <section className="adaptive-card adaptive-stack">

              <h2 className="adaptive-section-heading">
                Ekran teması
              </h2>

              <div className="adaptive-grid-three">

                {appearanceOptions.map(
                  (item) => {
                    const Icon = item.icon;

                    const selected =
                      preferences.appearance ===
                      item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        className="adaptive-theme-option"
                        aria-pressed={selected}
                        onClick={() =>
                          setAppearance(
                            item.id as AdaptiveAppearance
                          )
                        }
                      >

                        <Icon size={27} />

                        {item.name}

                        {selected && (
                          <Check size={18} />
                        )}

                      </button>
                    );
                  }
                )}

              </div>

              {/* LIVE THEME PREVIEW */}

              <div
                className={`adaptive-onboarding-theme-preview ${resolvedAppearance}`}
              >

                <p style={{
                  fontSize: "0.875em",
                }}>
                  Örnek bakiyeniz
                </p>

                <p style={{
                  fontSize: "1.8em",
                  fontWeight: 600,
                }}>
                  100,00 USDC
                </p>

                <div
                  style={{
                    height: 6,
                    width: "60%",
                    background:
                      "var(--ad-accent)",
                    borderRadius: 999,
                  }}
                />

              </div>

            </section>

            {/* ACCENT COLORS */}

            <section className="adaptive-card adaptive-stack">

              <h2 className="adaptive-section-heading">
                Renk tercihiniz
              </h2>

              <div className="adaptive-grid-three">

                {ADAPTIVE_ACCENTS.map(
                  (item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="adaptive-theme-option"
                      aria-pressed={
                        preferences.accent ===
                        item.id
                      }
                      onClick={() =>
                        setAccent(item.id)
                      }
                    >

                      <span
                        className="adaptive-color-swatch"
                        style={{
                          background:
                            resolvedAppearance === "dark"
                              ? item.dark
                              : item.light,

                          color:
                            resolvedAppearance === "dark"
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
                  )
                )}

              </div>

            </section>

            {/* TEXT SIZE */}

            <section className="adaptive-card adaptive-stack">

              <h2 className="adaptive-section-heading">
                Yazı boyutu
              </h2>

              <div className="adaptive-grid-three">

                {textOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="adaptive-theme-option"
                    aria-pressed={
                      preferences.textSize ===
                      item.id
                    }
                    onClick={() =>
                      setTextSize(
                        item.id as AdaptiveTextSize
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

                <p style={{
                  fontWeight: 500,
                }}>

                  Paranızın kontrolü
                  her zaman sizde.

                </p>

                <p
                  className="adaptive-description"
                  style={{ marginTop: 8 }}
                >

                  Rahat okuyabildiğiniz
                  yazı boyutunu seçin.

                </p>

              </div>

            </section>

            <p className="adaptive-small">

              Bu tercihleri daha sonra
              Ayarlarım ekranından
              değiştirebilirsiniz.

            </p>

          </>
        )}

      </div>

      {/* STEP ACTIONS */}

      {!finished && (
        <div className="adaptive-onboarding-actions">

          {step > 0 && (
            <button
              type="button"
              className="adaptive-button adaptive-button-secondary"
              onClick={previousStep}
            >

              <ArrowLeft size={20} />

              Geri

            </button>
          )}

          <button
            type="button"
            className="adaptive-button adaptive-button-primary adaptive-onboarding-next"
            onClick={nextStep}
          >

            {step === 2
              ? "Uygulamaya başla"
              : "Devam et"}

            <ArrowRight size={22} />

          </button>

        </div>
      )}

      {/* FOOTER */}

      <footer
        className="adaptive-small"
        style={{
          textAlign: "center",
          marginTop: 28,
        }}
      >

        AgentVault — Adaptive One 2.0

        <br />

        Herkes için finans.
        Herkes için kontrol.

      </footer>

    </div>
  );
}

/* MAIN ONBOARDING PAGE */

export default function OnboardingPage() {
  return (
    <AdaptiveRoot
      className="adaptive-onboarding"
    >

      <OnboardingContent />

    </AdaptiveRoot>
  );
}

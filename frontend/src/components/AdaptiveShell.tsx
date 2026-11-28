
"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import Link from "next/link";
import { useWalletConnection } from "./WalletProvider";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  House,
  Wallet,
  Bot,
  ShieldCheck,
  History,
  Settings,
  Sun,
  Moon,
  CircleHelp,
  ChevronRight,
  CheckCircle2,
  FlaskConical,
  X,
  Menu,
} from "lucide-react";

import {
  AdaptiveRoot,
  useAdaptive,
  ADAPTIVE_MODES,
  type AdaptiveMode,
} from "./AdaptiveProvider";

/* ==========================================
   ADAPTIVE ONE 2.0
   APPLICATION SHELL
========================================== */

const navigation = [
  {
    name: "Ana Sayfa",
    shortName: "Ana Sayfa",
    href: "/",
    icon: House,
  },
  {
    name: "Param",
    shortName: "Param",
    href: "/vault",
    icon: Wallet,
  },
  {
    name: "Asistanlarım",
    shortName: "Asistanlar",
    href: "/agents",
    icon: Bot,
  },
  {
    name: "Güvenliğim",
    shortName: "Güvenlik",
    href: "/policies",
    icon: ShieldCheck,
  },
  { name: "Onaylarım", shortName: "Onaylar", href: "/approvals", icon: CheckCircle2 },
  {
    name: "İşlemlerim",
    shortName: "İşlemler",
    href: "/transactions",
    icon: History,
  },
  {
    name: "Ayarlarım",
    shortName: "Ayarlar",
    href: "/settings",
    icon: Settings,
  },
];

/* MODE SELECTOR */

function ModeSelector({
  id,
}: {
  id: string;
}) {
  const {
    preferences,
    setMode,
  } = useAdaptive();

  return (
    <div className="adaptive-mode-selector">

      <label
        htmlFor={id}
        className="adaptive-small"
      >
        Kullanım biçiminiz
      </label>

      <select
        id={id}
        className="adaptive-input"
        value={preferences.mode}
        onChange={(event) =>
          setMode(
            event.target.value as AdaptiveMode
          )
        }
      >

        {ADAPTIVE_MODES.map((item) => (
          <option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </option>
        ))}

      </select>

    </div>
  );
}

/* MAIN APPLICATION SHELL */

export default function AdaptiveShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { connection } = useWalletConnection();

  const router = useRouter();

  const {
    preferences,
    resolvedAppearance,
    ready,
    setAppearance,
  } = useAdaptive();

  const [helpOpen, setHelpOpen] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const dark =
    resolvedAppearance === "dark";

  const isOnboarding =
    pathname === "/onboarding";

  const isPreview =
    pathname === "/adaptive-preview";

  const needsOnboarding =
    ready &&
    !preferences.onboardingCompleted &&
    !isOnboarding &&
    !isPreview;

  /* FIRST VISIT REDIRECTION */

  useEffect(() => {
    if (needsOnboarding) {
      router.replace("/onboarding");
    }
  }, [needsOnboarding, router]);

  /* ACTIVE NAVIGATION */

function isActive(href: string) {
  if (pathname === "/blockchain") {
    return href === "/vault";
  }

  if (href === "/") {
    return (
      pathname === "/" ||
      pathname === "/adaptive-preview"
    );
  }

  return (
    pathname === href ||
    pathname.startsWith(href + "/")
  );
}
  function closeMenus() {
    setHelpOpen(false);
    setMobileMenuOpen(false);
  }

  function toggleAppearance() {
    setAppearance(
      dark ? "light" : "dark"
    );
  }

  /* INITIAL LOADING */

  if (!ready || needsOnboarding) {
    return (
      <AdaptiveRoot
        className="adaptive-loading-screen"
      >

        <div
          className="adaptive-stack"
          role="status"
        >

          <ShieldCheck
            size={48}
            style={{
              color: "var(--ad-accent)",
              marginInline: "auto",
            }}
          />

          <h1 className="adaptive-heading">
            AgentVault.
          </h1>

          <p className="adaptive-description">
            {needsOnboarding
              ? "Karşılama ekranı açılıyor..."
              : "Tercihleriniz yükleniyor..."}
          </p>

        </div>

      </AdaptiveRoot>
    );
  }

  /* ONBOARDING WITHOUT NAVIGATION */

  if (isOnboarding) {
    return (
      <AdaptiveRoot
        className="adaptive-standalone"
      >
        <main id="main-content">
          {children}
        </main>
      </AdaptiveRoot>
    );
  }

  /* LEGACY PAGE COMPATIBILITY */

const adaptivePages = new Set([
  "/",
  "/adaptive-preview",
  "/vault",
  "/agents",
  "/policies",
  "/approvals",
  "/transactions",
  "/settings",
  "/blockchain",
]);

const legacyPage = !adaptivePages.has(pathname);

  return (
    <AdaptiveRoot
      className="adaptive-app-shell"
    >

      <a
        href="#main-content"
        className="adaptive-skip-link"
      >
        Ana içeriğe geç
      </a>

      {/* =================================
          TOP HEADER
      ================================== */}

      <header className="adaptive-topbar">

        <div className="adaptive-topbar-inner">

          {/* BRAND */}

          <Link
            href="/"
            className="adaptive-brand"
            aria-label="AgentVault ana sayfa"
            onClick={closeMenus}
          >

            <span className="adaptive-brand-logo">

              <ShieldCheck size={27} />

            </span>

            <span>

              <span className="adaptive-brand-name">
                AgentVault.
              </span>

              <span className="adaptive-brand-edition">
                ADAPTIVE ONE 2.0
              </span>

            </span>

          </Link>

          {/* HEADER ACTIONS */}

          <div className="adaptive-topbar-actions">

            <Link href="/vault#wallet-connection" className="av-wallet-header-link" aria-label={connection ? "Bağlı cüzdanı yönet" : "Cüzdan ile bağlan"} onClick={closeMenus}>
              {connection ? <CheckCircle2 size={19} aria-hidden="true" /> : <Wallet size={19} aria-hidden="true" />}
              <span>{connection ? connection.name : "Cüzdan ile bağlan"}</span>
            </Link>

            <span className="adaptive-demo-label">

              <FlaskConical size={17} />

              Demo hesabı

            </span>

            <button
              type="button"
              className="adaptive-icon-button"
              aria-label={
                dark
                  ? "Açık temaya geç"
                  : "Koyu temaya geç"
              }
              onClick={toggleAppearance}
            >

              {dark ? (
                <Sun size={22} />
              ) : (
                <Moon size={22} />
              )}

            </button>

            <button
              type="button"
              className="adaptive-icon-button"
              aria-label="Yardım menüsü"
              aria-expanded={helpOpen}
              aria-controls="adaptive-help-panel"
              onClick={() => {
                setHelpOpen(!helpOpen);
                setMobileMenuOpen(false);
              }}
            >

              {helpOpen ? (
                <X size={22} />
              ) : (
                <CircleHelp size={22} />
              )}

            </button>

          </div>

        </div>

        {/* HELP PANEL */}

        {helpOpen && (
          <section
            id="adaptive-help-panel"
            className="adaptive-help-panel adaptive-stack"
          >

            <h2 className="adaptive-section-heading">
              Nasıl yardımcı olabiliriz?
            </h2>

            <p className="adaptive-description">

              AgentVault ile paranızı,
              dijital asistanlarınızı ve
              güvenlik kurallarınızı
              yönetebilirsiniz.

            </p>

            <p className="adaptive-small">

              Finansal ekranlar demo ortamındadır.
              Cüzdan sahipliği gerçek mesaj imzasıyla doğrulanabilir; blockchain transferi yapılmaz.

            </p>

            <Link
              href="/onboarding"
              onClick={closeMenus}
              className="adaptive-button adaptive-button-secondary"
            >

              Kurulum rehberini aç

              <ChevronRight size={18} />

            </Link>

            <button
              type="button"
              className="adaptive-button adaptive-button-secondary"
              onClick={() =>
                setHelpOpen(false)
              }
            >
              Kapat
            </button>

          </section>
        )}

      </header>

      {/* =================================
          APPLICATION WORKSPACE
      ================================== */}

      <div className="adaptive-workspace">

        {/* DESKTOP SIDEBAR */}

        <aside className="adaptive-sidebar">

          <div className="adaptive-sidebar-inner">

            <p className="adaptive-sidebar-title">
              MENÜ
            </p>

            <nav
              aria-label="Ana navigasyon"
              className="adaptive-desktop-nav"
            >

              {navigation.map((item) => {
                const Icon = item.icon;

                const active =
                  isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={
                      active
                        ? "page"
                        : undefined
                    }
                    data-active={active}
                    className="adaptive-nav-link"
                    onClick={closeMenus}
                  >

                    <Icon size={23} />

                    <span>
                      {item.name}
                    </span>

                    {active && (
                      <ChevronRight
                        size={17}
                        className="adaptive-nav-indicator"
                      />
                    )}

                  </Link>
                );
              })}

            </nav>

            <div className="adaptive-divider" />

            <ModeSelector
              id="desktop-usage-mode"
            />

            <div className="adaptive-sidebar-info">

              <div className="adaptive-row">

                <CheckCircle2
                  size={20}
                  style={{
                    color: "var(--ad-success)",
                  }}
                />

                <span style={{
                  fontWeight: 600,
                }}>
                  Demo ortamı
                </span>

              </div>

              <p className="adaptive-small">

                Gerçek para kullanılmaz.

              </p>

              {preferences.mode ===
                "professional" && (
                  <p className="adaptive-small">
                    Hedef ağ: Solana Devnet
                    <br />
                    Cüzdan bağlı değil.
                  </p>
                )}

            </div>

            <div className="adaptive-sidebar-footer">

              <p className="adaptive-small">
                AgentVault © 2026
              </p>

              <p className="adaptive-small">
                Adaptive One 2.0
              </p>

            </div>

          </div>

        </aside>

        {/* MAIN PAGE CONTENT */}

        <main
          id="main-content"
          tabIndex={-1}
          className="adaptive-main-content"
        >

          {/* MOBILE MODE SELECTOR */}

          <div className="adaptive-mobile-mode">

            <ModeSelector
              id="mobile-usage-mode"
            />

          </div>

          {/* TEMPORARY LEGACY SUPPORT */}

          {legacyPage ? (
            <>

              <div className="adaptive-status adaptive-status-warning">

                <FlaskConical size={23} />

                <div className="adaptive-grow">

                  <p style={{
                    fontWeight: 600,
                  }}>
                    Tasarım geçişi devam ediyor
                  </p>

                  <p
                    className="adaptive-small"
                    style={{
                      color: "inherit",
                    }}
                  >

                    Bu sayfa henüz yeni tasarıma
                    geçirilmedi. Mevcut özellikleri
                    kullanmaya devam edebilirsiniz.

                  </p>

                </div>

              </div>

              <div className="adaptive-legacy-page bg-background text-foreground">

                {children}

              </div>

            </>
          ) : (
            children
          )}

          {/* MAIN FOOTER */}

          <footer className="adaptive-content-footer">

            <p className="adaptive-small">

              Herkes için finans.
              Herkes için kontrol.

            </p>

            <p className="adaptive-small">

              AgentVault — Adaptive One 2.0
              · Demo

            </p>

          </footer>

        </main>

      </div>

      {/* =================================
          MOBILE MORE MENU
      ================================== */}

      {mobileMenuOpen && (
        <>

          <button
            type="button"
            className="adaptive-mobile-menu-backdrop"
            aria-label="Diğer menüsünü kapat"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          />

          <section
            id="adaptive-mobile-more"
            className="adaptive-mobile-more adaptive-stack"
            aria-label="Diğer sayfalar"
          >

            <div className="adaptive-row adaptive-between">

              <h2 className="adaptive-section-heading">
                Diğer
              </h2>

              <button
                type="button"
                className="adaptive-icon-button"
                aria-label="Menüyü kapat"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
              >
                <X size={21} />
              </button>

            </div>

            {navigation.slice(4).map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="adaptive-list-item"
                  aria-current={
                    isActive(item.href)
                      ? "page"
                      : undefined
                  }
                  onClick={closeMenus}
                >

                  <span className="adaptive-icon-box">
                    <Icon size={23} />
                  </span>

                  <span className="adaptive-grow">
                    {item.name}
                  </span>

                  <ChevronRight size={20} />

                </Link>
              );
            })}

            <Link
              href="/adaptive-preview"
              className="adaptive-list-item"
              onClick={closeMenus}
            >

              <span className="adaptive-icon-box">
                <Settings size={23} />
              </span>

              <span className="adaptive-grow">
                Yeni görünüm tercihleri
              </span>

              <ChevronRight size={20} />

            </Link>

          </section>

        </>
      )}

      {/* =================================
          MOBILE BOTTOM NAVIGATION
      ================================== */}

      <nav
        className="adaptive-bottom-nav"
        aria-label="Mobil navigasyon"
      >

        <div className="adaptive-bottom-nav-inner">

          {navigation.slice(0, 4).map((item) => {
            const Icon = item.icon;

            const active =
              isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="adaptive-bottom-link"
                aria-current={
                  active ? "page" : undefined
                }
                data-active={active}
                onClick={closeMenus}
              >

                <span className="adaptive-bottom-icon">

                  <Icon
                    size={23}
                    strokeWidth={
                      active ? 2.3 : 1.8
                    }
                  />

                </span>

                <span>
                  {item.shortName}
                </span>

              </Link>
            );
          })}

          <button
            type="button"
            className="adaptive-bottom-link"
            data-active={
              mobileMenuOpen ||
              isActive("/approvals") ||
              isActive("/transactions") ||
              isActive("/settings")
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="adaptive-mobile-more"
            onClick={() => {
              setMobileMenuOpen(
                !mobileMenuOpen
              );
              setHelpOpen(false);
            }}
          >

            <span className="adaptive-bottom-icon">

              <Menu size={23} />

            </span>

            <span>
              Diğer
            </span>

          </button>

        </div>

      </nav>

    </AdaptiveRoot>
  );
}

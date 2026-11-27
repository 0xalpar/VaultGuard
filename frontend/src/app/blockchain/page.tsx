
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  RefreshCw,
  ShieldCheck,
  Database,
  Wallet,
  AlertCircle,
  CheckCircle2,
  Lock,
  Unlock,
} from "lucide-react";

import WalletConnectionCard from "../../components/WalletConnectionCard";
import { useWalletConnection } from "../../components/WalletProvider";
import { useAdaptive } from "../../components/AdaptiveProvider";

import {
  inspectLocalnet,
  localConnection,
  readVaults,
} from "../../lib/agentvault-localnet";

type Snapshot = Awaited<ReturnType<typeof inspectLocalnet>>;
type Vaults = Awaited<ReturnType<typeof readVaults>>;

type BlockchainState = {
  address?: string;
  refresh: number;
  network?: Snapshot;
  vaults?: Vaults;
  error?: string;
};

export default function BlockchainPage() {
  const { connection } = useWalletConnection();
  const { preferences } = useAdaptive();

  const address = connection?.address;

  const [refresh, setRefresh] = useState(0);

  const [state, setState] = useState<BlockchainState>({
    refresh: -1,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const c = localConnection();

        const network = await inspectLocalnet(c);

        const vaults = address
          ? await readVaults(c, address)
          : undefined;

        if (!cancelled) {
          setState({
            address,
            refresh,
            network,
            vaults,
          });
        }
      } catch (e) {
        if (!cancelled) {
          setState({
            address,
            refresh,
            error:
              e instanceof Error
                ? e.message
                : "RPC bağlantısı başarısız.",
          });
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [address, refresh]);

  const current =
    state.address === address &&
    state.refresh === refresh
      ? state
      : undefined;

  return (
    <main
      className="adaptive-stack"
      style={{
        maxWidth: 1100,
        width: "100%",
        margin: "0 auto",
        padding: "1rem",
        color: "var(--ad-text)",
        background: "var(--ad-background)",
        gap: "1.25rem",
        boxSizing: "border-box",
      }}
    >
      {/* Geri dönme bağlantısı */}

      <Link
        href="/vault"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--ad-accent)",
          fontWeight: 600,
          textDecoration: "none",
          width: "fit-content",
        }}
      >
        <ArrowLeft size={18} />
        Param sayfasına dön
      </Link>

      {/* Sayfa başlığı */}

      <header className="adaptive-stack">
        <h1
          className="adaptive-heading"
          style={{
            color: "var(--ad-text)",
            fontSize: "1.75em",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Blockchain bağlantısı
        </h1>

        <p
          style={{
            color: "var(--ad-muted)",
            lineHeight: 1.7,
          }}
        >
          Solana Localnet bağlantınızı kontrol edin ve
          blockchain üzerindeki kasalarınızı görüntüleyin.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.85rem",
            borderRadius: 12,
            background: "var(--ad-warning-bg)",
            color: "var(--ad-warning)",
          }}
        >
          <ShieldCheck size={20} />

          <span>
            Localnet — Yalnızca test ortamı.
            Gerçek para kullanılmaz.
          </span>
        </div>
      </header>

      {/* Solana ağ durumu */}

      <section
        className="adaptive-card adaptive-stack"
        aria-live="polite"
        style={{
          background: "var(--ad-surface)",
          color: "var(--ad-text)",
          border: "1px solid var(--ad-border)",
          borderRadius: 18,
          padding: "1.25rem",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Database
            size={24}
            color="var(--ad-accent)"
          />

          <h2
            className="adaptive-section-heading"
            style={{
              color: "var(--ad-text)",
              fontSize: "1.25em",
              fontWeight: 650,
              margin: 0,
            }}
          >
            Solana ağı
          </h2>
        </div>

        {!current && (
          <p style={{ color: "var(--ad-muted)" }}>
            Bağlantı kontrol ediliyor…
          </p>
        )}

        {current?.error && (
          <div
            role="alert"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              color: "var(--ad-danger)",
              background: "var(--ad-danger-bg)",
              padding: "1rem",
              borderRadius: 12,
              overflowWrap: "anywhere",
            }}
          >
            <AlertCircle
              size={22}
              style={{ flexShrink: 0 }}
            />

            <span>
              Kontrol başarısız: {current.error}
            </span>
          </div>
        )}

        {current?.network && (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem",
                background: "var(--ad-success-bg)",
                color: "var(--ad-success)",
                borderRadius: 12,
              }}
            >
              <CheckCircle2
                size={26}
                style={{ flexShrink: 0 }}
              />

              <div>
                <strong>
                  Program ve test mint doğrulandı
                </strong>

                <p style={{ marginTop: 4 }}>
                  Solana {current.network.version}
                  {" · "}Localnet
                </p>
              </div>
            </div>

            <div
              className="adaptive-stack"
              style={{
                padding: "1rem",
                borderRadius: 12,
                background:
                  "var(--ad-surface-secondary)",
                gap: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    color: "var(--ad-muted)",
                    marginBottom: 6,
                  }}
                >
                  Program ID
                </p>

                <code
                  style={{
                    color: "var(--ad-text)",
                    overflowWrap: "anywhere",
                  }}
                >
                  {current.network.program}
                </code>
              </div>

              <div>
                <p
                  style={{
                    color: "var(--ad-muted)",
                    marginBottom: 6,
                  }}
                >
                  Test USDC mint adresi
                </p>

                <code
                  style={{
                    color: "var(--ad-text)",
                    overflowWrap: "anywhere",
                  }}
                >
                  {current.network.mint}
                </code>
              </div>

              <div
                style={{
                  borderTop:
                    "1px solid var(--ad-border)",
                  paddingTop: "1rem",
                }}
              >
                <p
                  style={{
                    color: "var(--ad-muted)",
                  }}
                >
                  Test token arzı
                </p>

                <strong
                  style={{
                    display: "block",
                    marginTop: 8,
                    fontSize: "1.5em",
                    color: "var(--ad-text)",
                  }}
                >
                  {current.network.supply} USDC
                </strong>
              </div>
            </div>
          </>
        )}

        <button
          type="button"
          className="adaptive-button adaptive-button-secondary"
          disabled={!current}
          onClick={() => setRefresh((v) => v + 1)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--ad-text)",
            background:
              "var(--ad-surface-secondary)",
            width: "100%",
          }}
        >
          <RefreshCw size={18} />

          {!current
            ? "Kontrol ediliyor…"
            : "Bağlantıyı yenile"}
        </button>
      </section>

      {/* Cüzdan bağlantısı */}

      <div
        style={{
          color: "var(--ad-text)",
        }}
      >
        <WalletConnectionCard />
      </div>

      {/* Blockchain kasaları */}

      <section
        className="adaptive-card adaptive-stack"
        aria-live="polite"
        style={{
          background: "var(--ad-surface)",
          color: "var(--ad-text)",
          border: "1px solid var(--ad-border)",
          borderRadius: 18,
          padding: "1.25rem",
          gap: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Wallet
            size={24}
            color="var(--ad-accent)"
          />

          <h2
            className="adaptive-section-heading"
            style={{
              color: "var(--ad-text)",
              fontSize: "1.25em",
              fontWeight: 650,
              margin: 0,
            }}
          >
            Zincirdeki kasalarım
          </h2>
        </div>

        {!address ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem 1rem",
              background:
                "var(--ad-surface-secondary)",
              borderRadius: 12,
              color: "var(--ad-muted)",
            }}
          >
            <Wallet
              size={36}
              style={{ margin: "0 auto 1rem" }}
            />

            <h3
              style={{
                color: "var(--ad-text)",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Cüzdanınızı bağlayın
            </h3>

            <p>
              Blockchain üzerindeki kasalarınızı
              görüntülemek için test cüzdanınızı
              bağlayın.
            </p>
          </div>
        ) : current?.error ? (
          <p style={{ color: "var(--ad-danger)" }}>
            Kasa bilgileri alınamadı.
          </p>
        ) : !current?.vaults ? (
          <p style={{ color: "var(--ad-muted)" }}>
            Kasa verileri kontrol ediliyor…
          </p>
        ) : current.vaults.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem 1rem",
              background:
                "var(--ad-surface-secondary)",
              borderRadius: 12,
            }}
          >
            <Wallet
              size={36}
              color="var(--ad-accent)"
              style={{ margin: "0 auto 1rem" }}
            />

            <strong>
              Henüz blockchain kasanız yok
            </strong>

            <p
              style={{
                color: "var(--ad-muted)",
                marginTop: 8,
              }}
            >
              Bu cüzdan için zincirde kasa bulunamadı.
            </p>
          </div>
        ) : (
          current.vaults.map((v) => (
            <article
              key={v.address}
              className="adaptive-card-soft adaptive-stack"
              style={{
                padding: "1rem",
                borderRadius: 14,
                background:
                  "var(--ad-surface-secondary)",
                border:
                  "1px solid var(--ad-border)",
                color: "var(--ad-text)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <strong>Kasa #{v.id}</strong>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 10px",
                    borderRadius: 8,
                    background: v.frozen
                      ? "var(--ad-warning-bg)"
                      : "var(--ad-success-bg)",
                    color: v.frozen
                      ? "var(--ad-warning)"
                      : "var(--ad-success)",
                  }}
                >
                  {v.frozen ? (
                    <Lock size={15} />
                  ) : (
                    <Unlock size={15} />
                  )}

                  {v.frozen
                    ? "Dondurulmuş"
                    : "Aktif"}
                </span>
              </div>

              <p
                style={{
                  color: "var(--ad-muted)",
                }}
              >
                Kasa PDA adresi
              </p>

              <code
                style={{
                  color: "var(--ad-text)",
                  overflowWrap: "anywhere",
                }}
              >
                {v.address}
              </code>

              <div
                style={{
                  borderTop:
                    "1px solid var(--ad-border)",
                  paddingTop: "1rem",
                }}
              >
                <p
                  style={{
                    color: "var(--ad-muted)",
                  }}
                >
                  Blockchain bakiyesi
                </p>

                <strong
                  style={{
                    display: "block",
                    fontSize: "1.6em",
                    marginTop: 6,
                    color: "var(--ad-text)",
                  }}
                >
                  {preferences.hideBalance
                    ? "••••••"
                    : v.balance + " test USDC"}
                </strong>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Alt bilgi */}

      <p
        style={{
          textAlign: "center",
          color: "var(--ad-muted)",
          fontSize: "0.85em",
          lineHeight: 1.6,
        }}
      >
        AgentVault · Solana Localnet
        <br />
        Bu ekran yalnızca blockchain verilerini okur.
        Demo bakiyeler ve blockchain bakiyeleri ayrıdır.
      </p>
    </main>
  );
}

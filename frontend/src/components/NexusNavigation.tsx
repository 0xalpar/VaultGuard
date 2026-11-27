
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowUpRight,
  Wallet,
} from "lucide-react";

const navigation = [
  { name: "Overview", href: "/" },
  { name: "Vault", href: "/vault" },
  { name: "Agents", href: "/agents" },
  { name: "Policies", href: "/policies" },
  { name: "Activity", href: "/transactions" },
  { name: "Settings", href: "/settings" },
];

export default function NexusNavigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-2xl">

      <div className="nexus-container">

        {/* Brand and wallet */}

        <div className="flex min-h-[76px] items-center justify-between gap-3">

          <Link
            href="/"
            aria-label="AgentVault home"
            className="flex min-w-0 items-center gap-3"
          >

            <svg
              viewBox="0 0 48 52"
              className="h-10 w-10 shrink-0"
              aria-hidden="true"
            >

              <path
                d="M24 3 L43 13 V28
                   Q40 41 24 49
                   Q8 41 5 28 V13Z"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />

              <path
                d="M14 35 L24 13 L34 35
                   M18 27 H30"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </svg>

            <div className="min-w-0">

              <p className="text-lg font-semibold tracking-tight sm:text-xl">
                AgentVault.
              </p>

              <p className="mt-0.5 text-[9px] tracking-[0.22em] text-muted">
                NEXUS ONE
              </p>

            </div>

          </Link>

          <div className="flex shrink-0 items-center gap-3 sm:gap-6">

            {/* Network status */}

            <div className="hidden items-center gap-2 sm:flex">

              <span className="nexus-pulse h-2 w-2 rounded-full bg-success" />

              <div>

                <p className="text-xs font-medium">
                  Solana Devnet
                </p>

                <p className="mt-0.5 text-[10px] text-muted">
                  Demo mode
                </p>

              </div>

            </div>

            <span className="flex items-center gap-1.5 text-[10px] text-muted sm:hidden">

              <span className="h-1.5 w-1.5 rounded-full bg-success" />

              Demo

            </span>

            {/* Wallet placeholder */}

            <button
              type="button"
              disabled
              title="Wallet integration is not available yet"
              aria-label="Connect wallet — coming soon"
              className="nexus-button-primary hidden sm:inline-flex"
            >

              Connect Wallet

              <ArrowUpRight size={16} />

            </button>

            <button
              type="button"
              disabled
              title="Wallet integration is not available yet"
              aria-label="Connect wallet — coming soon"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface sm:hidden"
            >

              <Wallet size={19} />

            </button>

          </div>

        </div>

        {/* Desktop floating navigation */}

        <nav
          aria-label="Main navigation"
          className="hidden justify-center pb-5 lg:flex"
        >

          <div className="flex items-center gap-1 rounded-full border border-border bg-surface/80 p-1.5">

            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-6 py-3 text-sm transition-colors ${
                    active
                      ? "bg-surface-elevated text-foreground"
                      : "text-muted hover:bg-surface-hover hover:text-foreground"
                  }`}
                >

                  {item.name}

                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-accent"
                    />
                  )}

                </Link>
              );
            })}

          </div>

        </nav>

      </div>

    </header>
  );
}

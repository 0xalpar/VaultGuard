
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Shield,
  LayoutDashboard,
  Wallet,
  Bot,
  ArrowLeftRight,
  Settings,
} from "lucide-react";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "My Vault", icon: Wallet, href: "/vault" },
  { name: "AI Agents", icon: Bot, href: "/agents" },
  { name: "Security Policies", icon: Shield, href: "/policies" },
  { name: "Transactions", icon: ArrowLeftRight, href: "/transactions" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 sticky top-0 h-screen bg-sidebar border-r border-border p-5 flex flex-col">

      <Link
        href="/"
        className="flex items-center gap-3 mb-12"
      >
        <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Shield size={26} className="text-accent" />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Agent<span className="text-accent">Vault</span>
          </h1>

          <p className="text-[10px] text-muted tracking-widest uppercase">
            Autonomous Security
          </p>
        </div>
      </Link>

      <p className="text-[10px] font-semibold tracking-widest text-muted uppercase px-4 mb-4">
        Workspace
      </p>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary/10 text-accent"
                  : "text-muted hover:bg-primary/5 hover:text-foreground"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-accent rounded-r-full" />
              )}

              <item.icon size={19} />

              <span className="text-sm font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">

        <div className="bg-background border border-border rounded-xl p-4">

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-muted rounded-full" />

            <span className="text-xs font-medium text-foreground">
              Solana Devnet
            </span>
          </div>

          <p className="text-[11px] text-muted">
            Demo Mode
          </p>

          <p className="text-[10px] text-muted mt-1">
            Wallet not connected
          </p>

        </div>

        <p className="text-[10px] text-muted text-center mt-4">
          AgentVault v0.1
        </p>

      </div>

    </aside>
  );
}

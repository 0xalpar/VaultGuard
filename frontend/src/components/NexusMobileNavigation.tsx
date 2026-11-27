
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  Wallet,
  Bot,
  ShieldCheck,
  Activity,
  Settings,
} from "lucide-react";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: House,
  },
  {
    name: "Vault",
    href: "/vault",
    icon: Wallet,
  },
  {
    name: "Agents",
    href: "/agents",
    icon: Bot,
  },
  {
    name: "Policies",
    href: "/policies",
    icon: ShieldCheck,
  },
  {
    name: "Activity",
    href: "/transactions",
    icon: Activity,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function NexusMobileNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="nexus-mobile-navigation lg:hidden"
    >
      <div className="nexus-mobile-navigation-inner">

        {navigation.map((item) => {
          const Icon = item.icon;

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
              data-active={active}
              className="nexus-mobile-link"
            >

              <div className="nexus-mobile-icon">

                <Icon
                  size={21}
                  strokeWidth={active ? 2 : 1.6}
                />

              </div>

              <span className="nexus-mobile-label">
                {item.name}
              </span>

              {active && (
                <span
                  aria-hidden="true"
                  className="nexus-mobile-indicator"
                />
              )}

            </Link>
          );
        })}

      </div>
    </nav>
  );
}

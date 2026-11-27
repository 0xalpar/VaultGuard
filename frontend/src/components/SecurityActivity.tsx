
import Link from "next/link";

import {
  Check,
  ShieldAlert,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Payment approved",
    description: "5 USDC · Payment Agent",
    time: "Now",
    icon: Check,
    status: "success",
  },
  {
    id: 2,
    title: "Transfer blocked",
    description: "Spending limit exceeded",
    time: "2m ago",
    icon: ShieldAlert,
    status: "danger",
  },
  {
    id: 3,
    title: "Agent verified",
    description: "Trading Agent",
    time: "5m ago",
    icon: ShieldCheck,
    status: "success",
  },
  {
    id: 4,
    title: "Transaction approved",
    description: "15 USDC · Trading Agent",
    time: "12m ago",
    icon: Check,
    status: "success",
  },
];

export default function SecurityActivity() {
  return (
    <section className="min-w-0">

      {/* Section heading */}
      <div className="mb-6 flex items-center justify-between gap-4">

        <div>
          <h2 className="text-lg font-medium tracking-tight">
            Security activity
          </h2>

          <p className="mt-1 text-xs text-muted">
            Recent security events
          </p>
        </div>

        <span className="flex items-center gap-2 text-xs text-muted">

          <span className="h-1.5 w-1.5 rounded-full bg-accent" />

          Demo

        </span>

      </div>

      {/* Security events */}
      <div className="divide-y divide-border/70">

        {events.map((event) => {
          const Icon = event.icon;

          const isDanger = event.status === "danger";

          return (
            <div
              key={event.id}
              className="flex items-center gap-4 py-4"
            >

              {/* Event icon */}
              <div
                className={`
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-full
                  ${
                    isDanger
                      ? "bg-danger/10 text-danger"
                      : "bg-accent/10 text-accent"
                  }
                `}
              >
                <Icon size={19} />
              </div>

              {/* Event information */}
              <div className="min-w-0 flex-1">

                <p className="text-sm font-medium">
                  {event.title}
                </p>

                <p className="mt-1 text-xs text-muted">
                  {event.description}
                </p>

              </div>

              {/* Time */}
              <span className="shrink-0 text-xs text-muted">
                {event.time}
              </span>

            </div>
          );
        })}

      </div>

      {/* View all */}
      <Link
        href="/transactions"
        className="mt-5 inline-flex items-center gap-2 text-sm text-accent hover:text-primary-hover"
      >
        View all activity

        <ArrowUpRight size={15} />
      </Link>

    </section>
  );
}

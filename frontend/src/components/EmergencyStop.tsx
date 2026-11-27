
"use client";

import { ShieldAlert, Octagon, Play } from "lucide-react";

interface EmergencyStopProps {
  active: boolean;
  onToggle: () => void;
}

export default function EmergencyStop({
  active,
  onToggle,
}: EmergencyStopProps) {
  function handleToggle() {
    const message = active
      ? "Resume demo agent operations?"
      : "Activate emergency stop in demo?";

    if (window.confirm(message)) {
      onToggle();
    }
  }

  return (
    <section className="bg-danger/5 border border-danger/30 rounded-xl p-6">

      <div className="flex items-center gap-3 mb-3">
        <ShieldAlert className="text-danger" size={26} />

        <h2 className="text-xl font-semibold text-danger">
          Emergency Stop
        </h2>
      </div>

      <p className="text-sm text-muted mb-6">
        Immediately suspend autonomous agent transactions
        if suspicious activity is detected.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <p className="text-sm text-muted">
            Current Status
          </p>

          <p
            className={`font-semibold mt-1 ${
              active ? "text-danger" : "text-accent"
            }`}
          >
            {active
              ? "Operations Suspended"
              : "Normal Operation"}
          </p>
        </div>

        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium cursor-pointer ${
            active
              ? "bg-primary hover:bg-primary-hover text-background"
              : "bg-danger/10 border border-danger/30 hover:bg-danger/20 text-danger"
          }`}
        >
          {active ? (
            <Play size={18} />
          ) : (
            <Octagon size={18} />
          )}

          {active
            ? "Resume Operations"
            : "Activate Emergency Stop"}
        </button>

      </div>
    </section>
  );
}

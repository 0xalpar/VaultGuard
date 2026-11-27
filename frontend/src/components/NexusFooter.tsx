
import { ShieldCheck } from "lucide-react";

export default function NexusFooter() {
  return (
    <footer className="nexus-footer border-t border-border">

      <div className="nexus-container flex flex-wrap items-center justify-between gap-5 py-7">

        <div className="flex items-center gap-3">

          <ShieldCheck
            size={20}
            className="shrink-0 text-accent"
          />

          <div>

            <p className="text-sm font-medium">
              AgentVault.
            </p>

            <p className="mt-1 text-[10px] text-muted">
              © 2026 AgentVault
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-4">

          <span className="text-[10px] tracking-[0.2em] text-muted">
            NEXUS ONE
          </span>

          <span className="text-[10px] text-muted">
            V.0.1
          </span>

          <span className="flex items-center gap-2 text-[10px] text-muted">

            <span className="h-1.5 w-1.5 rounded-full bg-success" />

            SIMULATION MODE

          </span>

        </div>

      </div>

    </footer>
  );
}

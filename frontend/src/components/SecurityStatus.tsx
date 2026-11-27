
import { ShieldCheck, ShieldAlert } from "lucide-react";

interface SecurityStatusProps {
  emergencyStop: boolean;
}

export default function SecurityStatus({
  emergencyStop,
}: SecurityStatusProps) {
  const Icon = emergencyStop ? ShieldAlert : ShieldCheck;

  return (
    <div
      className={`bg-surface border rounded-xl p-6 mb-6 ${
        emergencyStop
          ? "border-danger/50"
          : "border-primary/30"
      }`}
    >
      <div className="flex items-center gap-4">

        <div
          className={`p-4 rounded-xl ${
            emergencyStop
              ? "bg-danger/10 text-danger"
              : "bg-primary/10 text-accent"
          }`}
        >
          <Icon size={30} />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold">
            {emergencyStop
              ? "Emergency Stop Active"
              : "Protection Active"}
          </h2>

          <p className="text-sm text-muted mt-1">
            {emergencyStop
              ? "Agent operations suspended in demo."
              : "Security policies configured in demo."}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            emergencyStop
              ? "bg-danger/10 text-danger"
              : "bg-primary/10 text-accent"
          }`}
        >
          {emergencyStop ? "Stopped" : "Protected"}
        </span>

      </div>
    </div>
  );
}

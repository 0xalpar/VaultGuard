
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-accent",
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden bg-surface border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300">

      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">

        <div className="bg-primary/10 border border-primary/10 w-11 h-11 rounded-xl flex items-center justify-center mb-5">
          <Icon size={22} className={color} />
        </div>

        <p className="text-sm text-muted">
          {title}
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-foreground mt-2">
          {value}
        </h2>

      </div>

    </div>
  );
}

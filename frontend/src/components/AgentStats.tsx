
import { Bot, Activity, PauseCircle } from "lucide-react";
import StatCard from "./StatCard";
import type { Agent } from "./AgentCard";

interface AgentStatsProps {
  agents: Agent[];
}

export default function AgentStats({
  agents,
}: AgentStatsProps) {
  const activeCount = agents.filter(
    (agent) => agent.active
  ).length;

  const pausedCount = agents.length - activeCount;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      <StatCard
        title="Total Agents"
        value={String(agents.length)}
        icon={Bot}
      />

      <StatCard
        title="Active Agents"
        value={String(activeCount)}
        icon={Activity}
        color="text-green-400"
      />

      <StatCard
        title="Paused Agents"
        value={String(pausedCount)}
        icon={PauseCircle}
        color="text-yellow-400"
      />

    </div>
  );
}

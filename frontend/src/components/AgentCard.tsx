
"use client";

import {
  Bot,
  Pause,
  Play,
  Trash2,
} from "lucide-react";

export interface Agent {
  id: number;
  name: string;
  dailyLimit: number;
  spent: number;
  active: boolean;
}

interface AgentCardProps {
  agent: Agent;
  onToggle: (id: number) => void;
  onRevoke: (id: number) => void;
}

export default function AgentCard({
  agent,
  onToggle,
  onRevoke,
}: AgentCardProps) {
  const percentage = Math.min(
    (agent.spent / agent.dailyLimit) * 100,
    100
  );

  return (
    <div className="bg-surface border border-gray-800 rounded-xl p-6">

      <div className="flex items-center gap-4 mb-6">

        <div className="bg-violet-500/10 p-3 rounded-xl">
          <Bot size={28} className="text-violet-400" />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold break-words">
            {agent.name}
          </h2>

          <p className="text-sm text-gray-400">
            Autonomous AI Agent
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs ${
            agent.active
              ? "bg-green-500/10 text-green-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {agent.active ? "Active" : "Paused"}
        </span>

      </div>

      <div className="flex justify-between text-sm mb-3">
        <span className="text-gray-400">
          Daily Spending
        </span>

        <span>
          {agent.spent} / {agent.dailyLimit} USDC
        </span>
      </div>

      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-500 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">

        <button
          onClick={() => onToggle(agent.id)}
          className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 py-3 rounded-lg cursor-pointer"
        >
          {agent.active ? (
            <Pause size={16} />
          ) : (
            <Play size={16} />
          )}

          {agent.active ? "Pause" : "Activate"}
        </button>

        <button
          onClick={() => {
            if (window.confirm("Revoke this demo agent?")) {
              onRevoke(agent.id);
            }
          }}
          className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-lg cursor-pointer"
        >
          <Trash2 size={16} />
          Revoke
        </button>

      </div>

    </div>
  );
}

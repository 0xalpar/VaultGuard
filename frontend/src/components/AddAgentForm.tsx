
"use client";

import { useState } from "react";
import { X, Bot } from "lucide-react";

interface AddAgentFormProps {
  onAdd: (name: string, limit: number) => void;
  onClose: () => void;
}

export default function AddAgentForm({
  onAdd,
  onClose,
}: AddAgentFormProps) {
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const dailyLimit = Number(limit);

    if (!name.trim()) {
      setError("Please enter an agent name.");
      return;
    }

    if (
      !Number.isFinite(dailyLimit) ||
      dailyLimit <= 0
    ) {
      setError("Please enter a valid spending limit.");
      return;
    }

    onAdd(name.trim(), dailyLimit);
  }

  return (
    <section className="bg-surface border border-violet-500/30 rounded-xl p-6 mb-6">

      <div className="flex justify-between items-center mb-6">

        <div className="flex items-center gap-3">
          <Bot className="text-violet-400" />
          <h2 className="text-xl font-semibold">
            Add New Agent
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close form"
          className="text-gray-400 hover:text-white cursor-pointer"
        >
          <X size={22} />
        </button>

      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label htmlFor="agent-name" className="block text-sm text-gray-400 mb-2">
            Agent Name
          </label>

          <input
            id="agent-name"
            type="text"
            required
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Research Agent"
            className="w-full bg-[#0B1120] border border-gray-700 rounded-lg p-3 outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label htmlFor="daily-limit" className="block text-sm text-gray-400 mb-2">
            Daily Spending Limit (USDC)
          </label>

          <input
            id="daily-limit"
            type="number"
            min="0.01"
            step="0.01"
            required
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="50"
            className="w-full bg-[#0B1120] border border-gray-700 rounded-lg p-3 outline-none focus:border-violet-500"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-lg font-medium cursor-pointer"
        >
          Authorize Agent (Demo)
        </button>

      </form>

    </section>
  );
}

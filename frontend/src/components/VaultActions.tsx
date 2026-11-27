
"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface VaultActionsProps {
  balance: number;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

export default function VaultActions({
  balance,
  onDeposit,
  onWithdraw,
}: VaultActionsProps) {
  const [mode, setMode] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
      setError("Use a maximum of two decimal places.");
      return;
    }

    if (mode === "withdraw" && value > balance) {
      setError("Insufficient vault balance.");
      return;
    }

    if (mode === "deposit") {
      onDeposit(value);
      setSuccess("Demo deposit successful.");
    } else {
      onWithdraw(value);
      setSuccess("Demo withdrawal successful.");
    }

    setAmount("");
  }

  return (
    <section className="bg-surface border border-gray-800 rounded-xl p-6 mt-6">

      <h2 className="text-xl font-semibold mb-6">
        Manage Funds
      </h2>

      <div className="flex gap-3 mb-6">

        <button
          onClick={() => {
            setMode("deposit");
            setError("");
            setSuccess("");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg cursor-pointer ${
            mode === "deposit"
              ? "bg-violet-600 text-white"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          <ArrowDownLeft size={20} />
          Deposit
        </button>

        <button
          onClick={() => {
            setMode("withdraw");
            setError("");
            setSuccess("");
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg cursor-pointer ${
            mode === "withdraw"
              ? "bg-violet-600 text-white"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          <ArrowUpRight size={20} />
          Withdraw
        </button>

      </div>

      <form onSubmit={handleSubmit}>

        <label htmlFor="vault-amount" className="block text-sm text-gray-400 mb-2">
          Amount (USDC)
        </label>

        <div className="flex items-center bg-[#0B1120] border border-gray-700 rounded-lg px-4">

          <input
            id="vault-amount"
            type="number"
            min="0.01"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full min-w-0 bg-transparent py-4 outline-none text-white"
          />

          <span className="text-gray-400">
            USDC
          </span>

        </div>

        {error && (
          <p className="text-red-400 text-sm mt-3">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-400 text-sm mt-3">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 py-3 rounded-lg mt-5 font-medium transition-colors cursor-pointer"
        >
          {mode === "deposit"
            ? "Deposit USDC"
            : "Withdraw USDC"}
        </button>

      </form>

    </section>
  );
}

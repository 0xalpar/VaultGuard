
"use client";

import { Wallet } from "lucide-react";

interface SpendingLimitsProps {
  dailyLimit: string;
  transactionLimit: string;
  onDailyLimitChange: (value: string) => void;
  onTransactionLimitChange: (value: string) => void;
}

export default function SpendingLimits({
  dailyLimit,
  transactionLimit,
  onDailyLimitChange,
  onTransactionLimitChange,
}: SpendingLimitsProps) {
  return (
    <section className="bg-surface border border-border rounded-xl p-6">

      <div className="flex items-center gap-3 mb-2">
        <Wallet className="text-accent" size={24} />

        <h2 className="text-xl font-semibold">
          Spending Limits
        </h2>
      </div>

      <p className="text-sm text-muted mb-6">
        Control how much your agents are allowed to spend.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label
            htmlFor="daily-limit"
            className="block text-sm text-muted mb-2"
          >
            Daily Spending Limit
          </label>

          <div className="relative">
            <input
              id="daily-limit"
              type="number"
              min="0.01"
              step="0.01"
              value={dailyLimit}
              onChange={(e) =>
                onDailyLimitChange(e.target.value)
              }
              className="w-full bg-background border border-border rounded-lg p-3 pr-20 outline-none focus:border-primary"
            />

            <span className="absolute right-4 top-3 text-muted">
              USDC
            </span>
          </div>

          <p className="text-xs text-muted mt-2">
            Maximum total spending per day.
          </p>
        </div>

        <div>
          <label
            htmlFor="transaction-limit"
            className="block text-sm text-muted mb-2"
          >
            Max Transaction Amount
          </label>

          <div className="relative">
            <input
              id="transaction-limit"
              type="number"
              min="0.01"
              step="0.01"
              value={transactionLimit}
              onChange={(e) =>
                onTransactionLimitChange(e.target.value)
              }
              className="w-full bg-background border border-border rounded-lg p-3 pr-20 outline-none focus:border-primary"
            />

            <span className="absolute right-4 top-3 text-muted">
              USDC
            </span>
          </div>

          <p className="text-xs text-muted mt-2">
            Maximum amount allowed per transaction.
          </p>
        </div>

      </div>
    </section>
  );
}

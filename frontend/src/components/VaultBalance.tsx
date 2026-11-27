
import { Wallet, ShieldCheck } from "lucide-react";

interface VaultBalanceProps {
  balance: number;
}

export default function VaultBalance({
  balance,
}: VaultBalanceProps) {
  return (
    <section className="bg-surface border border-gray-800 rounded-xl p-8">

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

        <div className="flex items-center gap-3">
          <div className="bg-violet-500/10 p-3 rounded-lg">
            <Wallet size={24} className="text-violet-400" />
          </div>

          <span className="text-gray-400">
            Total Vault Balance
          </span>
        </div>

        <span className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
          <ShieldCheck size={16} />
          Active (Demo)
        </span>

      </div>

      <h2 className="text-4xl font-bold">
        {balance.toFixed(2)} USDC
      </h2>

      <p className="text-gray-400 text-sm mt-3">
        Solana Devnet — Simulated balance
      </p>

    </section>
  );
}

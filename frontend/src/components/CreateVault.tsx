
"use client";

import { Wallet, Plus } from "lucide-react";

interface CreateVaultProps {
  onCreate: () => void;
}

export default function CreateVault({
  onCreate,
}: CreateVaultProps) {
  return (
    <section className="bg-surface border border-gray-800 rounded-xl p-12 flex flex-col items-center text-center">

      <div className="w-16 h-16 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6">
        <Wallet size={32} className="text-violet-400" />
      </div>

      <h2 className="text-2xl font-bold mb-3">
        Create your first vault
      </h2>

      <p className="text-gray-400 max-w-md mb-6">
        Create a vault to manage your digital assets
        and authorize autonomous AI agents.
      </p>

      <button
        onClick={onCreate}
        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-lg transition-colors cursor-pointer"
      >
        <Plus size={20} />
        Create Vault
      </button>

    </section>
  );
}

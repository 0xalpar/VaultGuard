
"use client";

import { useState } from "react";
import { ListChecks, Plus, Trash2 } from "lucide-react";

interface AddressWhitelistProps {
  enabled: boolean;
  addresses: string[];
  onToggle: () => void;
  onAdd: (address: string) => void;
  onRemove: (address: string) => void;
}

export default function AddressWhitelist({
  enabled,
  addresses,
  onToggle,
  onAdd,
  onRemove,
}: AddressWhitelistProps) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  function handleAdd() {
    const value = address.trim();

    if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value)) {
      setError("Please enter a valid Solana address format.");
      return;
    }

    if (addresses.includes(value)) {
      setError("This address is already added.");
      return;
    }

    onAdd(value);
    setAddress("");
    setError("");
  }

  return (
    <section className="bg-surface border border-border rounded-xl p-6">

      <div className="flex items-center gap-3 mb-2">
        <ListChecks className="text-accent" size={24} />

        <h2 className="text-xl font-semibold">
          Address Whitelist
        </h2>
      </div>

      <p className="text-sm text-muted mb-6">
        Restrict agent transactions to approved wallet addresses.
      </p>

      <div className="flex items-center justify-between gap-4 bg-background border border-border rounded-lg p-4 mb-6">

        <div>
          <p className="font-medium">
            Whitelist Protection
          </p>

          <p className="text-xs text-muted mt-1">
            Only allow transactions to approved addresses.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-label="Whitelist protection"
          aria-checked={enabled}
          onClick={onToggle}
          className={`relative w-12 h-6 shrink-0 rounded-full cursor-pointer ${
            enabled ? "bg-primary" : "bg-border"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-foreground rounded-full transition-transform ${
              enabled ? "translate-x-6" : ""
            }`}
          />
        </button>

      </div>

      <label
        htmlFor="wallet-address"
        className="block text-sm text-muted mb-2"
      >
        Wallet Address
      </label>

      <div className="flex gap-3">

        <input
          id="wallet-address"
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setError("");
          }}
          placeholder="Enter Solana wallet address"
          className="flex-1 min-w-0 bg-background border border-border rounded-lg p-3 outline-none focus:border-primary"
        />

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-background font-semibold px-5 rounded-lg cursor-pointer"
        >
          <Plus size={18} />
          Add
        </button>

      </div>

      {error && (
        <p className="text-danger text-sm mt-2">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-3">

        <p className="text-sm text-muted">
          Allowed Addresses ({addresses.length})
        </p>

        {addresses.length === 0 && (
          <div className="border border-dashed border-border rounded-lg p-6 text-center text-muted text-sm">
            No wallet addresses added yet.
          </div>
        )}

        {addresses.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between gap-3 bg-background border border-border rounded-lg p-4"
          >
            <span className="text-sm font-mono break-all">
              {item}
            </span>

            <button
              aria-label="Remove address"
              onClick={() => onRemove(item)}
              className="text-danger hover:bg-danger/10 p-2 rounded-lg cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

      </div>

      {enabled && addresses.length === 0 && (
        <p className="text-warning text-xs mt-4">
          Whitelist is enabled but empty. All destinations
          would be blocked when enforcement is connected.
        </p>
      )}

    </section>
  );
}

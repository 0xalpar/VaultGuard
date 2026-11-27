#!/usr/bin/env bash
set -euo pipefail
cd /workspace
rpc=http://127.0.0.1:8899
wallet=/root/.config/solana/id.json
program_key=target/deploy/agentvault-keypair.json
ledger=/ledger/frontend
if solana cluster-version --url "$rpc" >/dev/null 2>&1; then
  echo 'RPC already running. Do not start a second validator.'; exit 1
fi
for f in "$wallet" "$program_key" target/deploy/agentvault.so target/idl/agentvault.json; do
  [[ -s "$f" ]] || { echo "Missing required file: $f"; exit 1; }
done
owner=$(solana-keygen pubkey "$wallet")
program=$(solana-keygen pubkey "$program_key")
node -e 'if(require("./target/idl/agentvault.json").address!==process.argv[1]) throw new Error("Program ID mismatch")' "$program"
if [[ -f "$ledger/genesis.bin" ]]; then
  echo 'Resuming persistent frontend ledger; existing deployed program is preserved.'
  exec solana-test-validator --ledger "$ledger" --bind-address 0.0.0.0 --rpc-port 8899
fi
npm run fixture -- "$owner"
exec solana-test-validator --ledger "$ledger" --bind-address 0.0.0.0 --rpc-port 8899 \
  --account 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU fixtures/devnet-usdc.json \
  --bpf-program "$program" target/deploy/agentvault.so

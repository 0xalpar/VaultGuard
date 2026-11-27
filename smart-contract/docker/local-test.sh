#!/usr/bin/env bash
set -euo pipefail
cd /workspace
export ANCHOR_PROVIDER_URL=http://127.0.0.1:8899
export ANCHOR_WALLET=/root/.config/solana/id.json
[[ -s "$ANCHOR_WALLET" && -s target/deploy/agentvault.so && -s target/idl/agentvault.json ]] || { echo 'Run docker/build.sh first.'; exit 1; }
# Do not reset a validator that is already serving requests.
if solana cluster-version --url "$ANCHOR_PROVIDER_URL" >/dev/null 2>&1; then
  echo 'A validator is already running on 8899. Stop it before this disposable test.'
  exit 1
fi
owner=$(solana-keygen pubkey "$ANCHOR_WALLET")
program=$(solana-keygen pubkey target/deploy/agentvault-keypair.json)
node -e 'if(require("./target/idl/agentvault.json").address!==process.argv[1]) throw new Error("Program ID mismatch; rebuild first")' "$program"
npm run fixture -- "$owner"
# Only the isolated local test ledger is reset; no Devnet/Mainnet access.
solana-test-validator --reset --ledger /ledger/test --bind-address 0.0.0.0 --rpc-port 8899 \
  --account 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU fixtures/devnet-usdc.json \
  --bpf-program "$program" target/deploy/agentvault.so > /ledger/validator.log 2>&1 &
validator_pid=$!
trap 'kill "$validator_pid" 2>/dev/null || true; wait "$validator_pid" 2>/dev/null || true' EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
ready=0
for ((i=0;i<90;i++)); do
  if ! kill -0 "$validator_pid" 2>/dev/null; then tail -60 /ledger/validator.log; exit 1; fi
  if solana cluster-version --url "$ANCHOR_PROVIDER_URL" >/dev/null 2>&1; then ready=1; break; fi
  sleep 2
done
if [[ "$ready" != 1 ]]; then tail -60 /ledger/validator.log; exit 1; fi
solana airdrop 5 "$owner" --url "$ANCHOR_PROVIDER_URL"
npm test

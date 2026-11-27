#!/usr/bin/env bash
set -euo pipefail
cd /workspace
mkdir -p /root/.config/solana target/deploy
umask 077
if [[ ! -s /root/.config/solana/id.json ]]; then
  solana-keygen new --no-bip39-passphrase --silent -o /root/.config/solana/id.json
fi
if [[ ! -s target/deploy/agentvault-keypair.json ]]; then
  solana-keygen new --no-bip39-passphrase --silent -o target/deploy/agentvault-keypair.json
fi
umask 022
solana config set --url http://127.0.0.1:8899 --keypair /root/.config/solana/id.json
npm install --no-audit --no-fund
anchor keys sync
anchor build
node -e 'const fs=require("fs"); const idl=require("./target/idl/agentvault.json"); if (!idl.address || !fs.statSync("target/deploy/agentvault.so").size) throw new Error("Missing build outputs"); console.log("Program ID:",idl.address);'
anchor keys list

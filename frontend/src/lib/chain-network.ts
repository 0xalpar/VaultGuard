import {Connection, PublicKey} from '@solana/web3.js';
import idl from '../idl/agentvault.json';
import {inspectLocalnet, localConnection, readVaults} from './agentvault-localnet';

const DEVNET_RPC = 'https://api.devnet.solana.com';
const DEVNET_GENESIS = 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG';
export const chainNetwork = process.env.NEXT_PUBLIC_SOLANA_NETWORK;
export const chainLabel = chainNetwork === 'devnet' ? 'Devnet' : 'Localnet';

export function configuredProgramId() {
  return new PublicKey(chainNetwork === 'devnet'
    ? process.env.NEXT_PUBLIC_AGENTVAULT_PROGRAM_ID ?? ''
    : idl.address);
}

export function chainConnection() {
  if (chainNetwork === 'localnet') return localConnection();
  if (chainNetwork !== 'devnet') throw Error('Agent ödeme ağı localnet veya devnet olmalı.');
  configuredProgramId();
  return new Connection(DEVNET_RPC, {commitment:'confirmed', disableRetryOnRateLimit:true});
}

export async function inspectChain(c: Connection) {
  if (chainNetwork === 'devnet' && await c.getGenesisHash() !== DEVNET_GENESIS) {
    throw Error('RPC, beklenen Solana Devnet zincirine bağlı değil.');
  }
  return inspectLocalnet(c, configuredProgramId());
}

export function readChainVaults(c: Connection, owner: string) {
  return readVaults(c, owner, configuredProgramId());
}

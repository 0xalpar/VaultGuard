"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import {Transaction} from '@solana/web3.js';
import { createProof, verifyProof, publicKeyBytes } from '../lib/wallet-proof';

export type WalletName = 'Phantom' | 'Solflare';
type Key = { toString(): string };
type WalletEvent = 'accountChanged' | 'disconnect';
type InjectedWallet = {
  isPhantom?: boolean; isSolflare?: boolean; isConnected?: boolean; publicKey?: Key | null;
  connect(): Promise<{publicKey?: Key} | void>;
  disconnect(): Promise<void> | void;
  signTransaction?(transaction: Transaction): Promise<Transaction>;
  signMessage(message: Uint8Array, encoding?: 'utf8'): Promise<Uint8Array | {signature: Uint8Array; publicKey?: Key}>;
  on(event: WalletEvent, callback: (...args: unknown[]) => void): void;
  off?(event: WalletEvent, callback: (...args: unknown[]) => void): void;
  removeListener?(event: WalletEvent, callback: (...args: unknown[]) => void): void;
};
type WalletWindow = Window & { phantom?: {solana?: InjectedWallet}; solana?: InjectedWallet; solflare?: InjectedWallet };
function findWallet(name: WalletName): InjectedWallet | undefined {
  const w = window as WalletWindow;
  const p = name === 'Phantom' ? (w.phantom?.solana ?? w.solana) : (w.solflare ?? w.solana);
  if (!p || !(name === 'Phantom' ? p.isPhantom : p.isSolflare)) return;
  if (typeof p.connect !== 'function' || typeof p.signMessage !== 'function' || typeof p.disconnect !== 'function' || typeof p.on !== 'function' || !(p.off || p.removeListener)) return;
  return p;
}
function matches(p: InjectedWallet, address: string) { return p.publicKey?.toString() === address && p.isConnected !== false; }
type Connection = { name: WalletName; address: string; verifiedAt: number };
type Context = { connection: Connection | null; busy: boolean; error: string; connect: (name: WalletName) => Promise<void>; disconnect: () => Promise<void>; signTransaction: (transaction: Transaction) => Promise<Transaction> };
const WalletContext = createContext<Context | null>(null);
export default function WalletProvider({children}: {children: ReactNode}) {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const active = useRef<InjectedWallet | null>(null);
  const cleanup = useRef<(() => void) | null>(null);
  const lock = useRef(false);
  const generation = useRef(0);
  const verified = useRef<string | null>(null);
  function clear() {
    generation.current++;
    cleanup.current?.(); cleanup.current = null;
    active.current = null; verified.current = null;
    setConnection(null);
  }
  useEffect(() => () => { generation.current++; cleanup.current?.(); cleanup.current=null; active.current=null; verified.current=null; }, []);
  async function connect(name: WalletName) {
    if (lock.current || active.current) return;
    setError('');
    if (!window.isSecureContext || !globalThis.crypto?.subtle) {setError('Cüzdan doğrulaması için localhost veya HTTPS kullanın.');return;}
    const provider = findWallet(name);
    if (!provider) {setError(`${name} uyumlu tarayıcı uzantısı bulunamadı. Resmî uzantıyı kurup sayfayı yenileyin.`);return;}
    lock.current=true; setBusy(true);
    const attempt = ++generation.current;
    active.current=provider;
    try {
      const result = await provider.connect();
      if (generation.current!==attempt) throw Error('Bağlantı değişti. Yeniden bağlanın.');
      const address = (result?.publicKey ?? provider.publicKey)?.toString();
      if (!address || provider.publicKey?.toString() !== address) throw Error('Cüzdan adresi alınamadı.');
      publicKeyBytes(address);
      const invalidate = () => { if (active.current===provider) {clear();setError('Cüzdan hesabı değişti veya bağlantı kesildi. Yeniden imza ile bağlanın.');} };
      const onAccount = (...args: unknown[]) => {const key=args[0]; if (!key || String(key)!==address || provider.publicKey?.toString()!==address) invalidate();};
      const onDisconnect = () => invalidate();
      cleanup.current=()=>{ const off=provider.off ?? provider.removeListener; off?.call(provider,'accountChanged',onAccount);off?.call(provider,'disconnect',onDisconnect); };
      provider.on('accountChanged',onAccount);provider.on('disconnect',onDisconnect);
      const proof=createProof(address, window.location.origin);
      // Keep the expected bytes independent of the provider's input buffer.
      const response=await provider.signMessage(Uint8Array.from(proof.message),'utf8');
      if (generation.current!==attempt || !matches(provider,address)) throw Error('İmza sırasında cüzdan hesabı değişti.');
      const signature=response instanceof Uint8Array ? response : response.signature;
      if (!(signature instanceof Uint8Array) || (!(response instanceof Uint8Array) && response.publicKey && response.publicKey.toString()!==address)) throw Error('Cüzdan geçersiz imza yanıtı verdi.');
      let valid=false;
      try {valid=await verifyProof(address,proof.message,signature);} catch {throw Error('Ed25519 doğrulanamadı. Güncel Chrome veya Edge kullanın.');}
      if (!valid) throw Error('İmza doğrulanamadı.');
      if (Date.now()>proof.expiresAt || generation.current!==attempt || !matches(provider,address)) throw Error('İmza isteğinin süresi doldu veya bağlantı değişti.');
      verified.current=address;
      setConnection({name,address,verifiedAt:Date.now()});
    } catch (e) {
      if (active.current===provider) clear();
      try {await provider.disconnect();} catch { /* local proof already invalid */ }
      const code=(e as {code?:unknown})?.code;
      setError(code===4001?'Cüzdan bağlantısı veya imza isteği iptal edildi.':e instanceof Error?e.message:'Cüzdan bağlantısı tamamlanamadı.');
    } finally {lock.current=false;setBusy(false);}
  }
  async function disconnect() {
    if (lock.current) return;
    const p=active.current;
    clear();setError('');
    if (!p) return;
    lock.current=true;setBusy(true);
    try {await p.disconnect();} catch {setError('Yerel bağlantı kapatıldı. Uzantıdaki site iznini ayrıca kaldırabilirsiniz.');}
    finally {lock.current=false;setBusy(false);}
  }
  // Additional check when returning to the tab, even if a wallet event is missed.
  useEffect(()=>{
    const check=()=>{const p=active.current;if(verified.current && (!p || p.publicKey?.toString()!==verified.current || p.isConnected===false)){clear();setError('Cüzdan bağlantısı değişti. Yeniden bağlanın.');}};
    window.addEventListener('focus',check);document.addEventListener('visibilitychange',check);
    return ()=>{window.removeEventListener('focus',check);document.removeEventListener('visibilitychange',check);};
  },[]);
  async function signTransaction(transaction: Transaction) {
    const p=active.current, address=verified.current, attempt=generation.current;
    if(lock.current||!p?.signTransaction||!address||!matches(p,address))throw Error('Önce cüzdanınızı bağlayın.');
    if(transaction.feePayer?.toBase58()!==address)throw Error('İşlem cüzdanı eşleşmiyor.');
    const expected=transaction.serializeMessage();
    lock.current=true;setBusy(true);
    try {
      const signed=await p.signTransaction(transaction);
      if(generation.current!==attempt||!matches(p,address)||!expected.equals(signed.serializeMessage()))throw Error('İmza sırasında hesap veya işlem değişti.');
      return signed;
    } finally {lock.current=false;setBusy(false);}
  }
  return <WalletContext.Provider value={{connection,busy,error,connect,disconnect,signTransaction}}>{children}</WalletContext.Provider>;
}
export function useWalletConnection(){const c=useContext(WalletContext);if(!c)throw Error('WalletProvider eksik.');return c;}

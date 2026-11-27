/** Local ownership proof only; never use as server authentication or authority. */
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
export function publicKeyBytes(address: string): Uint8Array<ArrayBuffer> {
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) throw Error('Geçersiz Solana adresi.');
  const bytes: number[] = [];
  for (const c of address) {
    let carry = ALPHABET.indexOf(c);
    for (let i = 0; i < bytes.length; i++) { carry += bytes[i] * 58; bytes[i] = carry & 255; carry >>= 8; }
    while (carry) { bytes.push(carry & 255); carry >>= 8; }
  }
  const leading = address.match(/^1*/)?.[0].length ?? 0;
  if (leading + bytes.length !== 32) throw Error('Geçersiz Solana adresi.');
  return Uint8Array.from([...Array(leading).fill(0), ...bytes.reverse()]);
}
export const PROOF_TTL = 5 * 60_000;
export function createProof(address: string, origin: string, now = Date.now()) {
  publicKeyBytes(address);
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2,'0')).join('');
  const expiresAt = now + PROOF_TTL;
  const message = `AgentVault cüzdan sahipliği doğrulaması\nBu imza para transferi veya harcama yetkisi vermez.\nOrigin: ${origin}\nSolana address: ${address}\nNonce: ${nonce}\nIssued at: ${new Date(now).toISOString()}\nExpires at: ${new Date(expiresAt).toISOString()}`;
  return {message: new TextEncoder().encode(message), expiresAt};
}
export async function verifyProof(address: string, message: Uint8Array, signature: Uint8Array): Promise<boolean> {
  if (signature.length !== 64) return false;
  const key = await crypto.subtle.importKey('raw', publicKeyBytes(address), {name:'Ed25519'}, false, ['verify']);
  return crypto.subtle.verify({name:'Ed25519'}, key, Uint8Array.from(signature), Uint8Array.from(message));
}

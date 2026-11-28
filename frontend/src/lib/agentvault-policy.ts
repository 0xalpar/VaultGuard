/** Browser-independent DEMO reference model. Not a Solana program or an authentication boundary. */
export const USDC_SCALE = 1_000_000;
export const MAX_VIOLATIONS = 5;
export type AgentStatus = "active" | "paused" | "suspended" | "revoked";
export type AgentPolicy = {
  dailyLimit: number;
  maxTransfer: number;
  totalLimit: number;
  allowlistEnabled: boolean;
  allowlist: string[];
  denylist: string[];
};
export type Agent = {
  id: string;
  publicKey: string;
  status: AgentStatus;
  policy: AgentPolicy;
  day: string;
  dailySpent: number;
  totalSpent: number;
  violations: number;
  lastNonce: number;
};
export type TransferRequest = {
  vaultId: string;
  agentId: string;
  agentPublicKey: string;
  recipientWallet: string;
  recipientIdentity: string; // claimed label; wallet address is the policy target
  amount: number; // integer micro-USDC
  nonce: number;
  expiresAt: number; // Unix milliseconds
};
export type Reason = "IDENTITY_NOT_VERIFIED" | "WRONG_VAULT" | "UNKNOWN_AGENT" | "REPLAY" | "EXPIRED" | "INVALID_REQUEST" | "AGENT_INACTIVE" | "VAULT_FROZEN" | "INVALID_POLICY" | "DENYLIST" | "NOT_ALLOWLISTED" | "ABOVE_MAXIMUM" | "DAILY_LIMIT" | "TOTAL_LIMIT" | "INSUFFICIENT_BALANCE" | "OWNER_REJECTED" | "BELOW_MINIMUM";
export type AuditEntry = { request: TransferRequest; at: number; decision: "approved" | "rejected" | "pending"; reason?: Reason; suspended: boolean };
export type OwnerMovement = { kind: "deposit" | "withdraw"; amount: number; at: number };
export type VaultState = { id: string; ownerPublicKey: string; frozen: boolean; balance: number; agents: Agent[]; logs: AuditEntry[]; ownerMovements: OwnerMovement[] };
export type Outcome = { state: VaultState; entry: AuditEntry };
const nonnegative = (n: number) => Number.isSafeInteger(n) && n >= 0;
const positive = (n: number) => nonnegative(n) && n > 0;
export function parseUsdc(text: string): number {
  const normalized = text.trim().replace(",", ".");
  if (!/^\d+(\.\d{1,6})?$/.test(normalized)) throw new Error("En fazla altı ondalık basamak girin.");
  const [whole, fraction = ""] = normalized.split(".");
  const units = Number(whole) * USDC_SCALE + Number(fraction.padEnd(6, "0"));
  if (!nonnegative(units)) throw new Error("Tutar güvenli sayı aralığının dışında.");
  return units;
}
export function validPolicy(p: AgentPolicy): boolean {
  return positive(p.maxTransfer) && positive(p.dailyLimit) && positive(p.totalLimit)
    && p.maxTransfer <= p.dailyLimit && p.maxTransfer <= p.totalLimit;
}
/** Calendar day in Turkey, independent of the browser/server timezone. */
export function policyDay(now: number): string {
  return new Intl.DateTimeFormat('en-CA', {timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(now));
}
/** Simulates a decision with an EXPLICITLY simulated signer identity. Never pass this off as signature verification. */
export function simulateTransfer(state: VaultState, request: TransferRequest, simulatedSignerPublicKey: string | null, now: number): Outcome {
  return evaluateTransfer(state, request, simulatedSignerPublicKey, now, false);
}
function evaluateTransfer(state: VaultState, request: TransferRequest, simulatedSignerPublicKey: string | null, now: number, ownerApproved: boolean): Outcome {
  if (!Number.isSafeInteger(now) || now < 0 || now > 8_640_000_000_000_000) throw new Error("Invalid simulation clock");
  const day = policyDay(now);
  const agent = state.agents.find(a => a.id === request.agentId && a.publicKey === request.agentPublicKey);
  const record = (reason?: Reason, updated?: Agent, suspended = false, pending = false): Outcome => {
    const entry: AuditEntry = { request: { ...request }, at: now, decision: pending ? "pending" : reason ? "rejected" : "approved", ...(reason ? { reason } : {}), suspended };
    return { entry, state: { ...state, balance: reason ? state.balance : state.balance - request.amount,
      agents: updated ? state.agents.map(a => a.id === updated.id ? updated : a) : state.agents,
      logs: [...state.logs, entry] } };
  };
  if (request.vaultId !== state.id) return record("WRONG_VAULT");
  if (!agent) return record("UNKNOWN_AGENT");
  if (!simulatedSignerPublicKey || simulatedSignerPublicKey !== agent.publicKey) return record("IDENTITY_NOT_VERIFIED");
  if (!positive(request.nonce) || (!ownerApproved && request.nonce <= agent.lastNonce)) return record("REPLAY");
  if (!Number.isSafeInteger(request.expiresAt) || request.expiresAt <= now) return record("EXPIRED");
  const current = { ...agent, lastNonce: Math.max(agent.lastNonce, request.nonce), day, dailySpent: agent.day === day ? agent.dailySpent : 0 };
  if (current.status !== "active") return record("AGENT_INACTIVE", current);
  if (state.frozen) return record("VAULT_FROZEN", current);
  if (!validPolicy(current.policy)) return record("INVALID_POLICY", current);
  const violation = (reason: Reason) => {
    const violations = current.violations + 1;
    const suspended = violations >= MAX_VIOLATIONS;
    return record(reason, { ...current, violations, status: suspended ? "suspended" : current.status }, suspended);
  };
  if (!positive(request.amount) || !request.recipientWallet.trim() || !request.recipientIdentity.trim()) return violation("INVALID_REQUEST");
  const p = current.policy;
  if (p.denylist.includes(request.recipientWallet)) return violation("DENYLIST");
  if (request.amount > p.maxTransfer) return violation("ABOVE_MAXIMUM");
  if (request.amount > p.dailyLimit - current.dailySpent) return violation("DAILY_LIMIT");
  if (request.amount > p.totalLimit - current.totalSpent) return violation("TOTAL_LIMIT");
  if (request.amount > state.balance) return record("INSUFFICIENT_BALANCE", current);
  if (!ownerApproved && !p.allowlist.includes(request.recipientWallet)) return record("NOT_ALLOWLISTED", current, false, true);
  return record(undefined, { ...current, dailySpent: current.dailySpent + request.amount, totalSpent: current.totalSpent + request.amount });
}
/** Demo owner decision only. A production API must authenticate the owner separately. */
export function resolveDemoApproval(state: VaultState, logIndex: number, approve: boolean, now: number): VaultState {
  const pending = state.logs[logIndex];
  if (!pending || pending.decision !== "pending") throw new Error("Talep artık onay beklemiyor.");
  if (!approve) return { ...state, logs: state.logs.map((l, i) => i === logIndex ? { ...l, at: now, decision: "rejected", reason: "OWNER_REJECTED" } : l) };
  const outcome = evaluateTransfer(state, pending.request, pending.request.agentPublicKey, now, true);
  return { ...outcome.state, logs: state.logs.map((l, i) => i === logIndex ? outcome.entry : l) };
}
/** These are DEMO state transitions, not owner authentication. */
export function setDemoFrozen(state: VaultState, frozen: boolean): VaultState { return { ...state, frozen }; }
export function setDemoAgentStatus(state: VaultState, id: string, status: "active" | "paused" | "revoked"): VaultState {
  return { ...state, agents: state.agents.map(a => a.id !== id || a.status === "revoked" || (a.status === "suspended" && status === "paused") ? a : {
    ...a, status, violations: status === "active" && a.status === "suspended" ? 0 : a.violations,
  }) };
}
export function demoDeposit(state: VaultState, amount: number, at: number): VaultState {
  if (!positive(amount) || !nonnegative(state.balance + amount)) throw new Error("Geçersiz demo yatırma tutarı.");
  return { ...state, balance: state.balance + amount, ownerMovements: [...state.ownerMovements, {kind: "deposit", amount, at}] };
}
export function demoWithdraw(state: VaultState, amount: number, at: number): VaultState {
  if (!positive(amount) || amount > state.balance) throw new Error("Demo çekme işlemi engellendi.");
  return { ...state, balance: state.balance - amount, ownerMovements: [...state.ownerMovements, {kind: "withdraw", amount, at}] };
}

use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{self, Mint, Token, TokenAccount, TransferChecked}};
use crate::{Vault, VaultError};

pub const VIOLATION_LIMIT: u64 = 5;
pub const ACTIVE: u8 = 0;
pub const PAUSED: u8 = 1;
pub const SUSPENDED: u8 = 2;
pub const REVOKED: u8 = 3;
pub const PENDING: u8 = 0;
pub const PAID: u8 = 1;
pub const REJECTED: u8 = 2;
pub const EXPIRED: u8 = 3;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct Policy {
    pub daily_limit: u64,
    pub max_transfer: u64,
    pub total_limit: u64,
    #[max_len(20)] pub allowlist: Vec<Pubkey>,
    #[max_len(20)] pub denylist: Vec<Pubkey>,
}
impl Policy {
    pub fn validate(&self) -> Result<()> {
        require!(self.max_transfer > 0 && self.max_transfer <= self.daily_limit && self.max_transfer <= self.total_limit, VaultError::InvalidPolicy);
        require!(self.allowlist.len() <= 20 && self.denylist.len() <= 20 && self.allowlist.len() + self.denylist.len() <= 24, VaultError::InvalidPolicy);
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct VaultGuard { pub epoch: u64, pub frozen: bool }

#[account]
#[derive(InitSpace)]
pub struct AgentRegistration {
    pub vault: Pubkey,
    pub key: Pubkey,
    pub status: u8,
    pub bump: u8,
    pub epoch: u64,
    pub last_nonce: u64,
    pub day: i64,
    pub daily_spent: u64,
    pub total_spent: u64,
    pub violations: u64,
    pub policy: Policy,
}

#[account]
#[derive(InitSpace)]
pub struct PaymentRequest {
    pub agent: Pubkey,
    pub vault: Pubkey,
    pub recipient: Pubkey,
    #[max_len(64)] pub recipient_label: String,
    pub amount: u64,
    pub nonce: u64,
    pub expires_at: i64,
    pub epoch: u64,
    pub created_at: i64,
    pub resolved_at: i64,
    pub status: u8,
    pub reason: u8,
    pub bump: u8,
}

#[derive(Accounts)]
pub struct SetAgentEmergency<'info> {
    #[account(mut)] pub owner: Signer<'info>,
    #[account(has_one = owner)] pub vault: Account<'info, Vault>,
    #[account(init_if_needed, payer = owner, space = 8 + VaultGuard::INIT_SPACE,
        seeds = [b"guard", vault.key().as_ref()], bump)]
    pub guard: Account<'info, VaultGuard>,
    pub system_program: Program<'info, System>,
}

pub fn set_emergency(ctx: Context<SetAgentEmergency>, frozen: bool) -> Result<()> {
    let guard = &mut ctx.accounts.guard;
    if frozen && !guard.frozen {
        guard.epoch = guard.epoch.checked_add(1).ok_or(VaultError::Overflow)?;
    }
    guard.frozen = frozen;
    emit!(crate::VaultFreezeChanged { vault: ctx.accounts.vault.key(), owner: ctx.accounts.owner.key(), frozen });
    Ok(())
}

#[derive(Accounts)]
#[instruction(agent_key: Pubkey)]
pub struct RegisterAgent<'info> {
    #[account(mut)] pub owner: Signer<'info>,
    #[account(has_one = owner)] pub vault: Account<'info, Vault>,
    #[account(init, payer = owner, space = 8 + AgentRegistration::INIT_SPACE,
        seeds = [b"agent", vault.key().as_ref(), agent_key.as_ref()], bump)]
    pub agent: Account<'info, AgentRegistration>,
    #[account(init_if_needed, payer = owner, space = 8 + VaultGuard::INIT_SPACE, seeds = [b"guard", vault.key().as_ref()], bump)]
    pub guard: Account<'info, VaultGuard>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ManageAgent<'info> {
    pub owner: Signer<'info>,
    #[account(has_one = owner)] pub vault: Account<'info, Vault>,
    #[account(mut, has_one = vault, seeds = [b"agent", vault.key().as_ref(), agent.key.as_ref()], bump = agent.bump)]
    pub agent: Account<'info, AgentRegistration>,
    #[account(seeds = [b"guard", vault.key().as_ref()], bump)]
    pub guard: Account<'info, VaultGuard>,
}

#[derive(Accounts)]
#[instruction(nonce: u64)]
pub struct SubmitPayment<'info> {
    #[account(mut)] pub agent_signer: Signer<'info>,
    pub vault: Account<'info, Vault>,
    #[account(mut, has_one = vault, constraint = agent.key == agent_signer.key() @ VaultError::WrongAgent,
        seeds = [b"agent", vault.key().as_ref(), agent_signer.key().as_ref()], bump = agent.bump)]
    pub agent: Account<'info, AgentRegistration>,
    #[account(init, payer = agent_signer, space = 8 + PaymentRequest::INIT_SPACE,
        seeds = [b"request", agent.key().as_ref(), &nonce.to_le_bytes()], bump)]
    pub request: Account<'info, PaymentRequest>,
    #[account(seeds = [b"guard", vault.key().as_ref()], bump)]
    pub guard: Account<'info, VaultGuard>,
    #[account(address = vault.mint)] pub mint: Account<'info, Mint>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = vault)]
    pub vault_token: Account<'info, TokenAccount>,
    /// CHECK: Only the public key is used as the destination token-account authority.
    pub recipient: UncheckedAccount<'info>,
    #[account(init_if_needed, payer = agent_signer, associated_token::mint = mint, associated_token::authority = recipient)]
    pub recipient_token: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ResolvePayment<'info> {
    pub owner: Signer<'info>,
    #[account(has_one = owner)] pub vault: Account<'info, Vault>,
    #[account(mut, has_one = vault, seeds = [b"agent", vault.key().as_ref(), agent.key.as_ref()], bump = agent.bump)]
    pub agent: Account<'info, AgentRegistration>,
    #[account(mut, has_one = vault, has_one = agent,
        seeds = [b"request", agent.key().as_ref(), &request.nonce.to_le_bytes()], bump = request.bump)]
    pub request: Account<'info, PaymentRequest>,
    #[account(seeds = [b"guard", vault.key().as_ref()], bump)]
    pub guard: Account<'info, VaultGuard>,
    #[account(address = vault.mint)] pub mint: Account<'info, Mint>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = vault)]
    pub vault_token: Account<'info, TokenAccount>,
    #[account(mut, token::mint = mint, constraint = recipient_token.owner == request.recipient @ VaultError::WrongRecipient)]
    pub recipient_token: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

// Rejected authenticated requests return Ok so the receipt and suspension survive.
// Invalid signatures/accounts fail before this function and cannot penalize another agent.
fn decision(agent: &mut AgentRegistration, vault: &Vault, amount: u64, recipient: Pubkey, expires: i64, now: i64, balance: u64, approved: bool) -> (u8,u8) {
    if expires <= now { return (EXPIRED, 1); }
    if agent.status != ACTIVE { return (REJECTED, 2); }
    if vault.frozen { return (REJECTED, 3); }
    let day = (now + 10_800).div_euclid(86_400); // Europe/Istanbul UTC+03, calendar-day boundary.
    if agent.day != day { agent.day = day; agent.daily_spent = 0; }
    let p = &agent.policy;
    let violation = if amount == 0 { 4 }
        else if p.denylist.contains(&recipient) { 5 }
        else if amount > p.max_transfer { 6 }
        else if amount > p.daily_limit.saturating_sub(agent.daily_spent) { 7 }
        else if amount > p.total_limit.saturating_sub(agent.total_spent) { 8 }
        else { 0 };
    if violation != 0 {
        agent.violations = agent.violations.saturating_add(1);
        if agent.violations >= VIOLATION_LIMIT { agent.status = SUSPENDED; }
        return (REJECTED, violation);
    }
    if amount > balance { return (REJECTED, 9); }
    if !approved && !p.allowlist.contains(&recipient) { return (PENDING, 10); }
    (PAID, 0)
}

fn pay<'info>(vault: &Account<'info,Vault>, from: &Account<'info,TokenAccount>, to: &Account<'info,TokenAccount>, mint: &Account<'info,Mint>, program: &Program<'info,Token>, amount: u64) -> Result<()> {
    let id = vault.vault_id.to_le_bytes(); let bump = [vault.bump];
    let seeds: &[&[u8]] = &[b"vault", vault.owner.as_ref(), &id, &bump];
    token::transfer_checked(CpiContext::new_with_signer(program.to_account_info(), TransferChecked {
        from: from.to_account_info(), to: to.to_account_info(), mint: mint.to_account_info(), authority: vault.to_account_info(),
    }, &[seeds]), amount, mint.decimals)
}

pub fn register(ctx: Context<RegisterAgent>, agent_key: Pubkey, policy: Policy) -> Result<()> {
    policy.validate()?;
    require!(!ctx.accounts.vault.frozen && !ctx.accounts.guard.frozen, VaultError::FrozenVault);
    require!(agent_key != Pubkey::default(), VaultError::WrongAgent);
    let a = &mut ctx.accounts.agent;
    a.vault = ctx.accounts.vault.key(); a.key = agent_key; a.bump = ctx.bumps.agent;
    a.status = ACTIVE; a.epoch = ctx.accounts.guard.epoch; a.policy = policy; a.day = (Clock::get()?.unix_timestamp + 10_800).div_euclid(86_400);
    emit!(AgentChanged { agent: a.key(), vault: a.vault, status: a.status });
    Ok(())
}
pub fn update_policy(ctx: Context<ManageAgent>, policy: Policy) -> Result<()> {
    policy.validate()?;
    require!(ctx.accounts.agent.status != REVOKED, VaultError::Revoked);
    ctx.accounts.agent.policy = policy;
    emit!(AgentChanged {agent: ctx.accounts.agent.key(), vault: ctx.accounts.vault.key(), status: ctx.accounts.agent.status});
    Ok(())
}
pub fn set_status(ctx: Context<ManageAgent>, status: u8) -> Result<()> {
    require!([ACTIVE, PAUSED, REVOKED].contains(&status), VaultError::InvalidStatus);
    let a = &mut ctx.accounts.agent;
    require!(a.status != REVOKED, VaultError::Revoked);
    if status == ACTIVE {
        require!(!ctx.accounts.vault.frozen && !ctx.accounts.guard.frozen, VaultError::FrozenVault);
        if a.status == SUSPENDED { a.violations = 0; }
        a.epoch = ctx.accounts.guard.epoch;
    }
    require!(a.status != SUSPENDED || status != PAUSED, VaultError::InvalidStatus);
    a.status = status;
    emit!(AgentChanged {agent: a.key(), vault: a.vault, status});
    Ok(())
}
pub fn submit(ctx: Context<SubmitPayment>, nonce: u64, amount: u64, expires_at: i64, recipient_label: String) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let a = &mut ctx.accounts.agent;
    require!(ctx.accounts.recipient.key() != ctx.accounts.vault.key(), VaultError::WrongRecipient);
    require!(!recipient_label.trim().is_empty() && recipient_label.len() <= 64, VaultError::InvalidRecipientLabel);
    require!(nonce > a.last_nonce, VaultError::Replay);
    require!(expires_at <= now.saturating_add(86_400), VaultError::InvalidExpiry);
    a.last_nonce = nonce;
    let r = &mut ctx.accounts.request;
    r.agent = a.key(); r.vault = ctx.accounts.vault.key(); r.recipient = ctx.accounts.recipient.key();
    r.recipient_label = recipient_label;
    r.amount = amount; r.nonce = nonce; r.expires_at = expires_at; r.epoch = ctx.accounts.guard.epoch; r.created_at = now; r.bump = ctx.bumps.request;
    let (status, reason) = if ctx.accounts.guard.frozen || a.epoch != r.epoch { (REJECTED, 3) } else {
        decision(a, &ctx.accounts.vault, amount, r.recipient, expires_at, now, ctx.accounts.vault_token.amount, false)
    };
    r.status = status; r.reason = reason; r.resolved_at = if status == PENDING {0} else {now};
    if status == PAID {
        pay(&ctx.accounts.vault, &ctx.accounts.vault_token, &ctx.accounts.recipient_token, &ctx.accounts.mint, &ctx.accounts.token_program, amount)?;
        a.daily_spent = a.daily_spent.checked_add(amount).ok_or(VaultError::Overflow)?;
        a.total_spent = a.total_spent.checked_add(amount).ok_or(VaultError::Overflow)?;
    }
    emit!(PaymentDecided {request: r.key(), agent: a.key(), status, reason});
    Ok(())
}
pub fn resolve(ctx: Context<ResolvePayment>, approved: bool) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let r = &mut ctx.accounts.request; let a = &mut ctx.accounts.agent;
    require!(r.status == PENDING, VaultError::AlreadyResolved);
    let (status, reason) = if approved && (ctx.accounts.guard.frozen || r.epoch != ctx.accounts.guard.epoch || a.epoch != r.epoch) { (REJECTED, 3) } else if approved {
        decision(a, &ctx.accounts.vault, r.amount, r.recipient, r.expires_at, now, ctx.accounts.vault_token.amount, true)
    } else { (REJECTED, 11) };
    r.status = status; r.reason = reason; r.resolved_at = now;
    if status == PAID {
        pay(&ctx.accounts.vault, &ctx.accounts.vault_token, &ctx.accounts.recipient_token, &ctx.accounts.mint, &ctx.accounts.token_program, r.amount)?;
        a.daily_spent = a.daily_spent.checked_add(r.amount).ok_or(VaultError::Overflow)?;
        a.total_spent = a.total_spent.checked_add(r.amount).ok_or(VaultError::Overflow)?;
    }
    emit!(PaymentDecided {request: r.key(), agent: a.key(), status, reason});
    Ok(())
}

#[event]
pub struct AgentChanged {pub agent: Pubkey, pub vault: Pubkey, pub status: u8}
#[event]
pub struct PaymentDecided {pub request: Pubkey, pub agent: Pubkey, pub status: u8, pub reason: u8}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn policy_applies_at_istanbul_midnight_and_preserves_total_spend() {
        let recipient = Pubkey::new_unique();
        let vault = Vault {
            owner: Pubkey::new_unique(),
            mint: Pubkey::new_unique(),
            vault_id: 0,
            bump: 0,
            frozen: false,
        };
        // 1970-01-02 00:00 in UTC+03.
        let midnight = 75_600;
        let mut agent = AgentRegistration {
            vault: Pubkey::new_unique(),
            key: Pubkey::new_unique(),
            status: ACTIVE,
            bump: 0,
            epoch: 0,
            last_nonce: 0,
            day: 0,
            daily_spent: 18,
            total_spent: 28,
            violations: 0,
            policy: Policy {
                daily_limit: 20,
                max_transfer: 10,
                total_limit: 35,
                allowlist: vec![recipient],
                denylist: vec![],
            },
        };
        let expires = midnight + 60;
        assert_eq!(decision(&mut agent, &vault, 3, recipient, expires, midnight - 1, 100, true), (REJECTED, 7));
        assert_eq!(decision(&mut agent, &vault, 8, recipient, expires, midnight, 100, true), (REJECTED, 8));
        assert_eq!(agent.day, 1);
        assert_eq!(agent.daily_spent, 0);
        assert_eq!(agent.total_spent, 28);
        assert_eq!(decision(&mut agent, &vault, 11, recipient, expires, midnight, 100, true), (REJECTED, 6));
        assert_eq!(decision(&mut agent, &vault, 7, recipient, expires, midnight, 100, false), (PAID, 0));
        assert_eq!(decision(&mut agent, &vault, 7, recipient, expires, expires, 100, true), (EXPIRED, 1));
    }
}

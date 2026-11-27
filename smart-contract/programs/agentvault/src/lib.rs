use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::{self, Mint, Token, TokenAccount, TransferChecked}};

// Placeholder only. Generate your own program keypair and run anchor keys sync.
declare_id!("5LBuCjjptnCXq4SeQx9kovj9r12WZHs5GqsaELTzSyZB");
// Circle Devnet mint: 4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU
const USDC_DEVNET: Pubkey = Pubkey::new_from_array([59, 68, 44, 179, 145, 33, 87, 241, 58, 147, 61, 1, 52, 40, 45, 3, 43, 95, 254, 205, 1, 162, 219, 241, 183, 121, 6, 8, 223, 0, 46, 167]);

#[program]
pub mod agentvault {
    use super::*;
    pub fn initialize_vault(ctx: Context<InitializeVault>, vault_id: u64) -> Result<()> {
        let v = &mut ctx.accounts.vault;
        v.owner = ctx.accounts.owner.key();
        v.mint = ctx.accounts.mint.key();
        v.vault_id = vault_id;
        v.bump = ctx.bumps.vault;
        v.frozen = false;
        emit!(VaultCreated { vault: v.key(), owner: v.owner, vault_id });
        Ok(())
    }
    pub fn deposit(ctx: Context<OwnerTransfer>, amount: u64) -> Result<()> {
        require!(amount > 0, VaultError::ZeroAmount);
        let a = &ctx.accounts;
        token::transfer_checked(CpiContext::new(a.token_program.to_account_info(), TransferChecked {
            from: a.owner_token.to_account_info(), mint: a.mint.to_account_info(),
            to: a.vault_token.to_account_info(), authority: a.owner.to_account_info(),
        }), amount, 6)?;
        emit!(VaultMovement { vault: a.vault.key(), owner: a.owner.key(), amount, withdrawal: false });
        Ok(())
    }
    pub fn withdraw(ctx: Context<OwnerTransfer>, amount: u64) -> Result<()> {
        let a = &ctx.accounts;
        require!(!a.vault.frozen, VaultError::Frozen);
        require!(amount > 0, VaultError::ZeroAmount);
        require!(amount <= a.vault_token.amount, VaultError::InsufficientBalance);
        let id_bytes = a.vault.vault_id.to_le_bytes();
        let bump = [a.vault.bump];
        let seeds: &[&[u8]] = &[b"vault", a.vault.owner.as_ref(), &id_bytes, &bump];
        let signers = [seeds];
        token::transfer_checked(CpiContext::new_with_signer(a.token_program.to_account_info(), TransferChecked {
            from: a.vault_token.to_account_info(), mint: a.mint.to_account_info(),
            to: a.owner_token.to_account_info(), authority: a.vault.to_account_info(),
        }, &signers), amount, 6)?;
        emit!(VaultMovement { vault: a.vault.key(), owner: a.owner.key(), amount, withdrawal: true });
        Ok(())
    }
    pub fn set_frozen(ctx: Context<SetFrozen>, frozen: bool) -> Result<()> {
        ctx.accounts.vault.frozen = frozen;
        emit!(VaultFreezeChanged { vault: ctx.accounts.vault.key(), owner: ctx.accounts.owner.key(), frozen });
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct Vault {
    pub owner: Pubkey,
    pub mint: Pubkey,
    pub vault_id: u64,
    pub bump: u8,
    pub frozen: bool,
}

#[derive(Accounts)]
#[instruction(vault_id: u64)]
pub struct InitializeVault<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(address = USDC_DEVNET @ VaultError::WrongMint, constraint = mint.decimals == 6 @ VaultError::WrongMint)]
    pub mint: Account<'info, Mint>,
    #[account(init, payer = owner, space = 8 + Vault::INIT_SPACE,
        seeds = [b"vault", owner.key().as_ref(), &vault_id.to_le_bytes()], bump)]
    pub vault: Account<'info, Vault>,
    #[account(init_if_needed, payer = owner, associated_token::mint = mint, associated_token::authority = vault)]
    pub vault_token: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct OwnerTransfer<'info> {
    pub owner: Signer<'info>,
    #[account(seeds = [b"vault", owner.key().as_ref(), &vault.vault_id.to_le_bytes()], bump = vault.bump,
        has_one = owner @ VaultError::Unauthorized, has_one = mint @ VaultError::WrongMint)]
    pub vault: Account<'info, Vault>,
    #[account(address = USDC_DEVNET @ VaultError::WrongMint, constraint = mint.decimals == 6 @ VaultError::WrongMint)]
    pub mint: Account<'info, Mint>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = vault)]
    pub vault_token: Account<'info, TokenAccount>,
    #[account(mut, associated_token::mint = mint, associated_token::authority = owner)]
    pub owner_token: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct SetFrozen<'info> {
    pub owner: Signer<'info>,
    #[account(mut, seeds = [b"vault", owner.key().as_ref(), &vault.vault_id.to_le_bytes()], bump = vault.bump,
        has_one = owner @ VaultError::Unauthorized)]
    pub vault: Account<'info, Vault>,
}

#[event]
pub struct VaultCreated { pub vault: Pubkey, pub owner: Pubkey, pub vault_id: u64 }
#[event]
pub struct VaultMovement { pub vault: Pubkey, pub owner: Pubkey, pub amount: u64, pub withdrawal: bool }
#[event]
pub struct VaultFreezeChanged { pub vault: Pubkey, pub owner: Pubkey, pub frozen: bool }
#[error_code]
pub enum VaultError {
    #[msg("Only the vault owner is authorized.")] Unauthorized,
    #[msg("Only the configured Devnet USDC mint is supported.")] WrongMint,
    #[msg("Amount must be positive.")] ZeroAmount,
    #[msg("Vault withdrawals are frozen.")] Frozen,
    #[msg("Insufficient vault balance.")] InsufficientBalance,
}

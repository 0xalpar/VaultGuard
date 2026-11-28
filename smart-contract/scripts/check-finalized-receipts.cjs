const {createHash} = require('node:crypto');
const {AnchorProvider, Program} = require('@coral-xyz/anchor');

async function main() {
  const provider = AnchorProvider.env();
  const connection = provider.connection;
  const host = new URL(connection.rpcEndpoint).hostname;
  if (!['127.0.0.1','localhost','[::1]'].includes(host)) throw Error('Local validator required');

  if (process.argv.includes('--wait-finalized')) {
    const target = await connection.getSlot('confirmed');
    for (let attempts = 0; await connection.getSlot('finalized') < target; attempts++) {
      if (attempts >= 75) throw Error('Timed out waiting for finality');
      await new Promise(resolve => setTimeout(resolve,1000));
    }
  }
  const program = new Program(require('../target/idl/agentvault.json'),provider);
  const finalized = {commitment:'finalized'};
  const agents = await connection.getProgramAccounts(program.programId,{
    ...finalized, filters:[{memcmp:program.coder.accounts.memcmp('agentRegistration')}],
  });
  const payments = await connection.getProgramAccounts(program.programId,{
    ...finalized, filters:[{memcmp:program.coder.accounts.memcmp('paymentRequest')}],
  });
  if (!agents.length || !payments.length) throw Error('No finalized agent and payment data found');

  const hash = createHash('sha256');
  for (const {pubkey, account} of [...agents,...payments].sort((a,b)=>a.pubkey.toBase58().localeCompare(b.pubkey.toBase58()))) {
    hash.update(pubkey.toBuffer());
    hash.update(account.data);
  }
  console.log(JSON.stringify({agents:agents.length,payments:payments.length,hash:hash.digest('hex')}));
}

main().catch(error=>{console.error(error.message);process.exitCode=1});

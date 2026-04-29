const { fetchTokenData } = require('../services/contractService');

/**
 * GET /api/sanApiTest
 * Fetches ERC20 token data using env-configured contract and wallet.
 */
async function getTokenData(req, res) {
  const { RPC_URL, TOKEN_ADDRESS, WALLET_ADDRESS } = process.env;

  if (!RPC_URL || !TOKEN_ADDRESS || !WALLET_ADDRESS) {
    return res.status(500).json({
      success: false,
      error: 'Missing required environment variables: RPC_URL, TOKEN_ADDRESS, WALLET_ADDRESS',
    });
  }

  try {
    const data = await fetchTokenData(RPC_URL, TOKEN_ADDRESS, WALLET_ADDRESS);

    console.log('\n===== [sanApiTest] ERC20 Token Data =====');
    console.log(`  Token        : ${data.token}`);
    console.log(`  Name         : ${data.name}`);
    console.log(`  Decimals     : ${data.decimals}`);
    console.log(`  Total Supply : ${data.totalSupply} ${data.token}`);
    console.log(`  Wallet       : ${data.walletQueried}`);
    console.log(`  Balance      : ${data.balance} ${data.token}`);
    console.log('==========================================\n');

    res.json({ success: true, data });
  } catch (err) {
    console.error('[sanApiTest] Failed to fetch token data:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { getTokenData };

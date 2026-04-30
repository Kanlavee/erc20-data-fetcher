const { ethers } = require('ethers');

// Minimal ABI — only the functions we actually call
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
];

/**
 * Fetches ERC20 token metadata and the balance of a given wallet.
 *
 * @param {string} rpcUrl       - JSON-RPC endpoint URL
 * @param {string} tokenAddress - ERC20 contract address
 * @param {string} walletAddress - Wallet address to query balance for
 * @returns {Promise<Object>}   - Formatted token data
 */
async function fetchTokenData(rpcUrl, tokenAddress, walletAddress) {
  // Use a FetchRequest with a short timeout to avoid stale keep-alive hangs
  const connection = new ethers.FetchRequest(rpcUrl);
  connection.timeout = 15000;

  const provider = new ethers.JsonRpcProvider(connection);
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  const [name, symbol, decimals, totalSupplyRaw, balanceRaw] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply(),
    contract.balanceOf(walletAddress),
  ]);

  return {
    token: symbol,
    name,
    decimals: Number(decimals),
    address: tokenAddress,
    walletQueried: walletAddress,
    totalSupply: ethers.formatUnits(totalSupplyRaw, decimals),
    balance: ethers.formatUnits(balanceRaw, decimals),
    date: new Date().toISOString(),
  };
}

module.exports = { fetchTokenData };

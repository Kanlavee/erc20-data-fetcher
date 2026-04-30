# ERC20 Data Fetcher

A clean Node.js + Express REST API that reads live data from any ERC20 token contract on Ethereum using [ethers.js](https://docs.ethers.org/).

Defaults to **USDT (Tether)** on Ethereum mainnet — fully configurable via environment variables.

---

## 📁 Project Structure

```
src/
├── index.js                        # Express app setup, middleware, route mounting
├── controllers/
│   └── apiController.js            # Request handler — logs result, returns JSON
├── services/
│   └── contractService.js          # Blockchain logic — ethers.js provider & contract calls
├── routes/
│   └── sanApiTest.js               # Route definition for GET /api/sanApiTest
├── contract/
│   └── ERC20_ABI.json              # Full USDT ABI (reference)
└── config/
    └── constant.js                 # RPC URL constants (legacy reference)
.env.example                        # Environment variable template
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable         | Description                              | Default                                        |
|------------------|------------------------------------------|------------------------------------------------|
| `PORT`           | Port the server listens on               | `3001`                                         |
| `RPC_URL`        | Ethereum JSON-RPC endpoint               | `https://1rpc.io/eth`              |
| `TOKEN_ADDRESS`  | ERC20 contract address to query          | `0xdAC17F958D2ee523a2206206994597C13D831ec7`   |
| `WALLET_ADDRESS` | Wallet address to check balance for      | `0xF977814e90dA44bFA03b6295A0616a897441aceC`   |

> **No API key required** — `ethereum.publicnode.com` is a free public RPC.  
> Swap in your own Infura/Alchemy URL for production use.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Kanlavee/erc20-data-fetcher.git
cd erc20-data-fetcher

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start the development server , Response from GET /api/sanApiTest will show
npm run dev
```


---

## 🔗 How to Call the API

Once the server is running, use any of the following methods to call `GET /api/sanApiTest`:

### curl
```bash
curl http://localhost:3001/api/sanApiTest
```

### JavaScript (axios)
```js
const { data } = await axios.get('http://localhost:3001/api/sanApiTest');
console.log(data);
```

---

## 📦 API Response

### `GET /api/sanApiTest`

Fetches token metadata and wallet balance from the configured ERC20 contract.

**Success (200)**
```json
{
  "success": true,
  "data": {
    "token": "USDT",
    "name": "Tether USD",
    "decimals": 6,
    "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "walletQueried": "0xF977814e90dA44bFA03b6295A0616a897441aceC",
    "totalSupply": "99082909926.966243",
    "balance": "68488985.045208"
  }
}
```

**Error (500)**
```json
{
  "success": false,
  "error": "could not detect network"
}
```

### Server Console Output
```
===== [sanApiTest] ERC20 Token Data =====
  Token        : USDT
  Name         : Tether USD
  Decimals     : 6
  Total Supply : 99082909926.966243 USDT
  Wallet       : 0xB203E1170a30E68DC5b20aAC08AA42619842C79E
  Balance      : 68488985.045208 USDT
==========================================
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js + Express | HTTP server |
| ethers.js v6 | Ethereum contract interaction |
| dotenv | Environment variable loading |
| morgan | HTTP request logging |
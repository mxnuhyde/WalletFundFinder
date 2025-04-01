# Wallet Fund Finder

This script is designed to generate random Ethereum, Binance Smart Chain (BSC), and Polygon (Matic) wallet addresses based on a custom wordlist. It checks for balances on the specified networks and logs wallets that contain funds.

## Features

- **Mnemonic Generation**: Generates random 12-word mnemonics using a custom wordlist.
- **Wallet Derivation**: Derives Ethereum, BSC, and Polygon addresses from the generated mnemonic using HD wallets.
- **Balance Checking**: Checks the balance of the generated wallet on Ethereum, Binance Smart Chain, and Polygon networks.
- **Logging**: Logs found wallets with a positive balance to a file and outputs details to the console.
- **Supported Networks**: Ethereum, Binance Smart Chain, Polygon.

## Installation

1. Clone this repository:
```bash
git clone [https://github.com/yourusername/Wallet-Fund-Finder.git](https://github.com/mxnuhyde/WalletFundFinder.git)
```
2. Navigate to the repository directory:
```bash
cd Wallet-Fund-Finder
```
3. Install the required dependencies:
```bash
npm install
```

## Usage
To run the script, simply execute it with Node.js:

```bash
node index.js
```
The script will continuously generate random wallet mnemonics, derive addresses, check their balances across the Ethereum, Binance Smart Chain, and Polygon networks, and log wallets with a positive balance to a file `wallets_with_balance.txt`.


## Configuration
- **API Keys**: Make sure to replace the API keys for Ethereum, Binance Smart Chain, and Polygon with your own. You can obtain these from the respective block explorer websites (e.g., Etherscan, BSCScan, PolygonScan).

- **Custom Wordlist**: Modify the customWordlist array in the code to use your own list of words for mnemonic generation.


## Output
The script will output the following to the console and save relevant information to `wallets_with_balance.txt`:

- Mnemonic
- Wallet address
- Balance in ETH, BNB, or MATIC
- Total count of wallets found with funds

### Example Console Output:
```bash
Inspection: 1
Mnemonic: ability alarm submit abstract emerge strategy clutch ticket mule patch narrow idle
Address: 0x1234567890abcdef1234567890abcdef12345678
Balance: 10.0 ETH
Wallets with funds found: 1
--------------------------
```

## Requirements
- Node.js (v14.x or later)
- npm


## License
This project is licensed under the MIT License - see the LICENSE file for details.


## Disclaimer
This script is for educational purposes only. It is not intended for any malicious activity. Always ensure compliance with relevant laws and guidelines when using this code.

## Author
mxnuhyde

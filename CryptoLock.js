const fs = require('fs');
const { ethers } = require('ethers');
const bip39 = require('bip39');
const fetch = require('node-fetch');

(async () => {
  const chalk = (await import('chalk')).default;

  const settings_eth = {
    apiKey: "UWDJSIAVGY1HVSMHCMHG17GBYJ4VGXIF4G",
    network: 'https://api.etherscan.io',
  };

  const settings_bsc = {
    apiKey: "G8QYH4BRYYTZUNFBIICHP85HGCG1N5CK2B",
    network: 'https://api.bscscan.com',
  };

  const settings_matic = {
    apiKey: "VWMDKKBPBSK7GYMTXY8BUUNWS1KCB9W27H",
    network: 'https://api.polygonscan.com',
  };

  const customWordlist = ['ability', 'alarm', 'submit', 'abstract', 'emerge', 'strategy', 'clutch', 'ticket', 'mule', 'patch', 'narrow', 'idle'];

  const numWordsInMnemonic = 12;

  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function generateRandomMnemonic(wordlist, numWords) {
    const usedWords = new Set();
    const mnemonicWords = [];

    while (mnemonicWords.length < numWords) {
      const randomWord = getRandomElement(wordlist);
      if (!usedWords.has(randomWord)) {
        mnemonicWords.push(randomWord);
        usedWords.add(randomWord);
      }
    }

    return mnemonicWords.join(' ');
  }

  let counter = 1;
  let foundCount = 0;

  const usedMnemonicsFile = 'used_mnemonics.txt';

  function loadUsedMnemonicsFromFile() {
    try {
      const data = fs.readFileSync(usedMnemonicsFile, 'utf8');
      return new Set(data.split('\n'));
    } catch (err) {
      return new Set();
    }
  }

  const usedMnemonics = loadUsedMnemonicsFromFile();

  function saveUsedMnemonicsToFile() {
    fs.writeFileSync(usedMnemonicsFile, Array.from(usedMnemonics).join('\n'));
  }

  async function generateAddressesWithFundsFromWordlist() {
    while (true) {
      const mnemonic = generateRandomMnemonic(customWordlist, numWordsInMnemonic);

      if (usedMnemonics.has(mnemonic)) {
        continue;
      }

      usedMnemonics.add(mnemonic);
      saveUsedMnemonicsToFile();

      const seed = await bip39.mnemonicToSeed(mnemonic);
      const hdNode = ethers.utils.HDNode.fromSeed(seed);
      const wallet = new ethers.Wallet(hdNode.derivePath("m/44'/60'/0'/0/0"));

      const response_eth = await fetch(`${settings_eth.network}/api?module=account&action=balance&address=${wallet.address}&tag=latest&apikey=${settings_eth.apiKey}`);
      const data_eth = await response_eth.json();
      const balance_eth = ethers.BigNumber.from(data_eth.result);

      const response_bsc = await fetch(`${settings_bsc.network}/api?module=account&action=balance&address=${wallet.address}&apikey=${settings_bsc.apiKey}`);
      const data_bsc = await response_bsc.json();
      const balance_bsc = ethers.BigNumber.from(data_bsc.result);

      const response_matic = await fetch(`${settings_matic.network}/api?module=account&action=balance&address=${wallet.address}&apikey=${settings_matic.apiKey}`);
      const data_matic = await response_matic.json();
      const balance_matic = ethers.BigNumber.from(data_matic.result);

      if (balance_eth.gt(0)) {
        foundCount++;
        const log = `Mnemonic: ${mnemonic}\nIndirizzo: ${wallet.address}\nSaldo: ${balance_eth.toString()}\n--------------------------\n`;
        fs.appendFileSync('wallets_with_balance.txt', log);
        console.log(`Inspection: ${counter}`);
        console.log(`Mnemonic: ${mnemonic}`);
        console.log(`Indirizzo: ${wallet.address}`);
        console.log(`Saldo: ${balance_eth.toString()} ETH`);
        console.log(`Wallet con saldo trovati: ${foundCount}`);
        console.log('--------------------------');
      }
  
      if (balance_bsc > 0) {
        foundCount++;
        const log = `Mnemonic: ${mnemonic}\nIndirizzo: ${wallet.address}\nSaldo: ${balance_bsc.toString()}\n--------------------------\n`;
        fs.appendFileSync('wallets_with_balance.txt', log);
        console.log(`Inspection: ${counter}`);
        console.log(`Mnemonic: ${mnemonic}`);
        console.log(`Indirizzo: ${wallet.address}`);
        console.log(`Saldo: ${balance_bsc.toString()} BNB`);
        console.log(`Wallet con saldo trovati: ${foundCount}`);
        console.log('--------------------------');
      }
  
      if (balance_matic > 0) {
        foundCount++;
        const log = `Mnemonic: ${mnemonic}\nIndirizzo: ${wallet.address}\nSaldo: ${balance_matic.toString()}\n--------------------------\n`;
        fs.appendFileSync('wallets_with_balance.txt', log);
        console.log(`Inspection: ${counter}`);
        console.log(`Mnemonic: ${mnemonic}`);
        console.log(`Indirizzo: ${wallet.address}`);
        console.log(`Saldo: ${balance_matic.toString()} MATIC`);
        console.log(`Wallet con saldo trovati: ${foundCount}`);
        console.log('--------------------------');
      }

      console.log(`Inspection: ${counter}`);
      console.log(`Mnemonic: ${mnemonic}`);
      console.log(`Indirizzo: ${wallet.address}`);
      console.log('Saldo: 0');
      console.log(`Wallet con saldo trovati: ${foundCount}`);
      console.log('--------------------------');

      counter++;
    }
  }

  generateAddressesWithFundsFromWordlist();
})();

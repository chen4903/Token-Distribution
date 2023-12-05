require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent('http://127.0.0.1:7890'); 
setGlobalDispatcher(proxyAgent);

const bnbtest = process.env.bnbtest;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.20",
  networks: {
    bnbtest: {
      url: bnbtest,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};
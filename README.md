# Brief

This is a simple token distribution project: users transfer ERC20 to the contract, and then the contract distributes tokens to other addresses

# Usage

attention:

- [Can not use ^0.8.20 compilier version](https://github.com/bnb-chain/bsc/issues/1926)
- Due to delayed on chain transaction confirmation, the script(`test_in_bnb_testnetwork.js`) may not be successful at one time

## local

To init the project and test the project in local:

1. `npm i -D`
2. `npx hardhat test`

## test network

Deploy the contracts:`npx hardhat run .\scripts\deploy.js --network bnbtest`

Verify the contracts:

> Replace the content in ${} with the address you actually deployed

- `npx hardhat verify  --contract contracts/Distribute.sol:Distribute --network bnbtest ${Distribute in .env}`
- `npx hardhat verify  --contract contracts/test-usdt.sol:USDT --network bnbtest ${USDT in .env}`

Test on chain: `npx hardhat run .\scripts\test_in_bnb_testnetwork.js --network bnbtest`
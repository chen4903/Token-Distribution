# Brief

This is a simple token distribution project: users transfer ERC20 to the contract, and then the contract distributes tokens to other addresses

# Usage

## local

To init the project and test the project in local:

1. `npm i -D`
2. `npx hardhat test`

## test network

Deploy and verify the Distribute contract: 

1.`npx hardhat run .\scripts\deploy_Distribute.js --network bnbtest`

2.`npx hardhat verify  --contract contracts/Distribute.sol:Distribute --network bnbtest ${Distribute}`

Deploy and verify the test-usdt contract:

1.`npx hardhat run .\scripts\deploy_test-usdt.js --network bnbtest`

2.`npx hardhat verify  --contract contracts/test-usdt.sol:USDT --network bnbtest ${USDT}`

Test on chain: `npx hardhat run .\scripts\test_in_bnb_testnetwork.js --network bnbtest`


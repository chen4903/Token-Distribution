module.exports.DistributeABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "_erc20",
          "type": "address"
        }
      ],
      "name": "distributeAnyERC20",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "distributeInfo",
      "outputs": [
        {
          "internalType": "address",
          "name": "receiveAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "ratio",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pendingOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "receiveOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[5]",
          "name": "_receiveAddresses",
          "type": "address[5]"
        },
        {
          "internalType": "uint256[5]",
          "name": "_ratio",
          "type": "uint256[5]"
        }
      ],
      "name": "setDistributeInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
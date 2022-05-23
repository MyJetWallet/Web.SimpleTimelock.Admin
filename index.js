// Source code to interact with smart contract
//const { lib: Web3} = require('web3');
var account;
var contract;
// web3 provider with fallback for old version
window.addEventListener('load', async () => {
  // New web3 provider
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    console.log(window.web3);
    try {
      // ask user for permission
      await ethereum.enable();
      // user approved permission
    } catch (error) {
      // user rejected permission
      console.log('user rejected permission');
    }
  }
  // Old web3 provider
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // no need to ask for permission
  }
  // No web3 provider
  else {
    console.log('No web3 provider detected');
  }

  // contractAddress and abi are setted after contract deploy
  var contractAddress = '0x17D87a9B6b8ec5df93fE4229dA8f727411e9F5ea';
  var abi = [
    {
      "inputs": [
        {
          "internalType": "contract IERC20",
          "name": "token_",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "beneficiaryAddress_",
          "type": "address"
        }
      ],
      "name": "beneficiaryRecord",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "lastUnlockTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "tokenAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "releaseTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unlockInterval",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unlockAmount",
              "type": "uint256"
            }
          ],
          "internalType": "struct SimpleTimelock.BeneficiaryRecord",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "beneficiaryAddress_",
          "type": "address"
        }
      ],
      "name": "expectedRelease",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "lockedTokens",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "release",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "beneficiaryAddress_",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenAmount_",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "releaseTime_",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "unlockInterval_",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "unlockAmount_",
          "type": "uint256"
        }
      ],
      "name": "setBeneficiary",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  contract = new web3.eth.Contract(abi, contractAddress);

  web3.eth.getAccounts(function (err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });

});

//Smart contract functions
function setBeneficiary() {
  var BN = web3.utils.BN;
  const userAddress = document.getElementById('userAddress').value;
  const tokenAmount = document.getElementById('tokenAmount').value;
  const releaseTime = document.getElementById('releaseTime').value;
  const unlockInterval = document.getElementById('unlockInterval').value;
  const unlockAmount = document.getElementById('unlockAmount').value;

  const ta = new BN(tokenAmount);
  const rt = new BN(releaseTime);
  const ui = new BN(unlockInterval);
  const ua = new BN(unlockAmount);
  console.log({ userAddress, ta, rt, ui, ua });

  contract.methods.setBeneficiary(userAddress, ta, rt, ui, ua).send({ from: account }).then(function (tx) {
    console.log("Transaction: ", tx);
    document.getElementById('transaction').innerHTML = tx;
  });
}


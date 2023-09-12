require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    mainnet: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/' + process.env.ALCHEMYAPI_ID_MAINNET,
      accounts: [process.env.PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
      // blockNumber: 1908405
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/' + process.env.ALCHEMYAPI_ID_SEPOLIA,
      accounts: [process.env.PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
      // blockNumber: 1908405
    },
    selfhost: {
      url: "http://1.15.39.10:8545",
      accounts: [process.env.PRIVATE_KEY],
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.19",        
      },
    ],
  }, 

  paths: {
    sources: "./contracts",
    tests: "./test", 
    cache: "./cache", 
    artifacts: "./artifacts"
  },

  mocha: {
    timeout: 2000000
  }
};
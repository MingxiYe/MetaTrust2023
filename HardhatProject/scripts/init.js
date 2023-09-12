const { ethers } = require("hardhat");
const { expect } = require("chai");

async function main(){
    let provider = ethers.provider;
    let attacker = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    console.log(await attacker.getAddress());
    console.log(await provider.getBlockNumber());
    console.log(await provider.getBalance(await attacker.getAddress()));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1)
    });
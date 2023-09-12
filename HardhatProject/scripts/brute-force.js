const { ethers } = require("hardhat");
const { expect } = require("chai");

async function main(){
    let provider = ethers.provider;
    let attacker = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // randomly generate attacker's private key or use the pre-calcualted one
    while(attacker.address.substring(40,42).toLowerCase() != "c4"){
        attacker = ethers.Wallet.createRandom();
    }
    console.log(attacker.privateKey);
    console.log(await attacker.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1)
    });
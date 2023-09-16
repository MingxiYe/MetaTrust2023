const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {

    
    let [deployer, user] = await ethers.getSigners();
    const provider = ethers.provider
    const BytecodeVault = await ethers.getContractFactory("BytecodeVault", deployer);
    const bytecodeVault = await BytecodeVault.deploy({"value":ethers.utils.parseEther("1")});

    const AttackByteVault = await ethers.getContractFactory("AttackByteVault", user);
    const attackByteVault = await AttackByteVault.deploy(bytecodeVault.address);
    console.log("isSolved", await bytecodeVault.isSolved())
    await attackByteVault.attack();
    console.log("isSolved", await bytecodeVault.isSolved())

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
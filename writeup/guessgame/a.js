// [+] contract address: 0xD6Ac884cCb0F3Fdc0A9d14c480FaC43E6b9E1104
// [+] transaction hash: 0x693136163db3866203c27a3737ede8071e20f70d0ed620066030f2f955495a6b
// [+] deployer account: 0xa1fE1373fFC93bAbAcBf483E37815204341291d1
const { ethers } = require("hardhat");
const { expect } = require("chai");

const setupABI = require("./../abi/setup.json");
const guessGameABI = require("./../abi/guessGame.json");

async function main(){
    let provider = ethers.provider;
    let attacker = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


    const [owner] = await ethers.getSigners();

    console.log(await provider.getBalance(await attacker.getAddress()));
    await owner.sendTransaction({
        to: attacker.address,
        value: "2000000000000000"
    });
    console.log(await provider.getBalance(await attacker.getAddress()));


    const setup = new ethers.Contract(
        "0xD6Ac884cCb0F3Fdc0A9d14c480FaC43E6b9E1104",
        setupABI,
        provider
    );

    // console.log("A: ", await setup.connect(attacker).a());
    // console.log("guessGame: ", await setup.connect(attacker).guessGame());
    // A:  0x0A4C61EADA2F7b25313bb11a08a6Cb220c939092
    // guessGame:  0xF531c935414250a0bad1075B1E799832a78A3A66

    const guessGame = new ethers.Contract(
        "0xF531c935414250a0bad1075B1E799832a78A3A66",
        guessGameABI,
        provider
    );
    
    // GuessGame Storage
    // uint256 private immutable random01;//1
    // uint256 private immutable random02;//2
    // uint256 private immutable random03;//32

    await guessGame.connect(attacker).guess(96, 79, 2, 10,{value:1});
    console.log(await guessGame.isSolved());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
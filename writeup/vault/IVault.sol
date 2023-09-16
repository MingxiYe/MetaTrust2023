pragma solidity ^0.8.0;

abstract contract IVault {
    mapping(address => uint256) public deposits;
    function createMyNode(uint256 _nodeId, uint256 _rewardRateBase, uint256 _rewardFactor) external {}

    function purchaseForOwner() external {}

    function depositOnce(uint256 _nodeId) payable external {}

    function emergencyWithdraw(uint256 _nodeId) external {}
}
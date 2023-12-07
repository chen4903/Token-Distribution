// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// 需求: 
// A地址转账ERC20到合约地址，合约自动按照比例把余额转到A1、A2、A3、A4、A5个地址，
// 并且比例和A1-A5都可以修改

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Distribute{
    using SafeERC20 for IERC20; // to support USDT that not the standard ERC20

    address public owner;
    address public pendingOwner;
    uint256 private constant FACTOR = 100000;

    struct receiverInfo{
        address receiveAddress;
        uint256 ratio;
    }

    // 序号 => receiverInfo
    mapping(uint256 => receiverInfo) public distributeInfo;

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function transferOwner(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "owner can not be address(0)");
        pendingOwner = _newOwner;
    }

    function receiveOwner() external {
        require(msg.sender == pendingOwner, "you are not the pendingOwner");
        owner = msg.sender;
        pendingOwner = address(0);
    }

    function setDistributeInfo(
        address[5] memory _receiveAddresses,
        uint256[5] memory _ratio
    ) external onlyOwner {
        for(uint256 i = 0; i < 5; i++) {
            distributeInfo[i].receiveAddress = _receiveAddresses[i];
            distributeInfo[i].ratio = _ratio[i];
        }
    }

    function distributeAnyERC20(IERC20 _erc20) external onlyOwner{
        uint256 denominator;
        for(uint256 i = 0; i < 5; i++) {
            denominator += distributeInfo[i].ratio;
        }

        uint256 totalBalance = _erc20.balanceOf(address(this));
        for(uint256 i = 0; i < 5; i++) {
            _erc20.safeTransfer(
                distributeInfo[i].receiveAddress, 
                (distributeInfo[i].ratio * FACTOR / denominator) * totalBalance / FACTOR
            );
        }
    }

}
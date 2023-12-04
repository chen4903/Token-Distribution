// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// 需求: 
// A地址转账ERC20到合约地址，合约自动按照比例把余额转到A1、A2、A3、A4、A5个地址，
// 并且比例和A1-A5都可以修改

interface IERC20 {
    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

contract Distribute{
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
            _erc20.transfer(
                distributeInfo[i].receiveAddress, 
                (distributeInfo[i].ratio * FACTOR / denominator) * totalBalance / FACTOR
            );
        }
    }

}
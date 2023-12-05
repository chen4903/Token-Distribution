// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDT is ERC20, Ownable {
    constructor()
        ERC20("USDT", "USDT")
        Ownable()
    {
        mint(msg.sender, type(uint256).max);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
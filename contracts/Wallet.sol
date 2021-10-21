//SPDX-License-Identifier: MIT
// Renzo Barrios
// Octuber 2021


pragma solidity ^0.8.0;


import "hardhat/console.sol";

contract Wallet {

    address[] public approvers;
    uint256 public quorum;


    constructor(address[] memory _approvers, uint256  _quorum) public {
        approvers = _approvers;
        quorum = _quorum;

        require((approvers.length / 2) >= quorum);
        console.log("Contract Started");
    }

    function getApprovers() public view returns (address[] memory){
        return approvers;
    }

}

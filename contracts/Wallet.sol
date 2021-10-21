//SPDX-License-Identifier: MIT
// Renzo Barrios
// Octuber 2021
pragma solidity ^0.8.0;


import "hardhat/console.sol";

contract Wallet {

    address[] public approvers;
    uint256 public quorum;

    struct Transfer { 
        uint id;
        uint amount;
        address payable to ;
        uint approvals;
        bool sent;
    }

    Transfer[] public transfers;
    uint nextId;

    constructor(address[] memory _approvers, uint256  _quorum){
        approvers = _approvers;
        quorum = _quorum;

        require((approvers.length / 2) >= quorum);
        console.log("Contract Started");
    }

    function getApprovers() external view returns (address[] memory){
        return approvers;
    }


    function getTransfers() external view returns (Transfer[] memory){
        return transfers;
    }

    function createTransfer(
        uint _amount,
        address payable _to
        ) external payable returns(Transfer memory) {
            

        Transfer memory newTransfer = Transfer({
         id: transfers.length,
         amount:_amount,
         to: _to,
         approvals:0,
         sent:false
        });

        transfers.push(newTransfer);


        return newTransfer;
    }

    

}

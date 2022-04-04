// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    ///structure of related variables, just like obj in js
    struct Course {
        uint256 id; //32
        uint256 price; //32
        bytes32 proof; //can be keccak256 - unique to the user -20
        address owner; //20
        State state; //1
    }
}

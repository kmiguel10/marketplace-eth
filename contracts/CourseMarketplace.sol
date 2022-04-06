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

    //Mapping of the course hash to course data
    mapping(bytes32 => Course) private ownedCourses;

    //mapping of courseId to courseHash
    mapping(uint256 => bytes32) private ownedCourseHash;

    //number of all courses + id of the course
    uint256 private totalOwnedCourses;

    //test
    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        //Construct course hash - will be stored in the mapping
        //Course hash will be a unique value - user won't be able to purchase duplicate courses
        //encodePacked - encodes multiple args
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        uint256 id = totalOwnedCourses++;

        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });

        //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    }

    //Returns number of courses
    function getCourseCount() external view returns (uint256) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint256 index)
        external
        view
        returns (bytes32)
    {
        return ownedCourseHash[index];
    }

    function getCourseByHash(bytes32 courseHash)
        external
        view
        returns (Course memory)
    {
        return ownedCourses[courseHash];
    }
}

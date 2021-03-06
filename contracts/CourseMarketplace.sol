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

    //Owner of the contract - ADMIN
    //Different from owner of the courses
    address payable private owner;

    constructor() {
        setContractOwner(msg.sender);
    }

    //mapping of courseId to courseHash
    mapping(uint256 => bytes32) private ownedCourseHash;

    //number of all courses + id of the course
    uint256 private totalOwnedCourses;

    ///Course has already been purchased!
    error CourseHasOwner();

    ///Course is not created!
    error CourseIsNotCreated();

    ///Course has invalid state!
    error InvalidState();

    ///Only owner has access!
    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _; //body of function
    }

    //test
    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        //Construct course hash - will be stored in the mapping
        //Course hash will be a unique value - user won't be able to purchase duplicate courses
        //encodePacked - encodes multiple args
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender)); // 0x00000000000000000000000000003130

        if (hasCourseOwnership(courseHash)) {
            revert CourseHasOwner();
        }

        uint256 id = totalOwnedCourses++; // 0x0000000000000000000000000000313000000000000000000000000000003130

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

    function activateCourse(bytes32 courseHash) external onlyOwner {
        if (!isCourseCreated(courseHash)) {
            revert CourseIsNotCreated();
        }
        //Access storage
        Course storage course = ownedCourses[courseHash];

        //Course has to be purchased
        if (course.state != State.Purchased) {
            revert InvalidState();
        }
        course.state = State.Activated;
    }

    //Returns true if course is created
    function isCourseCreated(bytes32 courseHash) private view returns (bool) {
        return
            ownedCourses[courseHash].owner !=
            0x0000000000000000000000000000000000000000;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        //Check if the user transfering ownership is the current owner using OnlyOwner modifier
        setContractOwner(newOwner);
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

    function getContractOwner() public view returns (address) {
        return owner;
    }

    //set contract owner
    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    //If the owner of the course has the same address of the sender, then the sender already owns the course
    function hasCourseOwnership(bytes32 courseHash)
        private
        view
        returns (bool)
    {
        return ownedCourses[courseHash].owner == msg.sender;
    }
}

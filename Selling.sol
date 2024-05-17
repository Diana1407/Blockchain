// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract   CourseSelling {
    struct Course {
        address owner;
        string name;
        uint256 price;
    }

    address public admin;
    mapping(address => Course[]) public courses;

    event CourseRegistered(address indexed owner, string name, uint256 price);
    event CoursePurchased(address indexed buyer, address indexed seller, string name);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier Funds(address _seller, uint256 _index) {
       require(msg.value >= courses[_seller][_index].price, "Insufficient funds");
       _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerCourse(string memory _name) external onlyAdmin payable  {
        require(msg.value>0, "Price must be greater than 0");

        courses[msg.sender].push(Course({
            owner:msg.sender,
            name: _name,
            price: msg.value
        }));

        emit CourseRegistered(msg.sender, _name, msg.value);
    }

   function purchaseCourse(address _seller, uint256 _index) external Funds(_seller,_index)  payable {
    require(msg.sender!=_seller,"Buyer!=Owner");
    require(_index < courses[_seller].length, "Course index out of bounds");

    address payable seller = payable(_seller);
    seller.transfer(courses[_seller][_index].price);

    emit CoursePurchased(msg.sender, _seller, courses[_seller][_index].name);

     removeCourse(_seller, _index);
}


    function removeCourse(address _seller, uint256 _index) internal {
    if (_index < courses[_seller].length - 1) {
        // Move the last element to the position of the removed element
        courses[_seller][_index] = courses[_seller][courses[_seller].length - 1];
    }
    // Remove the last element (duplicate)
    courses[_seller].pop();
}

    function getCourseCount(address _owner) external view returns (uint256) {
        return courses[_owner].length;
    }

function getAllCourses(address _owner) external view returns (string memory) {
        Course[] memory _courses = courses[_owner];
        string memory result;

        for (uint i = 0; i < _courses.length; i++) {
            result = string(abi.encodePacked(result, "Course ", uintToString(i), ":\n"));
            result = string(abi.encodePacked(result, "Name: ", _courses[i].name, "\n"));
            result = string(abi.encodePacked(result, "Price: ", uintToString(_courses[i].price), "\n\n"));
        }

        return result;
    }

    
function getAllCourses_normal(address _owner) external view returns (Course[] memory) {
    return courses[_owner];
}

function updateCoursePrice(address _owner, uint256 _index) external payable{
    // Check if the course index is within bounds
    require(_index < courses[_owner].length, "Course index out of bounds");

    // Update the course price
    courses[_owner][_index].price = msg.value;
}





    function uintToString(uint256 v) internal pure returns (string memory) {
        uint256 maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint256 i = 0;
        while (v != 0) {
            uint256 remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i);
        for (uint256 j = 0; j < i; j++) {
            s[j] = reversed[i - j - 1];
        }
        return string(s);
    }

}

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Selling.sol";

contract CourseAdministration {
     struct Course {
        address owner;
        string name;
        uint256 price;
    }
    address public admin;
    CourseSelling public courseSelling;

    event CourseUpdated(address indexed seller, string indexed name, uint256 indexed price);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(address _courseSelling) {
        admin = msg.sender;
        courseSelling = CourseSelling(_courseSelling);
    }


    function setCourseSellingContract(address _courseSelling) external onlyAdmin {
        courseSelling = CourseSelling(_courseSelling);
        
    }


   



   function getTotalCoursePrice() public   onlyAdmin view  returns  (uint256) {
     courseSelling.getAllCourses_normal(admin);
    uint256 total = 0;

    for (uint256 i = 0; i < courseSelling.getAllCourses_normal(admin).length; i++) {
        total += courseSelling.getAllCourses_normal(admin)[i].price;
    }

    return total;// Add admin fee to the total price
   }

   function Max_() public   onlyAdmin view  returns  (uint256) {
     courseSelling.getAllCourses_normal(admin);
    uint256 maxim = 0;

    for (uint256 i = 0; i < courseSelling.getAllCourses_normal(admin).length; i++) {
        if( maxim<courseSelling.getAllCourses_normal(admin)[i].price)
            {maxim=courseSelling.getAllCourses_normal(admin)[i].price;}
    }

    return maxim;// Add admin fee to the total price
   }






    function getCoursePrice(address _owner, uint256 _index) external view returns (uint256) {
        require(_index <courseSelling.getAllCourses_normal(_owner).length, "Course index out of bounds");
        return courseSelling.getAllCourses_normal(admin)[_index].price;
    }
}

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Cert {
    struct Student {
        string  id;
        string name;
        string  courseName;
        string joiningDate;
    }

    Student[] students;

    // mapping(uint => Student) public Students;

    uint numStudents;

    mapping(string => uint) public count;


    function enrollStudent(string memory sid, string memory sname, string memory scourse, string memory jdate) public {
        Student memory s  = Student(sid, sname, scourse, jdate);
        students.push(s);
        numStudents++;
    }

    function getStudentDetails(uint _id) public view returns(string memory, string memory, string memory, string memory) {
        Student[] memory _students = students;
        return (_students[_id].id, _students[_id].name, _students[_id].courseName, _students[_id].joiningDate);
    }

    function getNumStudents() public view returns(uint) {
        return numStudents;
    }

    function upload(string memory _id, string memory _cname) public  {
        count[_id]++;
        if(count[_id] > 1) {
        for(uint i = 0; i< students.length; i++) {
    
            require(keccak256(abi.encodePacked(students[i].id)) != keccak256(abi.encodePacked(_id)) && keccak256(abi.encodePacked(students[i].courseName)) != keccak256(abi.encodePacked(_cname)));
        }
        }
    } 

}
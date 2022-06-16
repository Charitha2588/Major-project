import Web3 from 'web3';
import Cert from '../../build/contracts/Cert.json';

let web3;
let cert;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum
        .enable()
        .then(() => {
          resolve(new Web3(window.ethereum));
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if (typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
      );
    }
    resolve(new Web3('http://localhost:7545'));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(Cert.networks)[0];
  return new web3.eth.Contract(Cert.abi, Cert.networks[deploymentKey].address);
};

let error = 0;

let college = sessionStorage.getItem('currentLoggedInCollege');
console.log(college);
let allColleges = JSON.parse(localStorage.getItem('collegesData'));
console.log(allColleges);
let col = allColleges.find(function (col) {
  return col.username === college;
});

let students = col.students || [];

const enrollForm = document.getElementById('enroll-form');
const studentID = document.getElementById('enroll-id');
const studentName = document.getElementById('enroll-sname');
const courseName = document.getElementById('enroll-cname');
const joiningDate = document.getElementById('enroll-date');

console.log(typeof studentID.value);
console.log(typeof studentName.value);
console.log(typeof courseName.value);
console.log(typeof joiningDate.value);

function setErrorFor(input, message) {
  const inputBox = input.parentElement;
  const small = inputBox.querySelector('small');

  small.innerText = message;
  error++;
  inputBox.className = 'inputBox error';
}

function setSuccessFor(input) {
  const inputBox = input.parentElement;

  inputBox.className = 'inputBox success';
}

const courses = ['B.Tech', 'M.Tech', 'MBA'];

function checkInputs() {
  error = 0;

  const studentIDValue = studentID.value.trim();
  const studentNameValue = studentName.value.trim();
  const courseNameValue = courseName.value.trim();
  const joiningDateValue = joiningDate.value.trim();

  //check ID
  if (studentIDValue === '') {
    setErrorFor(studentID, 'Student ID cannot be empty');
  } else {
    setSuccessFor(studentID);
  }

  //check name
  if (studentNameValue === '') {
    setErrorFor(studentName, 'Student Name cannot be empty');
  } else {
    setSuccessFor(studentName);
  }

  //check course
  if (courseNameValue === '') {
    setErrorFor(courseName, 'Course Name cannot be empty');
  } else if (!courses.includes(courseNameValue)) {
    setErrorFor(courseName, 'Enter a valid course name');
  } else {
    setSuccessFor(courseName);
  }

  //check date
  if (joiningDateValue === '') {
    setErrorFor(joiningDate, 'Joining date cannot be empty');
  } else {
    setSuccessFor(joiningDate);
  }

  return error;
}

const initApp = () => {
  let accounts = [];

  web3.eth.getAccounts().then(_accounts => {
    console.log(_accounts);
    accounts = _accounts;
  });
  enrollForm.addEventListener('submit', e => {
    e.preventDefault();
    const numErrors = checkInputs();
    if (numErrors === 0) {
      console.log('Success');
      let s = Object.create({});
      s.id = studentID.value.trim();
      s.name = studentName.value.trim();
      s.course = courseName.value.trim();
      s.joiningDate = joiningDate.value.trim();
      students.push(s);
      let college = sessionStorage.getItem('currentLoggedInCollege');
      console.log(college);
      // console.log(typeof localStorage.getItem('collegesData'));
      let allColleges = JSON.parse(localStorage.getItem('collegesData'));
      console.log(allColleges);
      let col = allColleges.find(function (col) {
        return col.username === college;
      });
      const index = allColleges.indexOf(col);
      col.students = students;
      allColleges[index] = col;

      localStorage.setItem('collegesData', JSON.stringify(allColleges));
      console.log(JSON.parse(localStorage.getItem('collegesData')));

      console.log(accounts);

      console.log(studentID.value);
      console.log(studentName.value);
      console.log(courseName.value);
      console.log(joiningDate.value);

      cert.methods
        .enrollStudent(
          studentID.value,
          studentName.value,
          courseName.value,
          joiningDate.value
        )
        .send({ from: accounts[0] })
        .then(e => {
          console.log(e);
          console.log(
            `Student ${studentName.value} with id ${studentID.value} enrolled successfully`
          );
        })
        .catch(e => {
          console.log(e);
          console.log('Problem enrolling!!!');
        });
    }
  });
};

// console.log(localStorage.getItem('collegesData');
document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      cert = initContract();
      initApp();
    })
    .catch(e => console.log(e.message));
});

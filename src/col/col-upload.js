import Web3 from 'web3';
import Cert from '../../build/contracts/Cert.json';
import { create } from 'ipfs-http-client';

const client = create('https://ipfs.infura.io:5001/api/v0');

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

const uploadForm = document.getElementById('upload-form');
const studentID = document.getElementById('upload-id');
const certType = document.getElementById('upload-cert-type');
const certFile = document.getElementById('upload-cert');
const issueDate = document.getElementById('upload-date');

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

function checkInputs() {
  error = 0;

  console.log(typeof studentID.value, studentID.value);
  console.log(typeof certType.value, certType.value);
  console.log(typeof certFile.value, certFile.value);
  console.log(typeof issueDate.value, issueDate.value);
  const studentIDValue = studentID.value.trim();
  const certTypeValue = certType.value.trim();
  const certFileValue = certFile.value.trim();
  const issueDateValue = issueDate.value.trim();

  //check ID
  if (studentIDValue === '') {
    setErrorFor(studentID, 'Student ID cannot be empty');
  } else {
    setSuccessFor(studentID);
  }

  //check name
  if (certTypeValue === '') {
    setErrorFor(certType, 'Certificate type cannot be empty');
  } else {
    setSuccessFor(certType);
  }

  //check course
  if (certFileValue === '') {
    setErrorFor(certFile, 'Choose a file');
  } else {
    setSuccessFor(certFile);
  }

  //check date
  if (issueDateValue === '') {
    setErrorFor(issueDate, 'Issue date cannot be empty');
  } else {
    setSuccessFor(issueDate);
  }

  return error;
}

let image;

certFile.addEventListener('change', e => {
  e.preventDefault();
  image = e.target.files[0];
});

const initApp = () => {
  let accounts = [];

  web3.eth.getAccounts().then(_accounts => {
    console.log(_accounts);
    accounts = _accounts;
  });
  uploadForm.addEventListener('submit', e => {
    e.preventDefault();
    const numErrors = checkInputs();
    if (numErrors === 0) {
      console.log('Success');
      cert.methods
        .upload(studentID.value, certType.value)
        .send({ from: accounts[0] })
        .then(async ev => {
          const added = await client.add(image);
          const url = `https://ipfs.infura.io/ipfs/${added.path}`;
          console.log(url);
          let college = sessionStorage.getItem('currentLoggedInCollege');
          console.log(college);
          // console.log(typeof localStorage.getItem('collegesData'));
          let allColleges = JSON.parse(localStorage.getItem('collegesData'));
          console.log(allColleges);
          let col = allColleges.find(function (col) {
            return col.username === college;
          });
          const index = allColleges.indexOf(col);
          // let student = {};
          if (col.students) {
            col.students.forEach(s => {
              console.log(s, s.id, studentID.value);
              if (s.id === studentID.value.trim()) {
                s.certPath = url;
                s.issueDate = issueDate.value;
              }
            });
          }

          allColleges[index] = col;

          localStorage.setItem('collegesData', JSON.stringify(allColleges));
          console.log(JSON.parse(localStorage.getItem('collegesData')));
          console.log('Succesfully uplaoded');
        })
        .catch(e => {
          console.log(e);
          console.log('Problem uploading certificate!!!');
        });
    }
  });
};

console.log(localStorage.getItem('collegesData'));
document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      cert = initContract();
      initApp();
    })
    .catch(e => console.log(e.message));
});

let error = 0;
// let companies = JSON.parse(localStorage.getItem('companiesData'));

const sendForm = document.getElementById('send-form');
const studentID = document.getElementById('stu-id');
const certType = document.getElementById('cert-type');
const colName = document.getElementById('col-name');

let company = sessionStorage.getItem('currentLoggedInCompany');
console.log(company);
// console.log(typeof localStorage.getItem('collegesData'));
let allCompanies = JSON.parse(localStorage.getItem('companiesData'));
console.log(allCompanies);
let com = allCompanies.find(function (com) {
  return com.username === company;
});

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

let colleges = JSON.parse(localStorage.getItem('collegesData'));
console.log(colleges);

const colExist = colName => {
  let flag = false;
  colleges.forEach(col => {
    if (col.name === colName) {
      flag = true;
    }
  });
  console.log(flag);
  return flag;
};

const exist = (sid, cname) => {
  let flag = false;
  let col = colleges.find(function (col) {
    return col.name === cname;
  });

  if (col) {
    col.students.forEach(s => {
      if (s.id === sid) {
        flag = true;
        // student = s;
      }
    });
  }
  console.log(flag);
  return flag;
};

function checkInputs() {
  error = 0;

  const studentIDValue = studentID.value.trim();
  const colNameValue = colName.value.trim();
  const certTypeValue = certType.value.trim();

  //check ID
  if (studentIDValue === '') {
    setErrorFor(studentID, 'Enter id');
  } else if (!exist(studentIDValue, colNameValue)) {
    console.log('err');
    setErrorFor(studentID, 'Enter valid ID');
  } else {
    setSuccessFor(studentID);
  }

  //check name
  if (colNameValue === '') {
    setErrorFor(colName, 'Enter your College Name');
  } else if (!colExist(colNameValue)) {
    setErrorFor(colName, 'College does not exist');
  } else {
    setSuccessFor(colName);
  }

  //check cert type
  if (certTypeValue === '') {
    setErrorFor(certType, 'Choose a file');
  } else {
    setSuccessFor(certType);
  }

  return error;
}

sendForm.addEventListener('submit', e => {
  e.preventDefault();
  const numError = checkInputs();
  if (numError === 0) {
    console.log('success');
    let col = colleges.find(function (col) {
      return col.name === colName.value.trim();
    });

    const indexCol = colleges.indexOf(col);

    console.log(indexCol);
    console.log(col);

    let student = col.students.find(stu => {
      return stu.id === studentID.value;
    });

    let index = col.students.indexOf(student);
    console.log(index);

    console.log(student);
    console.log(com);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    console.log(today);

    student.requests = student.requests || [];
    student.date = today;
    student.requests.push(com.name);
    console.log(student.requests);
    col.students[index] = student;
    console.log(col.students);

    colleges[indexCol] = col;
    localStorage.setItem('collegesData', JSON.stringify(colleges));
    console.log(JSON.parse(localStorage.getItem('collegesData')));
    // window.location = 'student-home.html';
    // console.log(college);
  }
});

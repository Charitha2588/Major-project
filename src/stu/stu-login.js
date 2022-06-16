const form = document.getElementById('form-stu');
const id = document.getElementById('id-stu');
// const colName = document.getElementById('colName-stu');

let error = 0;

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

// const colExist = colName => {
//   let flag = false;
//   colleges.forEach(col => {
//     if(col.name === colName) {
//       flag = true;
//     }
//   });
//   console.log(flag);
//   return flag;
// }

const exist = sid => {
  let flag = false;
  console.log(colleges);
  colleges.forEach(col => {
    if (col.students) {
      col.students.forEach(s => {
        if (s.id === sid) {
          flag = true;
          // student = s;
        }
      });
    }
  });
  console.log(flag);
  return flag;
};

function checkInputs() {
  error = 0;
  const idValue = id.value.trim();
  // const colNameValue = colName.value.trim();

  // //check college name
  // if (colName === '') {
  //   setErrorFor(colName, 'Enter your College Name');
  // } else if(!colExist(colName)) {
  //   setErrorFor(colName, 'College does not exist');
  // } else {
  //   setSuccessFor(colName);
  // }

  //check id
  if (idValue === '') {
    setErrorFor(id, 'Enter id');
  } else if (!exist(idValue)) {
    setErrorFor(id, 'Enter valid ID');
  } else {
    setSuccessFor(id);
  }

  return error;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const numError = checkInputs();
  if (numError === 0) {
    console.log('success');
    sessionStorage.setItem('currentLoggedInStudent', id.value.trim());
    window.location = 'student-home.html';
    // console.log(college);
  }
});

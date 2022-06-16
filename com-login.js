const form = document.getElementById('l-form-com');
const username = document.getElementById('l-username-com');
const password = document.getElementById('l-password-com');

let companies = JSON.parse(localStorage.getItem('companiesData'));
console.log(companies);
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

const userExists = email => {
  let flag = false;
  companies.forEach(com => {
    if (com.username === email) flag = true;
  });
  return flag;
};

const correctPassword = (username, password) => {
  let flag = false;
  companies.forEach(com => {
    if (com.username === username && com.password === password) flag = true;
  });
  return flag;
};

function validate() {
  error = 0;

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  // console.log(passwordValue);
  // console.log(colleges[1].password);
  // console.log(passwordValue === colleges[1].password);
  // colleges.forEach(col => {
  //   console.log(col.password === passwordValue);
  // });

  //check for username

  if (!userExists(usernameValue)) {
    console.log('User does not exists');
    setErrorFor(username, 'Incorrect Username!');
  } else {
    setSuccessFor(username);
  }

  if (!correctPassword(usernameValue, passwordValue)) {
    setErrorFor(password, 'Incorrect Password!');
  } else {
    setSuccessFor(password);
  }
  return error;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const numError = validate();
  if (numError === 0) {
    console.log(username);
    console.log(password);
    console.log('success');
    sessionStorage.setItem('currentLoggedInCompany', username.value.trim());
    window.location = 'company-home.html';
  }
});

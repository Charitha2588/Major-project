const formCom = document.getElementById('form-com');
const comName = document.getElementById('name-com');
const username = document.getElementById('username-com');
const password = document.getElementById('password-com');
// console.log(formCol);

// const c1 = {
//   name: 'Amazon',
//   username: 'amazon@gmail.com',
//   password: 'amazon1234',
// };

// let companies = [];
// companies.push(c1);
// console.log(companies);
// localStorage.setItem('companiesData', JSON.stringify(companies));

const comp = JSON.parse(localStorage.getItem('companiesData'));
// console.log(comp);

let error = 0;

const validateEmail = email => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const isPasswordSecure = password => {
  const re = new RegExp('^.{6,15}$');
  return re.test(password);
};

// const validatePassword = password => {
//   console.log('p');
//   return password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/);
// };

const UserAlreadyExists = email => {
  let flag = false;
  if (comp) {
    comp.forEach(com => {
      if (com.username === email) flag = true;
    });
    return flag;
  }
  return flag;
};

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
  const comNameValue = comName.value.trim();
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  //Validate name
  if (comNameValue === '') {
    setErrorFor(comName, 'College name cannot be empty');
    console.log(error);
  } else {
    setSuccessFor(comName);
  }

  //Validate username
  if (usernameValue === '') {
    setErrorFor(username, 'Username cannot be empty');
  } else if (!validateEmail(usernameValue)) {
    setErrorFor(username, 'Enter a valid email address');
  } else if (UserAlreadyExists(usernameValue)) {
    setErrorFor(username, 'Username already exists');
  } else {
    setSuccessFor(username);
  }

  console.log(isPasswordSecure(passwordValue));
  //Validate password
  if (passwordValue === '') {
    setErrorFor(password, 'Password cannot be empty');
  } else if (!isPasswordSecure(passwordValue)) {
    password.style.marginBottom = '30px';
    setErrorFor(password, 'Password should contain minimum 6 characters');
  } else {
    setSuccessFor(password);
  }
  return error;
}

formCom.addEventListener('submit', e => {
  e.preventDefault();
  const numError = checkInputs();
  if (numError === 0) {
    const com = Object.create({});
    com.name = comName.value.trim();
    com.username = username.value.trim();
    com.password = password.value.trim();
    companies = JSON.parse(localStorage.getItem('companiesData'));
    let empty = [];
    if (!companies)
      localStorage.setItem('companiesData', JSON.stringify(empty));
    else {
      companies.push(com);
      localStorage.setItem('companiesData', JSON.stringify(companies));
    }

    console.log(com);
    const compa = JSON.parse(localStorage.getItem('companiesData'));
    console.log(compa);
    window.location = 'company-login.html';
  }
});

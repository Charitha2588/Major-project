// localStorage.clear();
const formCol = document.getElementById('form-col');
const colName = document.getElementById('name-col');
const username = document.getElementById('username-col');
const password = document.getElementById('password-col');
// console.log(formCol);

// const c1 = {
//   name: 'JNTU',
//   username: 'jntu@gmail.com',
//   password: 'jntu1234',
//   students: [
//     {
//       id: '123',
//       name: 'Preeti',
//       course: 'B.Tech',
//       joiningDate: '2017-06-16',
//       // issueDate: 'NA',
//       // certPath: '#',
//     },
//     {
//       id: '124',
//       name: 'Rohan',
//       course: 'B.Tech',
//       joiningDate: '2017-06-23',
//       // issueDate: 'NA',
//       // certPath: '#',
//     },
//     {
//       id: '321',
//       name: 'Kirti',
//       course: 'MBA',
//       joiningDate: '2019-05-23',
//       // issueDate: 'NA',
//     },
//   ],
// };

// const c2 = {
//   name: 'CMRTC',
//   username: 'cmrtc@gmail.com',
//   password: 'cmrtc1234',
//   students: [
//     {
//       id: '185',
//       name: 'Pooja',
//       course: 'B.Tech',
//       joiningDate: '2017-06-16',
//       // issueDate: 'NA',
//       // certPath: '#',
//     },
//     {
//       id: '217',
//       name: 'Rahul',
//       course: 'B.Tech',
//       joiningDate: '2017-06-23',
//       // issueDate: 'NA',
//       // certPath: '#',
//     },
//     {
//       id: '321',
//       name: 'Shivani',
//       course: 'MBA',
//       joiningDate: '2019-05-23',
//       // issueDate: 'NA',
//       // certPath: '#',
//     },
//     {
//       id: '356',
//       name: 'Rohan',
//       course: 'MBA',
//       joiningDate: '2019-05-26',
//       // issueDate: 'NA',
//       // certPath: '#',
//     },
//   ],
// };

// let colleges = [];
// colleges.push(c1);
// colleges.push(c2);
// console.log(colleges);
// localStorage.setItem('collegesData', JSON.stringify(colleges));

const coll = JSON.parse(localStorage.getItem('collegesData'));
// console.log(coll);

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
  if (coll) {
    coll.forEach(col => {
      if (col.username === email) flag = true;
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
  const colNameValue = colName.value.trim();
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  //Validate name
  if (colNameValue === '') {
    setErrorFor(colName, 'College name cannot be empty');
    console.log(error);
  } else {
    setSuccessFor(colName);
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

formCol.addEventListener('submit', e => {
  e.preventDefault();
  const numError = checkInputs();
  if (numError === 0) {
    const col = Object.create({});
    col.name = colName.value.trim();
    col.username = username.value.trim();
    col.password = password.value.trim();
    colleges = JSON.parse(localStorage.getItem('collegesData'));
    let empty = [];
    if (!colleges) localStorage.setItem('collegesData', JSON.stringify(empty));
    else {
      colleges.push(col);
      localStorage.setItem('collegesData', JSON.stringify(colleges));
    }

    console.log(col);
    const colle = JSON.parse(localStorage.getItem('collegesData'));
    console.log(colle);
    window.location = 'college-login.html';
  }
});

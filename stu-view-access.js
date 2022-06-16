const student = sessionStorage.getItem('currentLoggedInStudent');
console.log(student);

let colleges = JSON.parse(localStorage.getItem('collegesData'));
console.log(colleges);

let stu;
for (let i = 0; i < colleges.length; i++) {
  let findStu;
  if (colleges[i].students) {
    findStu = colleges[i].students.find(stu => {
      // console.log(stu, stu.id, student);
      return stu.id === student;
    });
  }

  if (findStu) {
    // console.log(findStu);
    stu = findStu;
  }
}

console.log(stu);

const table = document.querySelector('#table-body');
const section = document.querySelector('section');
if (stu) {
  let requests = stu.requests;
  console.log(requests);

  if (requests) {
    for (let i = 0; i < requests.length; i++) {
      const requestRow = document.createElement('tr');
      const sno = document.createElement('td');
      const companyName = document.createElement('td');
      const certType = document.createElement('td');
      const requestDate = document.createElement('td');
      const choice = document.createElement('td');

      sno.innerHTML = i + 1;
      companyName.innerHTML = requests[i];
      certType.innerHTML = stu.course;
      requestDate.innerHTML = stu.date;

      const acceptBtn = document.createElement('button');

      // acceptBtn.classList.add(`accept-${name}`);
      acceptBtn.classList.add('accept');
      // acceptBtn.appendChild(tick);
      acceptBtn.innerHTML = 'Accept';
      const rejectBtn = document.createElement('button');
      // const xmark = document.createElement('i');
      // xmark.classList.add('fa-thin');
      // xmark.classList.add('fa-xmark');
      // rejectBtn.appendChild(xmark);
      // rejectBtn.classList.add(`reject-${name}`);
      rejectBtn.classList.add('reject');
      rejectBtn.innerHTML = 'Reject';

      choice.appendChild(acceptBtn);
      choice.appendChild(rejectBtn);

      requestRow.appendChild(sno);
      requestRow.appendChild(companyName);
      requestRow.appendChild(certType);
      requestRow.appendChild(requestDate);
      requestRow.appendChild(choice);
      console.log(requestRow);

      table.appendChild(requestRow);
    }

    const btnA = document.querySelector('.accept');
    const btnR = document.querySelector('.reject');

    if (btnA && btnR) {
      btnA.addEventListener('click', e => {
        e.preventDefault();
        const el = e.target.parentNode.parentNode;
        const childs = el.children;
        console.log(childs);
        const comName = childs[1].innerHTML;
        console.log(comName);
        const companies = JSON.parse(localStorage.getItem('companiesData'));
        companies.forEach(com => {
          if (com.name === comName) {
            if (com.accepts) {
              console.log(com.accepts);
              com.accepts.push(student);
            } else {
              com.accepts = [];
              com.accepts.push(student);
            }
          }
          localStorage.setItem('companiesData', JSON.stringify(companies));
        });
        console.log(companies);
        console.log(el);
        const index = requests.indexOf(comName);
        if (index > -1) {
          requests.splice(index, 1);
        }
        console.log(requests);
        stu.requests = requests;

        for (let i = 0; i < colleges.length; i++) {
          if (colleges[i].students) {
            let findStu = colleges[i].students.find(st => {
              // console.log(stu, stu.id, student);
              return st.id === student;
            });

            if (findStu) {
              // console.log(findStu);
              let index = colleges[i].students.findIndex(st => {
                return st.id === student;
              });
              findStu = stu;
              colleges[i].students[index] = findStu;
            }
          }
        }

        console.log(colleges);
        localStorage.setItem('collegesData', JSON.stringify(colleges));
        const coll = JSON.parse(localStorage.getItem('collegesData'));
        console.log(coll);
        el.remove();
        console.log(colleges);
      });

      btnR.addEventListener('click', e => {
        e.preventDefault();
        const el = e.target.parentNode.parentNode;
        const childs = el.children;
        console.log(childs);
        const comName = childs[1].innerHTML;
        console.log(el);
        const index = requests.indexOf(comName);
        if (index > -1) {
          requests.splice(index, 1);
        }
        console.log(requests);
        stu.requests = requests;
        for (let i = 0; i < colleges.length; i++) {
          if (colleges[i].students) {
            let findStu = colleges[i].students.find(st => {
              // console.log(stu, stu.id, student);
              return st.id === student;
            });

            if (findStu) {
              // console.log(findStu);
              let index = colleges[i].students.findIndex(st => {
                return st.id === student;
              });
              findStu = stu;
              colleges[i].students[index] = findStu;
            }
          }
        }

        console.log(colleges);
        localStorage.setItem('collegesData', JSON.stringify(colleges));
        const coll = JSON.parse(localStorage.getItem('collegesData'));
        console.log(coll);
        el.remove();
        console.log(colleges);
      });
    } else {
      console.log('No students');
      const msg = document.createElement('p');
      msg.classList.add('msg');
      msg.innerHTML = 'No Requests!';
      console.log(msg);
      section.appendChild(msg);
    }
  }
}

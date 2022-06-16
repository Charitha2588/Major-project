const company = sessionStorage.getItem('currentLoggedInCompany');
console.log(company);

let allCompanies = JSON.parse(localStorage.getItem('companiesData'));
let colleges = JSON.parse(localStorage.getItem('collegesData'));
console.log(allCompanies);
let com = allCompanies.find(function (com) {
  return com.username === company;
});
const index = allCompanies.indexOf(com);
console.log(com);
console.log(index);

// let accept = com.accepts;
const set = new Set(com.accepts);
let accept = [...set];
console.log(accept);
const table = document.querySelector('#table-body');
const section = document.querySelector('section');

if (accept) {
  for (let i = 0; i < accept.length; i++) {
    const accepts = document.createElement('tr');
    const collegeName = document.createElement('td');
    const studentID = document.createElement('td');
    const studentName = document.createElement('td');
    const course = document.createElement('td');
    const joiningDate = document.createElement('td');
    const issueDate = document.createElement('td');
    const certificate = document.createElement('td');

    let stuID = accept[i];
    console.log(stuID);
    let student;
    let colName;
    for (let i = 0; i < colleges.length; i++) {
      if (colleges[i].students) {
        let findStu = colleges[i].students.find(stu => {
          // console.log(stu, stu.id, student);
          colName = colleges[i].name;
          return stu.id === stuID;
        });
        if (findStu) {
          console.log(findStu);
          student = findStu;
        }
      }
    }
    console.log(student);
    console.log(colName);

    if (student) {
      collegeName.innerHTML = colName;
      studentID.innerHTML = student.id;
      studentName.innerHTML = student.name;
      course.innerHTML = student.course;
      joiningDate.innerHTML = student.joiningDate || 'NA';
      issueDate.innerHTML = student.issueDate || 'NA';
      const viewBtn = document.createElement('a');
      viewBtn.innerHTML = 'View';
      viewBtn.target = '_blank';
      viewBtn.classList.add('view-btn');
      viewBtn.href = student.certPath || 'NA';
      certificate.appendChild(viewBtn);
      console.log(viewBtn);

      accepts.appendChild(collegeName);
      accepts.appendChild(studentID);
      accepts.appendChild(studentName);
      accepts.appendChild(course);
      accepts.appendChild(joiningDate);
      accepts.appendChild(issueDate);
      accepts.appendChild(certificate);
      table.appendChild(accepts);
    }
  }
} else {
  console.log('No students');
  const msg = document.createElement('p');
  msg.classList.add('msg');
  msg.innerHTML = 'Nothing to View!';
  console.log(msg);
  section.appendChild(msg);
}

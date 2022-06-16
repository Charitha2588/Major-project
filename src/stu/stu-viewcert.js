const student = sessionStorage.getItem('currentLoggedInStudent');

const table = document.getElementById('table-body');

console.log(student);

let allColleges = JSON.parse(localStorage.getItem('collegesData'));
console.log(allColleges);
// const stu = allColleges.forEach(function (col) {
//   console.log(col.students);
//   let findStu = col.students.find(stu => {
//     console.log(stu, stu.id, student);
//     return stu.id === student;
//   });
//   if (findStu) {
//     console.log(findStu);
//     return findStu;
//   }
// });

// console.log(stu);

let stu;

for (let i = 0; i < allColleges.length; i++) {
  let findStu;
  if (allColleges[i].students) {
    findStu = allColleges[i].students.find(stu => {
      console.log(stu, stu.id, student);
      return stu.id === student;
    });
  }

  if (findStu) {
    console.log(findStu);
    stu = findStu;
  }
}

console.log(stu);

if (stu) {
  const studentRow = document.createElement('tr');
  const studentID = document.createElement('td');
  const studentName = document.createElement('td');
  const joiningDate = document.createElement('td');
  const issueDate = document.createElement('td');
  const certificate = document.createElement('td');

  studentID.innerHTML = stu.id;
  studentName.innerHTML = stu.name;
  joiningDate.innerHTML = stu.joiningDate;
  issueDate.innerHTML = stu.issueDate || 'NA';
  const viewBtn = document.createElement('a');
  viewBtn.innerHTML = 'View';
  viewBtn.target = '_blank';
  viewBtn.classList.add('view-btn');
  viewBtn.href = stu.certPath || 'NA';
  certificate.appendChild(viewBtn);
  console.log(viewBtn);

  studentRow.appendChild(studentID);
  studentRow.appendChild(studentName);
  studentRow.appendChild(joiningDate);
  studentRow.appendChild(issueDate);
  studentRow.appendChild(certificate);
  table.appendChild(studentRow);
}

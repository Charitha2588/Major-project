const btn = document.querySelector('#view');
const sb = document.querySelector('#course-options');
const mainElement = document.querySelector('main');
const tableElement = document.querySelector('section');
tableElement.style.display = 'none';

btn.addEventListener('click', e => {
  e.preventDefault();
  console.log(sb.selectedIndex);
  console.log(sb.value);

  mainElement.style.display = 'none';
  tableElement.style.display = 'block';

  let college = sessionStorage.getItem('currentLoggedInCollege');
  console.log(college);
  // console.log(typeof localStorage.getItem('collegesData'));
  let allColleges = JSON.parse(localStorage.getItem('collegesData'));
  console.log(allColleges);
  let col = allColleges.find(function (col) {
    return col.username === college;
  });
  let students = col.students;
  console.log(students);
  const table = document.querySelector('#table-body');
  const section = document.querySelector('section');
  let notCourse = 0;
  if (students && students.length >= 1) {
    const studentsSet = new Set(students);
    students = [...studentsSet];

    students.forEach(s => {
      if (s.course === sb.value) {
        const studentRow = document.createElement('tr');
        const studentID = document.createElement('td');
        const studentName = document.createElement('td');
        const joiningDate = document.createElement('td');
        const issueDate = document.createElement('td');
        const certificate = document.createElement('td');

        studentID.innerHTML = s.id;
        studentName.innerHTML = s.name;
        joiningDate.innerHTML = s.joiningDate;
        issueDate.innerHTML = s.issueDate || 'NA';
        const viewBtn = document.createElement('a');
        viewBtn.innerHTML = 'View';
        viewBtn.target = '_blank';
        viewBtn.classList.add('view-btn');
        viewBtn.href = s.certPath || 'NA';
        certificate.appendChild(viewBtn);
        console.log(viewBtn);

        studentRow.appendChild(studentID);
        studentRow.appendChild(studentName);
        studentRow.appendChild(joiningDate);
        studentRow.appendChild(issueDate);
        studentRow.appendChild(certificate);
        table.appendChild(studentRow);
        // } else {
        //   notCourse++;
      }
    });
    // if (notCourse >= 1) {
    //   console.log('No students');
    //   const msg = document.createElement('p');
    //   msg.classList.add('msg');
    //   msg.innerHTML = 'Nothing to View!';
    //   console.log(msg);
    //   section.appendChild(msg);
    // }
  } else {
    console.log('No students');
    const msg = document.createElement('p');
    msg.classList.add('msg');
    msg.innerHTML = 'Nothing to View!';
    console.log(msg);
    section.appendChild(msg);
  }
});

const students = [
  {
    id: 10,
    name: 'John Smith',
    marks: [10, 8, 6, 9, 8, 7]
  },
  {
    id: 11,
    name: 'John Doe',
    marks: [ 9, 8, 7, 6, 7]
  },
  {
    id: 12,
    name: 'Thomas Anderson',
    marks: [6, 7, 10, 8]
  },
  {
    id: 13,
    name: 'Jean-Baptiste Emanuel Zorg',
    marks: [10, 9, 8, 9]
  }
];

const sudentAverageMark = averageStudentMark(students, 10);
const groupAverageMark = averageGroupMark(students);

console.log('sudentAverageMark', sudentAverageMark);
console.log('groupAverageMark', groupAverageMark);

function averageStudentMark(students, studentId) {
  const markList = students.find((element) => element.id === studentId).marks;
  const sumMarks = markList.reduce((acc, currentMark) => acc + currentMark);
  const averageMark = Number((sumMarks / markList.length).toFixed(1));

  return averageMark;
};

function averageGroupMark(students) {
  const averageMarkList = students.map((element, index, arr) => {
    return averageStudentMark(arr, element.id);
  });
  const sumMarks = averageMarkList.reduce((acc, currentMark) => acc + currentMark);
  const averageMark = Number((sumMarks / students.length).toFixed(1));

  return averageMark;
};

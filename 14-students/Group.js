import Student from "./Student.js";

class Group {
  #students;

  constructor () {
    this.#students = [];
    this.studentsMarks = [];
  };

  addStudent(student) {
    if (this.#isStudentValid(student)) {
      this.#students.push(student);
    }
  };

  #isStudentValid(student) {
    return student instanceof Student;
  };

  get students() {
    return this.#students;
  };

  getAverageMark() {
    this.markList = this.getMarkList();
    this.totalMark = this.markList.reduce((acc, mark) => acc + mark);
    this.averageMark = this.totalMark / this.markList.length;

    return this.averageMark.toFixed(2);
  };

  getMarkList() {
    this.#students.forEach((student) => {
      this.studentsMarks.push(student.studentMarks);
    });
    return this.studentsMarks.flat();
  };
};

export default Group;

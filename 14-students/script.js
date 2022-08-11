import Group from "./Group.js";
import Student from "./Student.js";
import max from "./polyfill.js";

const group = new Group();

group.addStudent(new Student('John', [10, 8]));
group.addStudent(new Student('Alex', [10, 9]));
group.addStudent(new Student('Bob', [6, 10,]));

console.log(group.students);
console.log(group.getAverageMark());

const arr = [6, 5, 8, 7];

console.log(arr.max());

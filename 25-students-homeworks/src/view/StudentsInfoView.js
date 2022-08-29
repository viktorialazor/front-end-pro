class StudentsInfoView {
  static STUDENTS_MARKS_SELECTOR = '.students-marks';
  static STUDENT_INFO_SELECTOR = '.student-info';
  static STUDENT_INFO_MARK_SELECTOR = '.student-info__mark';
  static DELETE_BTN_SELECTOR = '.delete-btn';
  static MIN_MARK = 0;
  static MAX_MARK = 10;
  static ERROR_DATA = 'Enter nuber from 0 to 10';

  #$contentEl;
  #options;

  constructor(options) {
    this.#options = options;

    this.#$contentEl = this.initInfoView();
  }

  initInfoView() {
    return $('<tbody class="students-marks__info students-info"></tbody>')
      .on('click', StudentsInfoView.DELETE_BTN_SELECTOR, (e) => this.onDeleteBtnClick(e))
      .on('focusout', StudentsInfoView.STUDENT_INFO_MARK_SELECTOR, (e) => this.onMarkFieldFocusout(e));
  }

  onDeleteBtnClick(e) {
    e.preventDefault();

    const id = this.getStudentId(e.target);

    this.#options.onDelete(id);
  }

  onMarkFieldFocusout(e) {
    e.stopPropagation();

    if (!this.isMarkValid(e.target.value)) {
      this.showError(StudentsInfoView.ERROR_DATA);
      return;
    }

    const studentMarks = [];
    const id = this.getStudentId(e.target)
    const $studentItem = this.getStudentItem($(e.target));
    const $markList = $studentItem.find(StudentsInfoView.STUDENT_INFO_MARK_SELECTOR);

    $markList.each((_, item) => studentMarks.push(item.value));

    const changes = {
      marks: studentMarks,
    }

    this.#options.onUpdate(id, changes);
  }

  deleteElement(id) {
    const $studentEl = this.getElementById(id);

    $studentEl.remove();
  }

  updateElement(id, updateStudent) {
    const $studentEl = this.getElementById(id);

    $studentEl.replaceWith(this.generateStudentHtml(updateStudent));
  }

  getStudentId(el) {
    return el.closest(StudentsInfoView.STUDENT_INFO_SELECTOR).dataset.id;
  }

  getElementById(id) {
    return this.#$contentEl.find(`[data-id='${id}']`);
  }

  getStudentItem(el) {
    return el.closest(StudentsInfoView.STUDENT_INFO_SELECTOR);
  }

  renderInfo($el) {
    const $wrapper = $el.find(StudentsInfoView.STUDENTS_MARKS_SELECTOR);

    $wrapper.append(this.#$contentEl);
  }

  renderList(list) {
    const listHtml = list.map(item => this.generateStudentHtml(item)).join('');

    this.#$contentEl.html(listHtml);
  }

  renderItem(item) {
    const itemHtml = this.generateStudentHtml(item);

    this.#$contentEl.append(itemHtml);
  }

  generateStudentHtml(student) {
    const marksList = student.marks.length > 0 ? student.marks.map(mark => `<td><input class="student-info__mark" type="text" value="${mark}"></td>`).join('') : this.getDefaultMarks();

    return `
      <tr class="student-info__row student-info" data-id=${student.id}>
        <td>${student.name}</td>
        ${marksList}
        <td><button class="student-info__button delete-btn" type="button">Delete</button></td>
      </tr>
    `
  }

  getDefaultMarks() {
    let marks = '';

    for(let i = StudentsInfoView.MIN_MARK; i < StudentsInfoView.MAX_MARK; i++) {
      marks += `<td><input class="student-info__mark" type="text" value="0"></td>`
    }

    return marks;
  }

  isMarkValid(value) {
    return !isNaN(Number(value)) && (value.trim() !== '') && (Number(value) > StudentsInfoView.MIN_MARK && Number(value) <= StudentsInfoView.MAX_MARK);
  }

  showError(message) {
    alert(message);
  }
}

class StudentsFormView {
  static FORM_SELECTOR = '.students-form';
  static FORM_INPUT_SELECTOR = '.student-name-field';
  static ERROR_EMPTY_FIELD = 'The field must be filled.';

  #options;
  #$container
  #$form;
  #$formInput

  constructor(options, $container) {
    this.#options = options;
    this.#$container = $container;

    this.renderForm(this.#$container);

    this.#$formInput = $(StudentsFormView.FORM_SELECTOR).find(StudentsFormView.FORM_INPUT_SELECTOR);

    this.#$form = this.initFormView();
  }

  initFormView() {
    return $(StudentsFormView.FORM_SELECTOR).on('submit', (e) => this.onFormSubmit(e));
  }

  onFormSubmit(e) {
    e.preventDefault();

    const studentName = this.#$formInput.val();

    if (!this.isDataValue(studentName)) {
      this.showError(StudentsFormView.ERROR_EMPTY_FIELD);
      return;
    }

    const newStudent = {
      name: studentName,
    };

    this.#options.onCreate(newStudent);
  }

  renderForm($container) {
    const formHtml = this.generateStudentsFormHtml();

    $container.append(formHtml);
  }

  generateStudentsFormHtml() {
    return `
    <form class="students-form">
      <input class="students-form__input student-name-field" type="text" aria-label="student-name-field">
      <button class="students-form__button add-button">Save</button>
    </form>
    `;
  }

  clearForm() {
    this.#$form[0].reset();
  }

  isDataValue(message) {
    return message.trim() !== '';
  }

  showError(message) {
    alert(message);
  };
}

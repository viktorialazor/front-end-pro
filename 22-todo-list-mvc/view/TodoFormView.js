class TodoFormView {
  static FORM_SELECTOR = '.form';
  static FORM_INPUT_SELECTOR = '.form__input';
  static ERROR_EMPTY_FIELD = 'The field must be filled.';

  #options;
  #$container;
  #$form;
  #$formInput;

  constructor(options, $container) {
    this.#options = options;
    this.#$container = $container;

    this.renderForm(this.#$container);

    this.#$formInput = $(TodoFormView.FORM_SELECTOR).find(TodoFormView.FORM_INPUT_SELECTOR);

    this.#$form = $(TodoFormView.FORM_SELECTOR).on('submit', (e) => this.onFormSubmit(e));
  }

  onFormSubmit(e) {
    e.preventDefault();

    const message = this.#$formInput.val();

    if (!this.isDataValue(message)) {
      this.showError(TodoFormView.ERROR_EMPTY_FIELD);
      return;
    }

    const newTodo = {
      text: message,
    };

    this.#options
      .onCreate(newTodo);
  }

  renderForm($container) {
    const formHtml = this.generateFormHtml();

    $container.append(formHtml);
  }

  generateFormHtml() {
    return `
      <form class="form">
        <input class="form__input" type="text" name="task" value="" placeholder="Enter your task" >
        <button class="form__button button" type="submit">Add to list</button>
      </form>
    `;
  }

  clearTodoForm() {
    this.#$form[0].reset();
  }

  isDataValue(message) {
    return message.trim() !== '';
  }

  showError(message) {
    alert(message);
  };
}

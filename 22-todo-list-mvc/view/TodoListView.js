class TodoListView {
  static TODO_ITEM_SELECTOR = '.list__item';
  static DELETE_BTN_SELECTOR = '.delete-button';
  static TODO_TEXT_SELECTOR = '.list__text';

  #$listEl;
  #options;

  constructor(options) {
    this.#$listEl = $('<ul class="list"></ul>')
      .on('click', TodoListView.DELETE_BTN_SELECTOR, (e) => this.onDeleteBtnClick(e))
      .on('click', TodoListView.TODO_TEXT_SELECTOR, (e) => this.onTodoTextClick(e));

    this.#options = options;
  }

  onDeleteBtnClick(e) {
    e.stopPropagation();

    const id = this.getTodoItemId(e.target);

    this.#options.onDelete(id);
  }

  onTodoTextClick(e) {
    e.stopPropagation();

    const id = this.getTodoItemId(e.target);
    const todoEl = this.getTodoItem(e.target);

    const todoElStatus = todoEl.classList.contains('done') ? true : false;

    const changes = {
      status: !todoElStatus,
    }

    this.#options.onChange(id, changes);
  }

  deleteElement(id) {
    const $todoEl = this.getElementById(id);

    $todoEl.remove();
  }

  updateElement(id, updatedTodo) {
    const $todoItem = this.getElementById(id);

    $todoItem.replaceWith(this.generateTodoHtml(updatedTodo));
  }

  getTodoItemId(el) {
    return el.closest(TodoListView.TODO_ITEM_SELECTOR).dataset.id;
  }

  getTodoItem(el) {
    return el.closest(TodoListView.TODO_ITEM_SELECTOR);
  }

  getElementById(id) {
    return this.#$listEl.find(`[data-id='${id}']`);
  }

  appendTodo($el) {
    $el.append(this.#$listEl);
  }

  renderList(list) {
    const listHtml = list.map(item => this.generateTodoHtml(item)).join('');

    this.#$listEl.html(listHtml);
  }

  renderItem(item) {
    const itemHtml = this.generateTodoHtml(item);

    this.#$listEl.append(itemHtml);
  }

  generateTodoHtml(todo) {
    const statusClass = todo.status ? 'done' : '';

    return `
      <li class="list__item ${statusClass}" data-id="${todo.id}">
        <span class="list__text">${todo.text}</span>
        <button class="list__button button delete-button" type="button">Delete</button>
      </li>
    `
  }
}

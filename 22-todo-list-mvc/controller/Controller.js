class Controller {
  #$container;

  constructor($container) {
    this.#$container = $container;

    this.$form =$container.find(Controller.FORM_SELECTOR);

    this.collection = new Collection();
    this.todoListView = new TodoListView({
      onDelete: id => this.collection.delete(id).then(() => this.todoListView.deleteElement(id)),
      onChange: (id, changes) => this.collection.update(id, changes).then(() => {
        const updatedItem = this.collection.find(id);
        this.todoListView.updateElement(id, updatedItem);
      }),
    });
    this.todoFormView = new TodoFormView({
      onCreate: newTodo => this.collection.create(newTodo).then((res) => {
        this.todoListView.renderItem(res);
        this.todoFormView.clearTodoForm();
      })},
      this.#$container);

    this.todoListView.appendTodo(this.#$container);
    this.collection.fetch().then(() => this.renderList())
  }

  renderList() {
    this.todoListView.renderList(this.collection.getList());
  }
}

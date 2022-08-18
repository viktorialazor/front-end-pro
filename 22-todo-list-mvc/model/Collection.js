class Collection {
  #list;

  constructor() {
    this.#list = [];
  }

  fetch() {
    return TodoApi
      .getList()
      .then((list) => {
        this.setList(list);
      })
      .catch(this.showError);
  }

  setList(list) {
    this.#list = list;
  }

  getList() {
    return this.#list;
  }

  add(todo) {
    this.#list.push(todo);
  }

  create(newTodo) {
    return TodoApi
      .create(newTodo)
      .then(res => {
        this.add(res);

        return res;
      })
      .catch(this.showError);
  }

  update(id, changes) {
    const oldTodo = this.find(id);

    Object.keys(changes).forEach(key => oldTodo[key] = changes[key]);

    TodoApi
      .update(id, changes)
      .catch(this.showError);

    return Promise.resolve();
  }

  delete(id) {
    this.#list = this.#list.filter(item => item.id !== id);

    TodoApi
      .delete(id)
      .catch(this.showError);

    return Promise.resolve();
  }

  find(id) {
    return this.#list.find(item => item.id === id);
  }

  showError(e) {
    alert(e.message);
  };
}

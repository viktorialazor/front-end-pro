import StudentsApi from "../StudentsApi";

export default class Collection {
  #list;

  constructor() {
    this.#list = [];
  }

  fetch() {
    return StudentsApi
      .getList()
      .then(list => {
        this.setList(list);
      })
      .catch(this.showError)
  }

  create(newStudent) {
    return StudentsApi
      .create(newStudent)
      .then(res => {
        this.add(res);

        return res;
      })
      .catch(this.showError);
  }

  update(id, changes) {
    const oldStudent = this.find(id);

    Object.keys(changes).forEach(key => oldStudent[key] = changes[key]);

    StudentsApi
      .update(id, changes)
      .catch(this.showError);

    return Promise.resolve();
  }

  delete(id) {
    this.#list = this.#list.filter(item => item.id !== id);

    StudentsApi
      .delete(id)
      .catch(this.showError)

    return Promise.resolve();
  }

  setList(list) {
    this.#list = list;
  }

  getList() {
    return this.#list;
  }

  add(student) {
    this.#list.push(student);
  }

  find(id) {
    return this.#list.find(item => item.id === id);
  }

  showError(e) {
    alert(e.message);
  }
}

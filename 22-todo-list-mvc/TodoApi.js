class TodoApi {
  static URL = 'https://62e67c22de23e263792d127c.mockapi.io/todo/';
  static NOT_FOUND = 404;

  static request(url = '', method = 'GET', body) {
    return fetch(TodoApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-type': 'application/json',
      }
    })
    .catch((e) => {
      throw new Error(`TodoApi cannot execute request: ${e.message}`);
    })
  }

  static getList() {
    return TodoApi
      .request()
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Cannot retrive todo list');
      })
  }

  static getItem(id) {
    return TodoApi
      .request(id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        if (res.status === TodoApi.NOT_FOUND) {
          throw new Error(`Todo item with id '${id}' does not exist`);
        }

        throw new Error(`Cannot retrive todo item with id '${id}'`);
      })
  }

  static create(todoItem) {
    return TodoApi
      .request('', 'POST', todoItem)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Cannot create new todo item');
      })
  }

  static update(id, changes) {
    return TodoApi
      .request(id, 'PUT', changes)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`Cannot update todo item with id '${id}'`);
      })
  }

  static delete(id) {
    return TodoApi
      .request(id, 'DELETE')
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`Cannot delete todo item with id '${id}'`);
      })
  }
}

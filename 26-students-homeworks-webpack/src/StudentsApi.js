export default class StudentsApi {
  static URL = 'https://62e67c22de23e263792d127c.mockapi.io/students/';

  static request(url = '', method = 'GET', body) {
    return fetch(StudentsApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-type': 'application/json',
      }
    })
    .catch((e) => {
      throw new Error(`StudentsApi cannot execute request: ${e.message}`);
    })
  }

  static getList() {
    return StudentsApi
      .request()
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Cannot retrieve students list');
      })
  }

  static create(student) {
    return StudentsApi
      .request('', 'POST', student)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Cannot create new student');
      })
  }

  static update(id, changes) {
    return StudentsApi
      .request(id, 'PUT', changes)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`Cannot update student with id '${id}'`);
      })
  }

  static delete(id) {
    return StudentsApi
      .request(id, 'DELETE')
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`Cannot delete student with id '${id}'`);
      })
  }
}

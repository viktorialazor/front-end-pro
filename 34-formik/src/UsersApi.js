export default class UsersApi {
  static URL = 'https://633deae683f50e9ba3a9226b.mockapi.io/users';
  static NOT_FOUND = 404;

  static request(url = '', method = 'GET', body) {
    return fetch(UsersApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((e) => {
      throw new Error(`UsersApi cannot execute request: ${e.message}`);
    })
  }

  static getList() {
    return UsersApi
      .request()
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === UsersApi.NOT_FOUND) {
          throw new Error(`Users don't exist`);
        }

        throw new Error('Cannot retrive user list');
      });
  }

  static create(user) {
    return UsersApi
      .request('', 'POST', user)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Cannot create new user');
      });
  }
}

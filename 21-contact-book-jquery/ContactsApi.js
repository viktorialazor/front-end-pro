class ContactsApi {
  static URL = "https://62e67c22de23e263792d127c.mockapi.io/contacts/";

  static request(url = '', method = 'GET', body) {
    return fetch(ContactsApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-type': 'application/json',
      }
    })
    .catch((e) => {
      throw new Error(`ContactsApi cannot execute request: ${e.message}`);
    })
  }

  static getList() {
    return ContactsApi
      .request()
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Cannot retrive contact list');
      })
  }

  static create(contact) {
    return ContactsApi
      .request('', 'POST', contact)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Cannot create new contact');
      })
  }

  static update(id, changes) {
    return ContactsApi
      .request(id, 'PUT', changes)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`Cannot update contact with id '${id}'`);
      })
  }

  static delete(id) {
    return ContactsApi
      .request(id, 'DELETE')
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(`Cannot delete contact with id '${id}'`);
      })
  }
}

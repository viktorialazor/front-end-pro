export default class UserApi {
  static URL = 'https://jsonplaceholder.typicode.com/';
  static NOT_FOUND = 404;

  static request(url = '', method = 'GET', body) {
    return fetch(UserApi.URL + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((e) => {
      throw new Error(`UserApi cannot execute request: ${e.message}`);
    })
  }

  static getList(usersPath) {
    return UserApi
      .request(usersPath)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === UserApi.NOT_FOUND) {
          throw new Error(`User doesn't exist`);
        }

        throw new Error('Cannot retrive user list');
      });
  }

  static getAlbums(albumsPath) {
    return UserApi
      .request(albumsPath)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === UserApi.NOT_FOUND) {
          throw new Error(`Album doesn't exist`);
        }

        throw new Error('Cannot retrive album list');
      });
  }

  static getPhotos(photosPath) {
    return UserApi
      .request(photosPath)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === UserApi.NOT_FOUND) {
          throw new Error(`Photos don't exist`);
        }

        throw new Error('Cannot retrive photo list');
      });
  }
}

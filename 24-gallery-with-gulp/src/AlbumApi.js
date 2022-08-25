class AlbumApi {
  static URL = 'https://jsonplaceholder.typicode.com/';
  static NOT_FOUND = 404;

  static request(url = '', method = 'GET') {
    return fetch(AlbumApi.URL + url, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
    })
    .catch((e) => {
      throw new Error(`AlbumApi cannot execute request: ${e.message}`);
    })
  }

  static getAlbumList() {
    return AlbumApi
      .request('albums')
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Cannot retrieve album list');
      });
  }

  static getAlbumImages(id) {
    return AlbumApi
      .request('photos?albumId=' + id)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Cannot retrieve images of album');
      });
  }
}

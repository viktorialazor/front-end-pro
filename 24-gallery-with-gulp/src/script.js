const BROKEN_IMG_DELIVERY = 'via.placeholder';
const WORK_IMG_DELIVERY = 'dummyimage';

const albumListElement = document.querySelector('#album-list');
const albumImagesElement = document.querySelector('#album-images');

AlbumApi.getAlbumList()
  .then(albumList => {
    renderAlbumList(albumList);

    const firstAlbumId = albumList[0].id;

    return firstAlbumId;
  })
  .then(AlbumApi.getAlbumImages)
  .then(renderAlbumImages)
  .catch(showError);

albumListElement.addEventListener('click', onAlbumListElementClick);

function onAlbumListElementClick(e) {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  const clickedElement = e.target.closest('li');
  const elementId = clickedElement.dataset.id;

  AlbumApi.getAlbumImages(elementId)
  .then(renderAlbumImages)
  .catch(showError);
};

function renderAlbumList(list) {
  const albumListHtml = list.map(generateAlbumItem).join('');

  albumListElement.innerHTML = albumListHtml;
};

function renderAlbumImages(images) {
  const albumImagesHtml = images.map(generateAlbumImages).join('');

  albumImagesElement.innerHTML = albumImagesHtml;
};

function generateAlbumItem(item) {
  return `
    <li class="albums__item" data-id="${item.id}"><button class="albums__button" type="button">${item.title}</button></li>
  `;
};

function generateAlbumImages(image) {
  return `
    <img class="album-images__item" src=${image.thumbnailUrl.replace(BROKEN_IMG_DELIVERY, WORK_IMG_DELIVERY)} alt="image ${image.id}"/>
  `;
};

function showError(error) {
  alert(error.message);
};

const list = document.querySelector('.list');
const input = document.querySelector('.form__input');
const button = document.querySelector('.form__button');

button.addEventListener('click', onButtonClick);

function onButtonClick() {
  if (input.value !== '') {
    let listItem = document.createElement('li');
    listItem.classList.add('list__item');
    listItem.textContent = input.value;
    list.append(listItem);
    input.value = '';
  }
};

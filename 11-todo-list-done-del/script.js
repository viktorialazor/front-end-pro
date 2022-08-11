const list = document.querySelector('.list');
const input = document.querySelector('.form__input');
const addButton = document.querySelector('.form__button');

const ERROR_MESSAGE = 'The field must be filled.';
const DELETE_ITEM_BUTTON = 'delete-button';
const LIST_ITEM_SELECTOR = '.list__item';
const LIST_ITEM_TEXT_SELECTOR = '.list__text';
const BG_CLASS = 'bg-green';

addButton.addEventListener('click', onAddButtonClick);
list.addEventListener('click', onListClick);

function onAddButtonClick() {
  const itemMessage = getMessage(input);
  const isItemMessageValid = isMessageValid(itemMessage);

  if (!isItemMessageValid) {
    showError();
    return;
  }

  addListItem(itemMessage);
  crearField(input);
};

function onListClick(e) {
  const item = getItem(e.target);
  const isClickedDeleteButton = isClickedRightElement(e.target, DELETE_ITEM_BUTTON);

  if (isClickedDeleteButton) {
    item.remove();
  } else {
    toggleDone(item, LIST_ITEM_TEXT_SELECTOR, BG_CLASS);
  }
};

function getMessage(field) {
  return field.value;
};

function isMessageValid(message) {
  return message.trim() !== '';
};

function showError() {
  alert(ERROR_MESSAGE);
};

function addListItem(item) {
  let listItem = listItemTemplate
  .innerHTML
  .replace('{item}', item);

  list.insertAdjacentHTML('beforeend', listItem);
};

function crearField(field) {
  field.value = '';
};

function getItem(element) {
  return element.closest(LIST_ITEM_SELECTOR);
};

function isClickedRightElement(element, containedClass) {
  return element.classList.contains(containedClass);
};

function toggleDone(selector, changedElement, changedClass) {
  selector.querySelector(changedElement).classList.toggle(changedClass);
};

const ERROR_MESSAGE = {
  EMPTY_FIELD: `The field must be filled.`,
  USER_NOT_EXIST: `User doesn't exist`,
  SOME_ERROR: `Some error happened`,
  CANNOT_CREATE: `Can not create new todo item`,
  CANNOT_UPDATE: `Can not update todo item`,
  CANNOT_DELETE: `Can not delete todo item`,
};
const NOT_FOUND = 404;
const DELETE_ITEM_BUTTON = 'delete-button';
const LIST_ITEM_SELECTOR = '.list__item';
const LIST_ITEM_TEXT_SELECTOR = '.list__text';
const RENDER_POSITION = 'afterbegin';
const CLASS_DONE = 'done';
const URL = 'https://62e67c22de23e263792d127c.mockapi.io/todo';

const listElement = document.querySelector('.list');
const inputElement = document.querySelector('.form__input');
const addButton = document.querySelector('.form__button');

addButton.addEventListener('click', onAddButtonClick);
listElement.addEventListener('click', onListClick);

getTodoList();

function onAddButtonClick() {
  const itemMessage = getMessage(inputElement);
  const isItemMessageValid = isMessageValid(itemMessage);

  if (!isItemMessageValid) {
    showError(ERROR_MESSAGE.EMPTY_FIELD);
    return;
  }

  const itemData = getTodoItemData(itemMessage);

  createTodoItem(itemData);
  crearField(inputElement);
};

function onListClick(e) {
  const item = getItem(e.target);
  const isClickedDeleteButton = isClickedRightElement(e.target, DELETE_ITEM_BUTTON);

  if (isClickedDeleteButton) {
    deleteTodoItem(item.dataset.id);
  } else {
    const todoItemData = getTodoItemDataUpdate(item);

    updateTodoItem(todoItemData);
  }
};

function getTodoList() {
  fetch(URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === NOT_FOUND) {
        throw Error(ERROR_MESSAGE.USER_NOT_EXIST);
      }
      
      throw Error(ERROR_MESSAGE.SOME_ERROR);
    })
    .then(todoList => {
      addTodoList(todoList);
    })
    .catch((error) => {
      showError(error.message);
    });
};

function addTodoList(todoList) {
  const todoListHtml = todoList.reverse().map((todoItem) => getTodoItem(todoItem)).join('');

  listElement.insertAdjacentHTML(RENDER_POSITION, todoListHtml);
};

function getTodoItem(item) {
  let listItem = listItemTemplate
  .innerHTML
  .replace('{done}', item.status ? CLASS_DONE : '')
  .replace('{item}', item.text)
  .replace('{id}', item.id);

  return listItem;
};

function getMessage(field) {
  return field.value;
};

function isMessageValid(message) {
  return message.trim() !== '';
};

function getTodoItemData(itemMessage) {
  const todoItemData = {
    text: itemMessage,
    status: false,
  };

  return todoItemData;
};

function addTodoItem(todoItemHtml) {
  listElement.insertAdjacentHTML(RENDER_POSITION, todoItemHtml);
};

function createTodoItem(todoItem) {
  fetch(URL, {
    method: 'POST',
    body: JSON.stringify(todoItem),
    headers: {
      'Content-type': 'application/json',
    },
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(ERROR_MESSAGE.CANNOT_CREATE);
  })
  .then((itemData) => {
    return getTodoItem(itemData);
  })
  .then((itemHtml) => {
    addTodoItem(itemHtml);
  })
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

function deleteTodoItem(todoItemId) {
  const deleteUrl = `${URL}/${todoItemId}`;

  fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(ERROR_MESSAGE.CANNOT_DELETE);
  })
  .then((deletedItem) => {
    const deletedElement = listElement.querySelector(`[data-id='${deletedItem.id}']`);

    deletedElement.remove();
  })
  .catch((error) => {
    showError(error.message);
  });
};

function toggleDone(selector, changedClass) {
  selector.classList.toggle(changedClass);
};

function getTodoItemDataUpdate(item) {
  const todoItemData = {
    id: item.dataset.id,
    text: item.querySelector(LIST_ITEM_TEXT_SELECTOR).textContent,
    status: !item.classList.contains(CLASS_DONE) ? true : false,
  };

  return todoItemData;
};

function updateTodoItem(todoItem) {
  const updateUrl = `${URL}/${todoItem.id}`;

  fetch(updateUrl, {
    method: 'PUT',
    body: JSON.stringify(todoItem),
    headers: {
      'Content-type': 'application/json',
    },
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(ERROR_MESSAGE.CANNOT_UPDATE);
  })
  .then((updatedItem) => {
    const toggleElement = listElement.querySelector(`[data-id='${updatedItem.id}']`);

    toggleDone(toggleElement, CLASS_DONE);
  })
  .catch((error) => {
    showError(error.message);
  });
};

function showError(message) {
  alert(message);
};

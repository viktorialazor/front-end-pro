const userFirstName = document.querySelector('#user-first-name');
const userLastName = document.querySelector('#user-last-name');
const userPhone = document.querySelector('#user-phone');
const addContactButton = document.querySelector('#add-contact');
const contactList = document.querySelector('#contact-list');

const DELETE_CONTACT_BUTTON = 'delete-contact-button';
const ERROR_FIRST_NAME = 'name (only letters and spaces)';
const ERROR_LAST_NAME = 'surname (only letters and spaces)';
const ERROR_PHONE = 'phone (only numbers)';
const DELETE_ITEM_SELECTOR = '.list__item';

addContactButton.addEventListener('click', onAddContactButtonClick);
contactList.addEventListener('click', onContactListClick);

function onAddContactButtonClick() {
  const firstName = getMessage(userFirstName);
  const lastName = getMessage(userLastName);
  const phone = getMessage(userPhone);
  const userData = [firstName, lastName, phone];
  const fields = [userFirstName, userLastName, userPhone];
  const errorList = getErrorList(userData);

  if (errorList.length !== 0) {
    showError(errorList);
    return;
  }

  addContact(userData);
  crearFields(fields);
};

function onContactListClick(e) {
  const isClickedDeleteButton = isClickedRightElement(e.target, DELETE_CONTACT_BUTTON);

  if (!isClickedDeleteButton) {
    return;
  }

  const deleteItem = getDeleteItem(e.target);

  if (deleteItem) {
    deleteItem.remove();
  }
};

function getMessage(field) {
  return field.value;
};

function getErrorList(userData) {
  const [firstName, lastName, phone] = userData;
  const errorList = [];

  if (!isTextMessageValid(firstName)) {
    errorList.push(ERROR_FIRST_NAME);
  }
  if (!isTextMessageValid(lastName)) {
    errorList.push(ERROR_LAST_NAME);
  }
  if (!isNumericMessageValid(phone)) {
    errorList.push(ERROR_PHONE);
  }

  return errorList;
};

function isTextMessageValid(message) {
  return message.trim() !== '' && isOnlyLettersAndSpaces(message);
};

function isOnlyLettersAndSpaces(str) {
  return /^[A-Za-z\s]*$/.test(str);
}

function isNumericMessageValid(message) {
  return !isNaN(Number(message)) && (message.trim() !== '');
};

function showError(errorList) {
  let errorMessage = 'The fields must be filled. Enter ';

  errorList.forEach((errorItem, index, array) => {
    errorMessage += errorItem;
    errorMessage += index !== array.length - 1 ? ', ' : '.';
  });

  alert(errorMessage);
};

function addContact(userData) {
  const [firstName, lastName, phone] = userData;
  const userName = firstName.charAt[0] === firstName.charAt(0).toUpperCase() ? firstName : formatText(firstName);
  const userSurname = lastName.charAt[0] === lastName.charAt(0).toUpperCase() ? lastName : formatText(lastName);
  const userPhone = formatPhone(phone);

  let contactItem = listItemTemplate
  .innerHTML
  .replace('{firstName}', userName)
  .replace('{lastName}', userSurname)
  .replace('{phone}', userPhone);

  contactList.insertAdjacentHTML('afterbegin', contactItem);
};

function formatText(text) {
  let textFormatted = text.charAt(0).toUpperCase() + text.slice(1);

  return textFormatted;
};

function formatPhone(phone) {
  let userPhone = [];
  let counter = 0;

  [...phone].reverse().forEach((number, index, array) => {
    if(counter === 3 && index !== array.length) {
      userPhone.push('-');
      userPhone.push(number);
      counter = 1;
    } else {
      userPhone.push(number);
      counter += 1;
    }
  });

  return userPhone.reverse().join('');
};

function crearFields(fields) {
  const fieldList = [...fields];

  fieldList.forEach((field) => {
    field.value = '';
  });
};

function isClickedRightElement(element, containedClass) {
  return element.classList.contains(containedClass);
};

function getDeleteItem(element) {
  return element.closest(DELETE_ITEM_SELECTOR);
};

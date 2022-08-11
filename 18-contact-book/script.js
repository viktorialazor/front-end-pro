const ERROR_MESSAGE = 'All fields must be filled. Enter ';
const EDIT_CONTACT_BUTTON = 'edit-contact-button';
const DELETE_CONTACT_BUTTON = 'delete-contact-button';
const ERROR_FIRST_NAME = 'name (only letters and spaces)';
const ERROR_LAST_NAME = 'surname (only letters and spaces)';
const ERROR_PHONE = 'phone (only numbers)';
const CONTACT_ITEM_SELECTOR = '.list__item';
const INPUT_SELECTOR = 'input';
const USER_DATA_KEY = {
  ID: 'id',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PHONE: 'phone',
};

const contactForm = document.querySelector('#form');
const userId = document.querySelector('#user-id');
const userFirstName = document.querySelector('#user-first-name');
const userLastName = document.querySelector('#user-last-name');
const userPhone = document.querySelector('#user-phone');
const addContactButton = document.querySelector('#add-contact');
const contactList = document.querySelector('#contact-list');

let usersContacts = [];

contactForm.addEventListener('submit', onContactFormSubmit);
contactList.addEventListener('click', onContactListClick);

ContactsApi.getList()
  .then(contactList => {
    usersContacts = contactList.slice();
    renderContactList(contactList);
  })
  .catch((error) => {
    showError(error.message);
  });

function onContactFormSubmit(e) {
  e.preventDefault();
  
  const userData = getFormData();
  const fields = [userFirstName, userLastName, userPhone];
  const errorList = getErrorList(userData);

  if (errorList.length !== 0) {
    showFormError(errorList);
    return;
  }

  if (userData.id) {
    ContactsApi.update(userData.id, userData)
      .then(ContactsApi.getList)
      .then((contacts) => {
        usersContacts = contacts.slice();
        renderContactList(contacts);
        crearFields(fields);
      })
      .catch((error) => {
        showError(error.message);
      });
  } else {
    ContactsApi.create(userData)
    .then((contact) => {
      usersContacts.push(contact);
      return generateContactHtml(contact);
    })
    .then((contactHtml) => {
      renderContact(contactHtml);
      crearFields(fields);
    })
    .catch((error) => {
      showError(error.message);
    });
  }
};

function onContactListClick(e) {
  const isClickedEditButton = isClickedRightElement(e.target, EDIT_CONTACT_BUTTON);
  const isClickedDeleteButton = isClickedRightElement(e.target, DELETE_CONTACT_BUTTON);

  if (!isClickedDeleteButton && !isClickedEditButton) {
    return;
  }

  const contactItemElement = getItemElement(e.target);
  const contactDeleteButtonElement = contactItemElement.querySelector('.' + DELETE_CONTACT_BUTTON);
  const contactItemId = contactItemElement.dataset.id;
  const contactItem = usersContacts.find(contact => contact.id === contactItemId);

  if (contactItem) {
    if (isClickedEditButton) {
      fillForm(contactItem);
      cleanDisabled();
      disabledElement(contactDeleteButtonElement, 'true');
      return;
    }

    if (isClickedDeleteButton) {
      ContactsApi.delete(contactItemId)
        .catch((error) => {
          showError(error.message);
        });
        contactItemElement.remove();
      return;
    }
  }
};

function getFormData() {
  const id = getMessage(userId) ? getMessage(userId) : '';
  const firstName = getMessage(userFirstName);
  const lastName = getMessage(userLastName);
  const phone = Number(getMessage(userPhone));

  return {id, firstName, lastName, phone};
};

function renderContactList(list) {
  const htmlContactList = list.map(generateContactHtml).join('');

  contactList.innerHTML = htmlContactList;
};

function renderContact(contact) {
  contactList.insertAdjacentHTML('beforeend', contact);
};

function generateContactHtml(userData) {
  const {id, firstName, lastName, phone} = userData;
  const userName = firstName.charAt[0] === firstName.charAt(0).toUpperCase() ? firstName : formatText(firstName);
  const userSurname = lastName.charAt[0] === lastName.charAt(0).toUpperCase() ? lastName : formatText(lastName);
  const userPhone = phone;

  const contactItemHtml = listItemTemplate
  .innerHTML
  .replace('{firstName}', userName)
  .replace('{lastName}', userSurname)
  .replace('{phone}', userPhone)
  .replace('{id}', id);

  return contactItemHtml;
};

function getMessage(field) {
  return field.value;
};

function getItemElement(element) {
  return element.closest(CONTACT_ITEM_SELECTOR);
};

function isClickedRightElement(element, containedClass) {
  return element.classList.contains(containedClass);
};

function fillForm(contactItem) {
  const formFields = Array.from(contactForm.querySelectorAll(INPUT_SELECTOR));

  for(let formField of formFields) {
    switch(formField.name) {
      case USER_DATA_KEY.ID:
        formField.value = contactItem.id;
        break;
      case USER_DATA_KEY.FIRST_NAME:
        formField.value = contactItem.firstName;
        break;
      case USER_DATA_KEY.LAST_NAME:
        formField.value = contactItem.lastName;
        break;
      case USER_DATA_KEY.PHONE:
        formField.value = contactItem.phone;
        break;
    }
  }
};

function cleanDisabled() {
  const buttons = contactList.querySelectorAll('.' + DELETE_CONTACT_BUTTON);

  for(let button of buttons) {
    disabledElement(button, false);
  }
};

function disabledElement(element, isDisabled) {
  element.disabled = isDisabled;
};

function getErrorList(userData) {
  const {firstName, lastName, phone} = userData;
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
  return !isNaN(Number(message)) && (message !== '');
};

function showFormError(errorList) {
  let errorMessage = 'The fields must be filled. Enter ';

  errorList.forEach((errorItem, index, array) => {
    errorMessage += errorItem;
    errorMessage += index !== array.length - 1 ? ', ' : '.';
  });

  alert(errorMessage);
};

function showError(message) {
  alert(message);
};

function formatText(text) {
  let textFormatted = text.charAt(0).toUpperCase() + text.slice(1);

  return textFormatted;
};

function crearFields(fields) {
  const fieldList = [...fields];

  fieldList.forEach((field) => {
    field.value = '';
  });
};

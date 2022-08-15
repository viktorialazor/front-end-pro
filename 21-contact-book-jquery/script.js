const ERROR_FIRST_NAME = 'name (only letters and spaces)';
const ERROR_LAST_NAME = 'surname (only letters and spaces)';
const ERROR_PHONE = 'phone (only numbers)';
const TEMPLATE_CONTACT_ITEM = '#listItemTemplate';
const DELETE_CONTACT_BTN = '.delete-contact-button';
const EDIT_CONTACT_BTN = '.edit-contact-button';
const CONTACT_FORM_MODAL = '#contact-form-modal';
const CONTACT_ITEM_SELECTOR = '.list__item';
const EMPTY_CONTACT = {
  id: '',
  firstName: '',
  lastName: '',
  phone: '',
};

const $contactListEl = $('#contact-list');
const $addButtonEl = $('#add-button');
const $form = $(`${CONTACT_FORM_MODAL} form`)[0];

const $contactTemplate = $(TEMPLATE_CONTACT_ITEM).html();
let contactList = [];

const $modal = $(CONTACT_FORM_MODAL).dialog({
  autoOpen: false,
  modal: true,
  show: {
    effect: 'blind',
    duration: 500
  },
  hide: {
    effect: 'explode',
    duration: 500
  },
  buttons: {
    Save: () => {
      const contactItem = getFormData();
      const errorList = checkFormData(contactItem);

      if (errorList.length !== 0) {
        showFormError(errorList);
        return;
      }

      if (contactItem.id) {
        updateContact(contactItem.id, contactItem);
      } else {
        createContact(contactItem);
      }

      closeModal();
    },
    Cancel: closeModal,
  },
  close: closeModal
});

getContactList();

const $contactList = $contactListEl
  .on('click', DELETE_CONTACT_BTN, onDeleteBtnClick)
  .on('click', EDIT_CONTACT_BTN, onEditBtnClick);
$addButtonEl.on('click', onAddBtnClick);

function getContactList() {
  ContactsApi
  .getList()
  .then(contacts => {
    contactList = contacts.slice();

    renderContactList(contacts);
  })
  .catch(showError);
};

function onDeleteBtnClick() {
  const id = getElementId($(this));

  deleteContact(id);
};

function onEditBtnClick() {
  const id = getElementId($(this));
  const contactItem = contactList.find(item => item.id === id);

  openModal(contactItem);
};

function onAddBtnClick() {
  openModal(EMPTY_CONTACT);
};

function createContact(contactItem) {
  ContactsApi
    .create(contactItem)
    .then((newContact) => {
      renderContactItem(newContact);

      contactList.push(newContact);
    })
    .catch(showError);
};

function updateContact(id, changes) {
  ContactsApi
    .update(id, changes)
    .then(() => {
      const contact = contactList.find(item => item.id === id);
      const $contact = getElementById(id);

      Object.keys(changes).forEach(key => contact[key] = changes[key]);

      $contact.replaceWith(generateContactHtml(contact));
    })
    .catch(showError);
};

function deleteContact(id) {
  ContactsApi
    .delete(id)
    .then((() => {
      const $contactEl = getElementById(id);

      contactList = contactList.filter(item => item.id !== id);

      $contactEl.remove();
    }))
    .catch(showError);
};

function openModal(contactItem) {
  fillForm(contactItem);
  $modal.dialog('open');
};

function closeModal() {
  $modal.dialog('close');
};

function renderContactList(contactList) {
  const $contactList = contactList.map(generateContactHtml);

  $contactListEl.append($contactList);
};

function renderContactItem(contactItem) {
  const contactItemHtml = generateContactHtml(contactItem);

  $contactListEl.append(contactItemHtml);
};

function generateContactHtml(contactItem) {
  return $contactTemplate
    .replace('{firstName}', contactItem.firstName)
    .replace('{lastName}', contactItem.lastName)
    .replace('{phone}', contactItem.phone)
    .replace('{id}', contactItem.id);
};

function fillForm(contactItem) {
  $form.id.value = contactItem.id;
  $form.firstName.value = contactItem.firstName;
  $form.lastName.value = contactItem.lastName;
  $form.phone.value = contactItem.phone;
};

function getFormData() {
  return {
    ...EMPTY_CONTACT,
    id: $form.id.value,
    firstName: $form.firstName.value,
    lastName: $form.lastName.value,
    phone: $form.phone.value,
  }
};

function getElementId($el) {
  const $contactEl = getElement($el);

  return String($contactEl.data('id'));
};

function getElement($el) {
  return $el.closest(CONTACT_ITEM_SELECTOR);
};

function getElementById(id) {
  return $contactListEl.find(`[data-id='${id}']`);
};

function checkFormData(contactItem) {
  const errorList = [];

  if (!isTextMessageValid(contactItem.firstName)) {
    errorList.push(ERROR_FIRST_NAME);
  }
  if (!isTextMessageValid(contactItem.lastName)) {
    errorList.push(ERROR_LAST_NAME);
  }
  if (!isNumericMessageValid(contactItem.phone)) {
    errorList.push(ERROR_PHONE);
  }

  return errorList;
};

function isTextMessageValid(message) {
  return message.trim() !== '' && isOnlyLettersAndSpaces(message);
};

function isOnlyLettersAndSpaces(str) {
  return /^[A-Za-z\s]*$/.test(str);
};

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

function showError(e) {
  alert(e.message);
};

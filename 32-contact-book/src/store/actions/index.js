import ContactsApi from '../../Contacts/ContactsApi.js';

export const ACTION_CONTACT_FETCH_LIST = 'fetchList';
export const ACTION_CONTACT_ADD = 'add';
export const ACTION_CONTACT_UPDATE = 'update';
export const ACTION_CONTACT_REMOVE = 'remove';

export function fetchList() {
  return dispatch => {
    ContactsApi.getList()
      .then((list) => {
        dispatch({ type: ACTION_CONTACT_FETCH_LIST, payload: {data: list} });
      })
      .catch((e) => {
        dispatch({ type: ACTION_CONTACT_FETCH_LIST, payload: {error: e.message} });
      });
  };
};

export function add(contact) {
  return dispatch => {
    ContactsApi.create(contact)
      .then((contactItem) => {
        dispatch({ type: ACTION_CONTACT_ADD, payload: {data: contactItem} });
      })
      .catch((e) => {
        dispatch({ type: ACTION_CONTACT_ADD, payload: {error: e.message} });
      });
  };
};

export function update(id, contact) {
  return dispatch => {
    ContactsApi.update(id, contact)
      .then(() => {
        dispatch({ type: ACTION_CONTACT_UPDATE, payload: {data: contact} });
      })
      .catch((e) => {
        dispatch({ type: ACTION_CONTACT_UPDATE, payload: {error: e.message} });
      });
  };
};

export function remove(id) {
  return dispatch => {
    ContactsApi.delete(id)
      .then(() => {
        dispatch({ type: ACTION_CONTACT_REMOVE, payload: {data: id} });
      })
      .catch((e) => {
        dispatch({ type: ACTION_CONTACT_REMOVE, payload: {error: e.message} });
      });
  };
};

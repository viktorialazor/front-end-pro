import { 
  ACTION_CONTACT_FETCH_LIST,
  ACTION_CONTACT_ADD, 
  ACTION_CONTACT_UPDATE, 
  ACTION_CONTACT_REMOVE 
} from '../actions/index';

const INITIAL_STATE = {
  error: '',
  contacts: [],
};

export default function rootReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ACTION_CONTACT_FETCH_LIST:
      if (payload.error) {
        return {...state, error: payload.error};
      } else {
        return {...state, error: '', contacts: [...payload.data]};
      }
    case ACTION_CONTACT_ADD:
      if (payload.error) {
        return {...state, error: payload.error};
      } else {
        return {...state, error: '', contacts: [...state.contacts, payload.data]};
      }
    case ACTION_CONTACT_UPDATE:
      if (payload.error) {
        return {...state, error: payload.error};
      } else {
        return {...state, error: '', contacts: state.contacts.map(item => item.id !== payload.data.id ? item : payload.data)};
      }
    case ACTION_CONTACT_REMOVE:
      if (payload.error) {
        return {...state, error: payload.error};
      } else {
        return {...state, error: '', contacts: state.contacts.filter(item => item.id !== payload.data)};
      }
    default:
      return state;
  }
};

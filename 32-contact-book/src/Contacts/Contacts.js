import React, { useEffect, useState } from 'react';
import Form from './Form';
import ContactList from './ContactList';
import style from './Contact.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { add, fetchList, update } from '../store/actions';

export default function Contacts() {
  const DEFAULT_CONTACT = {
    firstName: '',
    lastName: '',
    phone: '',
    id: null
  };

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const errorMessage = useSelector(state => state.error);
  const [fields, setFields] = useState(DEFAULT_CONTACT);

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  function onContactFormSubmit(contactItem) {
    if (contactItem.id) {
      dispatch(update(contactItem.id, contactItem));
    } else {
      dispatch(add(contactItem));
    }
    setFields({...fields, ...DEFAULT_CONTACT});
  };

  function onEditContact(contactItem) {
    setFields({...fields, ...contactItem});
  };

  return (
    
    <div className={style.container}>
      {errorMessage ? <p className={style.error}>{errorMessage}</p> : ''}
      <ContactList 
        contacts={contacts}
        onEdit={onEditContact}
      />
      <Form 
        fields={fields}
        setFields={setFields}
        onSubmit={onContactFormSubmit}
      />
    </div>
  )
};

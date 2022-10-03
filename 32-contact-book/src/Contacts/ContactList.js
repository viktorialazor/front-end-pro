import React from 'react';
import { useDispatch } from 'react-redux';
import { remove } from '../store/actions';
import style from './Contact.module.css';

export default function ContactList({ contacts, onEdit }) {
  const dispatch = useDispatch();
  function onEditClick(e, contactItem) {
    e.stopPropagation();

    onEdit(contactItem);
  };

  function onDeleteClick(e, contactItem) {
    e.stopPropagation();

    dispatch(remove(contactItem.id));
  };

  const contactList = contacts.map((contactItem) => {
    return (<li key={contactItem.id} className={style.list__item} data-id={contactItem.id}>
    <p className={style.list__text}>{contactItem.firstName}</p>
    <p className={style.list__text}>{contactItem.lastName}</p>
    <p className={`${style.list__text} ${style["list__text--phone"]}`}>{contactItem.phone}</p>
    <div className={style.list__buttons}>
      <button 
        className={`${style.list__button} ${style["edit-contact-button"]}`} 
        type="button"
        onClick={e => onEditClick(e, contactItem)}>Edit
      </button>
      <button 
        className={`${style.list__button} ${style["delete-contact-button"]}`} 
        type="button"
        onClick={e => onDeleteClick(e, contactItem)}>Delete
      </button>
    </div>
  </li>);
  });

  return (
    <ol id={style["contact-list"]} className={style.list}>{contactList}</ol>
  );
};

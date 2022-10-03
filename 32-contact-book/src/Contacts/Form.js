import React from 'react';
import style from './Contact.module.css';

export default function Form({ fields, setFields, onSubmit }) {
  function onFormSubmit(e) {
    e.preventDefault();

    onSubmit(fields);
  };

  function onFirstNameChange(e) {
    setFields({...fields, firstName: e.target.value});
  };

  function onLastNameChange(e) {
    setFields({...fields, lastName: e.target.value});
  };

  function onPhoneChange(e) {
    setFields({...fields, phone: e.target.value});
  };

  return (
    <form id={style.form} className={style.form} onSubmit={onFormSubmit}>
      <input id={style["user-id"]} name="id" type="hidden" />
      <label className={style["form__column"]} htmlFor="firstName">
        <span className={style["form__text"]}>Name</span>
        <input 
          id={style["user-first-name"]} 
          className={style["form__input"]} 
          type="text" 
          name="firstName" 
          value={fields.firstName} 
          onChange={onFirstNameChange}
        />
      </label>
      <label className={style["form__column"]} htmlFor="lastName">
        <span className={style["form__text"]}>Surname</span>
        <input 
          id={style["user-last-name"]} 
          className={style["form__input"]} 
          type="text" 
          name="lastName" 
          value={fields.lastName}
          onChange={onLastNameChange}
        />
      </label>
      <label className={style["form__column"]} htmlFor="phone">
        <span className={style["form__text"]}>Phone</span>
        <input 
          id={style["user-phone"]} 
          className={style["form__input"]} 
          type="text" 
          name="phone" 
          value={fields.phone}
          onChange={onPhoneChange}
        />
      </label>
      <div className={style["form__column"]}>
        <span className={style["form__text"]}>Action</span>
        <button id={style["add-contact"]} className={style["form__button"]} type="submit">Add Contact</button>
      </div>
    </form>
  );
};

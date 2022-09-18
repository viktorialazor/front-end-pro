import React, { useState } from 'react';
import style from './App.module.css';

export default function Form({ defaultMessage, editTodo, onSubmit }) {
  const [message, setMessage] = useState(editTodo?.text ?? defaultMessage);

  function onFormSubmit(e) {
    e.preventDefault();

    const newTodoItem = {
      status: false,
      ...editTodo,
      text: message
    };

    onSubmit(newTodoItem);

    setMessage('');
  };

  function onMessageChange(e) {
    setMessage(e.target.value);
  };

  return (
    <form className={style.form} onSubmit={onFormSubmit}>
      <input
      className={style.form__input}
      type="text" name="task"
      value={message}
      onChange={onMessageChange}
      placeholder="Enter your task"
      />
      <button
      className={`${style.form__button} ${style.button}`}
      type="submit">Add to list
      </button>
    </form>
  );
};

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAvailableId, setTodoMessage, setEditTodo, add, update } from '../store/actions/todo';
import style from './Todo.module.css';

export default function Form() {
  const dispatch = useDispatch();
  const currentId = useSelector(state => state.availableId);
  const message = useSelector(state => state.todoMessage);
  const editTodoItem = useSelector(state => state.editTodo);

  function onFormSubmit(e) {
    e.preventDefault();

    if (editTodoItem) {
      const updatedTodo = {
        ...editTodoItem,
        text: message,
      };

      dispatch(update(updatedTodo));
      dispatch(setEditTodo(null));
    } else {
      const newTodoItem = {
        status: false,
        text: message,
        id: currentId.toString(),
      };
  
      dispatch(add(newTodoItem));
      dispatch(setAvailableId());
    }

    dispatch(setTodoMessage(''));
  };

  function onMessageChange(e) {
    dispatch(setTodoMessage(e.target.value));
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

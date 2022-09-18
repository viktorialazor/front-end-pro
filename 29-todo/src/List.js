import React from 'react';
import style from './App.module.css';

export default function List({ todoList, onEdit, onDelete, onStatusChange }) {
  function onEditClick(e, todoItem) {
    e.stopPropagation();

    onEdit(todoItem);
  };

  function onDeleteClick(e, todoItem) {
    e.stopPropagation();

    onDelete(todoItem.id);
  };

  function onTodoTextClick(e, todoItem) {
    e.stopPropagation();

    onStatusChange(todoItem);
  }

  const list = todoList.map((todoItem) => {
    const isDoneClass = todoItem.status ? style.done : '';

    return (<li key={todoItem.id} className={style.list__item}>
      <span 
        className={`${style.list__text} ${isDoneClass}`} 
        onClick={e => onTodoTextClick(e, todoItem)}>{todoItem.text}
      </span>
      <button 
        className={`${style.list__button} ${style.button} ${style["edit-button"]}`} 
        type="button" 
        onClick={e => onEditClick(e, todoItem)}>Edit
      </button>
      <button 
        className={`${style.list__button} ${style.button} ${style["delete-button"]}`} 
        type="button" 
        onClick={e => onDeleteClick(e, todoItem)}>Delete
      </button>
    </li>);
  });


  return (
    <ul className={style.list}>{list}</ul>
  );
};

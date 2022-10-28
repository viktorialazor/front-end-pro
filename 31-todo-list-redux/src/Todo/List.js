import React from 'react';
import { useDispatch } from 'react-redux';
import { setTodoMessage, setEditTodo, update, remove } from '../store/actions/todo';
import style from './Todo.module.css';

export default function List({ todoList }) {
  const dispatch = useDispatch();

  function onEditClick(e, todoItem) {
    e.stopPropagation();

    dispatch(setTodoMessage(todoItem.text));
    dispatch(setEditTodo(todoItem));
  };

  function onDeleteClick(e, todoItem) {
    e.stopPropagation();

    dispatch(remove(todoItem.id));
  };

  function onTodoTextClick(e, todoItem) {
    e.stopPropagation();
  
    const updatedTodoItem = {
      ...todoItem, 
      status: !todoItem.status,
    };

    dispatch(update(updatedTodoItem));
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

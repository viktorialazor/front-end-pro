import React from 'react';
import { useSelector } from 'react-redux';
import Form from './Form';
import List from './List';
import style from './Todo.module.css';

export default function Todo() {
  const todos = useSelector(state => state.todos);

  return (
    <div className={style.container}>
      <List 
        todoList={todos}
      />
      <Form />
    </div>
  )
};

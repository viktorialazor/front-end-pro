import React from 'react';
import useTodo from './useTodo.js';
import Form from './Form.js';
import List from './List.js';
import style from './App.module.css';

export default function TodoList({ defaultMessage, defaultTodoList }) {
  const { error, todoList, editTodo, setEditTodo, onDelete, onStatusChange, onTodoFormSubmit } = useTodo(defaultTodoList);

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className={style.container}>
      <List 
        todoList={todoList}
        onEdit={setEditTodo}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
      <Form
        key={editTodo?.id} 
        defaultMessage={defaultMessage}
        editTodo={editTodo} 
        onSubmit={onTodoFormSubmit}
      />
    </div>
  )
};

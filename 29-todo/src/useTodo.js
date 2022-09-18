import { useState, useEffect } from 'react';
import TodoApi from './TodoApi.js';

export default function useTodo(defaultTodoList) {
  const [error, setError] = useState('');
  const [todoList, setTodo] = useState(defaultTodoList);
  const [editTodo, setEditTodo] = useState();
  const DEFAULT_TODO = {
    status: false,
    text: '',
  };

  function showError(e) {
    setError(e.message);
  };

  useEffect(() => {
    TodoApi.getList()
      .then(setTodo)
      .catch(showError);
  }, []);

  function onDelete(id) {
    TodoApi.delete(id)
      .then((deletedTodo) => {
        const updatedTodos = todoList.filter(todoItem => todoItem.id !== deletedTodo.id);

        setTodo(updatedTodos);

        if (id === editTodo?.id) {
          setEditTodo(DEFAULT_TODO);
        }
      })
      .catch(showError);
  };

  function onStatusChange(todo) {
    const changes = {
      status: !todo.status,
    };

    TodoApi.update(todo.id, changes)
      .then((newTodo) => {
        const updatedTodos = todoList.map(todoItem => todoItem.id === newTodo.id ? newTodo : todoItem);

        setTodo(updatedTodos);

        if (todo.id === editTodo?.id) {
          setEditTodo(newTodo);
        }
      })
      .catch(showError);
  };

  function onTodoFormSubmit(todo) {
    if (todo.id) {
      TodoApi.update(todo.id, todo)
        .then((newTodo) => {
          const updatedTodos = todoList.map(todoItem => todoItem.id === newTodo.id ? newTodo : todoItem);

          setTodo(updatedTodos);
          setEditTodo(DEFAULT_TODO);
        })
        .catch(showError);
    } else {
      TodoApi.create(todo)
      .then(newTodo => {
        setTodo([...todoList, newTodo]);
      })
      .catch(showError);
    }
  };

  return { error, todoList, editTodo, setEditTodo, onDelete, onStatusChange, onTodoFormSubmit };
};

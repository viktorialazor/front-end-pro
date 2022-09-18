import React from 'react';
import TodoList from './TodoList.js';

function App() {
  const INITIAL_TODO_LIST = [
    {
      status: false,
      text: "Default todo 1",
      id: "1"
    },
    {
      status: false,
      text: "Default todo 2",
      id: "2"
    },
  ];
  
  return (<TodoList defaultMessage={'Hello World'} defaultTodoList={INITIAL_TODO_LIST} />);
};

export default App;

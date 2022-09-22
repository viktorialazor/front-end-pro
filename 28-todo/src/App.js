import React, { useState } from 'react';
import style from './App.module.css';

function Todo() {
  const [message, setMessage] = useState('');
  const [items, setItem] = useState([
    'Task 1',
    'Task 2'
  ]);

  function onAddBtnClick() {
    setItem([...items, message]);
    setMessage('');
  };

  function onMessageChange(e) {
    setMessage(e.target.value);
  };

  const list = items.map((item, index) => <li key={index} className={style.list__item}>
    <span className={style.list__text}>{item}</span>
  </li>);

  return (
    <div className={style.container}>
      <ul className={style.list}>{list}</ul>
      <div className={style.form}>
        <input className={style.form__input} type="text" name="task" value={message} onChange={onMessageChange}placeholder="Enter your task" />
        <button className={`${style.form__button} ${style.button}`} type="button" onClick={onAddBtnClick}>Add to list</button>
      </div>
    </div>
  )
};

function App() {
  return (<Todo />);
};

export default App;

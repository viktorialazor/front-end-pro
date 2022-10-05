import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import UserApi from './UserApi';
import style from './App.module.css';

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const usersPath = 'users';

  function showError(e) {
    setError(e.message);
  };

  useEffect(() => {
    UserApi.getList(usersPath)
      .then(setUsers)
      .catch(showError);
  }, []);

  const userList = users.map((userItem) => {
    return (
      <li key={userItem.id} className={style.albums__item} data-id={userItem.id}>
        <span className={style.albums__text}>{userItem.name}</span>
        <button 
          onClick={() => {
          navigate(`/albums?userId=${userItem.id}`);
          }} 
          className={style.albums__button} 
          type="button">Albums
        </button>
      </li>
    );
  });

  return (
    <>
      {error ? <p className={style.error}>{error}</p> : ''}
      <ol id={style["album-list"]} className={`${style.albums__column} ${style.albums__list}`}>{userList}</ol>
    </>
  );
}

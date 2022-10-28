import React, { useState, useEffect } from 'react';
import Form from './Form';
import UserList from './UserList';
import UsersApi from './UsersApi';

export default function Users() {
  const [users, setUser] = useState([]);
  const [error, setError] = useState('');

  function showError(e) {
    setError(e.message);
  };

  useEffect(() => {
    UsersApi.getList()
      .then(setUser)
      .catch(showError);
  }, []);

  function onUserFormSubmit(user) {
    UsersApi.create(user)
      .then(newUser => setUser([...users, newUser]))
      .catch(showError);
  };

  return (
    <>
      <Form onFormSubmit={onUserFormSubmit} />
      {error ? <p>{error}</p> : ''}
      <UserList users={users} />
    </>
  )
};

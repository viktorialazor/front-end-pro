import React from 'react';
import styles from './App.module.css';

export default function UserList({ users }) {
  const userList = users.map((user) => {
    return (<li key={user.id} className={styles.list__item} data-id={user.id}>
        <span className={`${styles.list__text} ${styles["list__text--name"]}`}>{user.name}</span>
        <span className={styles.list__text}>{user.email}</span>
        <span className={styles.list__text}>{user.phone}</span>
      </li>);
    });

  return (
    <ul className={styles.list}>{userList}</ul>
  );
};

import React, { useState, useEffect }  from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserApi from './UserApi';
import style from './App.module.css';

export default function AlbumList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState('');

  const userId = searchParams.get('userId');
  const albumsPath = `albums?userId=${userId}`;

  function showError(e) {
    setError(e.message);
  };

  useEffect(() => {
    if (userId) {
      UserApi.getAlbums(albumsPath)
        .then(setAlbums)
        .catch(showError);
    }
  }, [userId, albumsPath]);

  const albumList = albums.map((albumItem) => {
    return (
      <li key={albumItem.id} className={style.albums__item} data-id={albumItem.id}>
        <span className={style.albums__text}>{albumItem.title}</span>
        <button 
          onClick={() => {navigate(`/photos?albumId=${albumItem.id}`)}} 
          className={style.albums__button} 
          type="button">Photos
        </button>
      </li>
    );
  });

  return (
    <>
      {error ? <p className={style.error}>{error}</p> : ''}
      <button onClick={() => navigate(-1)} className={`${style.albums__button} ${style["albums__button--back"]}`} type="button">Back</button>
      <ol id={style["album-list"]} className={`${style.albums__column} ${style.albums__list}`}>{albumList}</ol>
    </>
  );
}

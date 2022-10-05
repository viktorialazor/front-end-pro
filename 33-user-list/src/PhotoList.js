import React, { useState, useEffect }  from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import UserApi from './UserApi';
import style from './App.module.css';

export default function PhotoList() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const albumId = searchParams.get('albumId');
  const ptotosPath = `photos?albumId=${albumId}`;

  function showError(e) {
    setError(e.message);
  };

  useEffect(() => {
    if (albumId) {
      UserApi.getPhotos(ptotosPath)
        .then(setPhotos)
        .catch(showError);
    }
  }, [albumId, ptotosPath]);

  const photoList = photos.map((photoItem) => {
    return (
      <img key={photoItem.id} className={style["album-images__item"]} src={photoItem.url} alt={photoItem.id} />
    );
  });

  return (
    <>
      {error ? <p className={style.error}>{error}</p> : ''}
      <button onClick={() => navigate(-1)} className={`${style.albums__button} ${style["albums__button--back"]}`} type="button">Back</button>
      <div id={style["album-images"]} className={`${style.albums__column} ${style["album-images"]}`}>{photoList}</div>
    </>
  );
}

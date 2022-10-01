import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getAlbumsAction, userActions } from '@/store/actions/userActions';
import { selectAlbums } from '@/store/selectors/userSelector';
import AlbumItem from '@/components/Album/AlbumItem';
import Loader from '@/components/Loader';
import PageWrapper from '@/components/PageWrapper';

const Albums = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);

  const onAlbumClick = (id: string) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    dispatch(getAlbumsAction());

    return () => {
      dispatch(userActions.setAlbums([]));
    }
  }, []);

  return (
    <PageWrapper>
      {albums?.length ? (
        <>
          {albums.map((el, i) => (
            <AlbumItem
              key={`${el.name}_${i}`}
              id={el.id}
              name={el.name}
              location={el.location}
              date={el.date}
              onClick={() => onAlbumClick(el.id)}
            />
          ))}
        </>
      ) : <Loader />}
    </PageWrapper>
  );
};

export default Albums;

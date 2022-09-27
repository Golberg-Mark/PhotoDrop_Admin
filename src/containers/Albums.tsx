import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getAlbumsAction, userActions } from '@/store/actions/userActions';
import { selectAlbums } from '@/store/selectors/userSelector';
import AlbumItem from '@/components/Album/AlbumItem';
import Loader from '@/components/Loader';
import PageWrapper from '@/components/PageWrapper';

interface Props {
  isLoggedIn: boolean
}

const Albums: React.FC<Props> = ({ isLoggedIn }) => {
  if (!isLoggedIn) return <Navigate to="/auth" replace />;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);

  const onAlbumClick = (albumName: string) => {
    navigate(`/${albumName}`, {
      replace: false,
      state: albumName
    });
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
              name={el.name}
              location={el.location}
              date={el.date}
              onClick={() => onAlbumClick(el.name)}
            />
          ))}
        </>
      ) : <Loader />}
    </PageWrapper>
  );
};

export default Albums;

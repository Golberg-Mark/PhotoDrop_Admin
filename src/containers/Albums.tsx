import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getAlbumsAction, userActions } from '@/store/actions/userActions';
import { selectAlbums } from '@/store/selectors/userSelector';
import AlbumItem from '@/components/Album/AlbumItem';
import Loader from '@/components/Loader';
import PageWrapper from '@/components/PageWrapper';
import useToggle from '@/hooks/useToggle';
import CreateAlbum from '@/components/CreateAlbum';

interface Props {
  isLoggedIn: boolean
}

const Albums: React.FC<Props> = ({ isLoggedIn }) => {
  if (!isLoggedIn) return <Navigate to="/auth" replace />;

  const [isCreateModalVisible, toggleIsCreateModalVisible] = useToggle();
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

  useEffect(() => {
    if (isCreateModalVisible) toggleIsCreateModalVisible();
  }, [albums]);

  return (
    <>
      <PageWrapper>
        {albums?.length ? (
          <>
            <CreateAlbumButton>
              <PlusButton onClick={toggleIsCreateModalVisible}>
                +
              </PlusButton>
            </CreateAlbumButton>
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
      {isCreateModalVisible ? <CreateAlbum hide={toggleIsCreateModalVisible} /> : null}
    </>
  );
};

const CreateAlbumButton = styled.div`
  position: absolute;
  top: 10px;
  right: 40px;
`;

const PlusButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #3300CC;
  font-size: 30px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  
  :focus {
    outline: none;
  }
  
  :hover {
    opacity: .7;
  }
`;

export default Albums;

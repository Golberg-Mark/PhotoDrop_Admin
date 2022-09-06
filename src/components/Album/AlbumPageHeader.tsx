import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { SelectedAlbum } from '@/store/reducers/user';
import { userActions } from '@/store/actions/userActions';
import BackIcon from '@/icons/BackIcon';

interface Props {
  album: SelectedAlbum,
  photosCountStr: string
}

const AlbumPageHeader: React.FC<Props> = ({ album, photosCountStr }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goBack = () => {
    dispatch(userActions.setSelectedAlbum(null));
    navigate('/', {
      replace: false
    });
  };

  return (
    <PageHeader>
      <BackButton onClick={goBack}>
        <BackIcon />
      </BackButton>
      <InfoAndButton>
        <AlbumInfo>
          <AlbumName>{album.name}</AlbumName>
          {album.photos?.length ? (
            <div>
              <span>{album.date}</span>
              <span> • </span>
              <PhotosCount>{`${album.photos.length} ${photosCountStr}`}</PhotosCount>
            </div>
          ) : <span>{album.date}</span>}
        </AlbumInfo>
      </InfoAndButton>
    </PageHeader>
  );
};

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  max-width: 1280px;
  padding: 19px 40px;
  border-bottom: 1px solid #F1F0EC;
`;

const BackButton = styled.div`
  padding-right: 70px;
  cursor: pointer;
`;

const InfoAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AlbumInfo = styled.div`
  display: flex;
  align-items: baseline;
  grid-gap: 40px;
`;

const AlbumName = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const PhotosCount = styled.span`
  color: #3300CC;
`;

export default AlbumPageHeader;

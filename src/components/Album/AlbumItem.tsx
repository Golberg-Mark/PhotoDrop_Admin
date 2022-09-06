import React from 'react';
import styled from 'styled-components';
import { MdPhotoLibrary } from 'react-icons/md';

import { Album } from '@/store/reducers/user';

interface Props extends Album {
  onClick: () => void
}

const AlbumItem: React.FC<Props> = ({ name, location, onClick }) => {
  return (
    <AlbumContainer onClick={onClick}>
      <MdPhotoLibrary size={40} />
      <div>
        <AlbumName>{name}</AlbumName>
        <AlbumLocation>{location}</AlbumLocation>
      </div>
    </AlbumContainer>
  );
};

const AlbumContainer = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 20px;
  margin: 0 auto;
  padding: 20px 10px;
  max-width: 800px;
  min-width: 500px;
  border-bottom: 1px solid #DDD;
  cursor: pointer;
  
  :last-child {
    border-bottom: none;
  }
`;

const AlbumName = styled.p`
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 700;
  overflow-wrap: anywhere;
`;

const AlbumLocation = styled.p`
  font-size: 18px;
  overflow-wrap: anywhere;
`;

export default AlbumItem;

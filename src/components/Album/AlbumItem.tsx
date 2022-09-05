import React from 'react';
import styled from 'styled-components';

import { Album } from '@/store/reducers/user';
import AlbumIcon from '@/icons/AlbumIcon';

interface Props extends Album {
  onClick: () => void
}

const AlbumItem: React.FC<Props> = ({ name, location, onClick }) => {
  return (
    <AlbumContainer onClick={onClick}>
      <AlbumIcon />
      <div>
        <AlbumName>{name}</AlbumName>
        <AlbumLocation>{location}</AlbumLocation>
      </div>
    </AlbumContainer>
  );
};

const AlbumContainer = styled.div`
  display: flex;
  grid-gap: 20px;
  margin: 0 auto 20px auto;
  padding: 10px;
  max-width: 800px;
  min-width: 500px;
  border: 1px solid #333;
  border-radius: 3px;
  cursor: pointer;
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

const AlbumDate = styled.p`
  align-self: flex-end;
`;

export default AlbumItem;

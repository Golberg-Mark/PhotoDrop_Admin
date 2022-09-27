import React, { useEffect } from 'react';
import styled from 'styled-components';
import Logo from '@/icons/Logo';
import { useSelector } from 'react-redux';
import { selectAlbums, selectIsHeaderVisible } from '@/store/selectors/userSelector';
import { useLocation } from 'react-router';
import useToggle from '@/hooks/useToggle';
import CreateAlbum from '@/components/CreateAlbum';

const Header = () => {
  const [isCreateModalVisible, toggleIsCreateModalVisible] = useToggle();
  const { pathname } = useLocation();
  const isVisible = useSelector(selectIsHeaderVisible);
  const albums = useSelector(selectAlbums);

  useEffect(() => {
    toggleIsCreateModalVisible(false);
  }, [albums]);

  return (
    <Container isVisible={isVisible}>
      <Logo />
      {pathname === '/' ? (
        <CreateAlbumButton>
          <PlusButton onClick={toggleIsCreateModalVisible}>
            +
          </PlusButton>
        </CreateAlbumButton>
      ) : ''}
      {isCreateModalVisible ? <CreateAlbum hide={toggleIsCreateModalVisible} /> : null}
    </Container>
  );
};

const Container = styled.header<{ isVisible: boolean }>`
  display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  padding: 19px 40px;
  height: 60px;
  border-bottom: 1px solid #F1F0EC;
  
  div {
    margin: 0 auto;
  }
`;

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

export default Header;

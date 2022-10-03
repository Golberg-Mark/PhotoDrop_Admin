import React, { useEffect } from 'react';
import styled from 'styled-components';
import Logo from '@/icons/Logo';
import { useSelector } from 'react-redux';
import { selectAlbum, selectAlbums, selectIsHeaderVisible } from '@/store/selectors/userSelector';
import { useLocation } from 'react-router';
import useToggle from '@/hooks/useToggle';
import CreateAlbum from '@/components/CreateAlbum';
import AlbumPageHeader from '@/components/Album/AlbumPageHeader';

const Header = () => {
  const [isCreateModalVisible, toggleIsCreateModalVisible] = useToggle();
  const { pathname } = useLocation();
  const isVisible = useSelector(selectIsHeaderVisible);
  const albums = useSelector(selectAlbums);
  const selectedAlbum = useSelector(selectAlbum);

  useEffect(() => {
    toggleIsCreateModalVisible(false);
  }, [albums]);

  const getContent = () => {
    const isAlbum = new RegExp(/^\/album\/.*$/).test(pathname);

    if (selectedAlbum && isAlbum) return (
      <Container isVisible>
        <Content>
          <AlbumPageHeader album={selectedAlbum} photosCount={selectedAlbum.countPhotos} />
        </Content>
      </Container>
    );

    if (!isAlbum ) return (
      <Container isVisible={isVisible}>
        <Content>
          <Logo />
          {pathname === '/' && albums ? (
            <CreateAlbumButton>
              <PlusButton onClick={toggleIsCreateModalVisible}>
                +
              </PlusButton>
            </CreateAlbumButton>
          ) : ''}
        </Content>
        {isCreateModalVisible ? <CreateAlbum hide={toggleIsCreateModalVisible} /> : null}
      </Container>
    );
  };

  return getContent();
};

const Container = styled.header<{ isVisible: boolean }>`
  display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  padding: 18px 40px;
  height: 60px;
  border-bottom: 1px solid #F1F0EC;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
`;

const CreateAlbumButton = styled.div`
  position: absolute;
  top: -9px;
  right: -20px;
  user-select: none;
  
  @media (min-width: 768px) {
    right: 40px;
  }
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

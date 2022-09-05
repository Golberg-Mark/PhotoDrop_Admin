import React from 'react';
import styled from 'styled-components';
import Logo from '@/icons/Logo';
import { useSelector } from 'react-redux';
import { selectIsHeaderVisible } from '@/store/selectors/userSelector';

const Header = () => {
  const isVisible = useSelector(selectIsHeaderVisible);

  return (
    <Container isVisible={isVisible}>
      <Logo />
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

export default Header;

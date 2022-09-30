import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { normalize } from 'styled-normalize';

import Albums from '@/containers/Albums';
import Auth from '@/containers/Auth';
import { selectIsLoggedIn } from '@/store/selectors/userSelector';
import Header from '@/components/Header';
import FuturaPtRegular from '@/fonts/futura-pt-book.ttf';
import FuturaPtBold from '@/fonts/futura-pt-bold.ttf';
import FuturaPtMedium from '@/fonts/futura-pt-medium.ttf';
import AlbumPage from '@/containers/AlbumPage';
import { selectErrorMessage } from '@/store/selectors/errorSelector';
import ErrorModalWindow from '@/containers/ErrorModalWindow';
import { userActions } from '@/store/actions/userActions';

const GlobalStyle = createGlobalStyle`
  ${normalize};

  @font-face {
    font-family: 'FuturaPT';
    src: url(${FuturaPtRegular}) format('truetype');
    font-weight: 400;
  }

  @font-face {
    font-family: 'FuturaPT';
    src: url(${FuturaPtBold}) format('truetype');
    font-weight: 700;
  }

  @font-face {
    font-family: 'FuturaPT';
    src: url(${FuturaPtMedium}) format('truetype');
    font-weight: 500;
  }
  
  * {
    box-sizing: border-box;
    font-family: 'FuturaPT', 'Arial', sans-serif;
    color: #333;
  }
  
  body {
    margin: 0;
    max-height: 100vh;
    height: 100%;
    font-size: 16px;
  }
  
  img {
    width: 100%;
    height: auto;
  }
  
  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const errorMessage = useSelector(selectErrorMessage);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) dispatch(userActions.setIsLoggedIn(true));
  }, []);

  return (
    <>
      <Header />
      <GlobalContainer>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Albums isLoggedIn={isLoggedIn} />} />
          <Route path="/:name" element={<AlbumPage isLoggedIn={isLoggedIn} />} />
          <Route path="/auth" element={<Auth isLoggedIn={isLoggedIn} />} />
        </Routes>
        {errorMessage ? <ErrorModalWindow error={errorMessage} /> : ''}
      </GlobalContainer>
    </>
  );
};

const GlobalContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1440px;
  height: calc(100vh - 60px);
`;

export default App;

import React from 'react';
import styled from 'styled-components';

const BackIcon = () => {
  return (
    <StyledSvg width="8" height="17" viewBox="0 0 8 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd"
            d="M7.74585 16.32C8.05516 16.0556 8.08651 15.5961 7.81586 15.2938L1.73303 8.5L7.81586 1.70619C8.08651 1.40391 8.05517 0.944451 7.74585 0.679955C7.43654 0.415459 6.9664 0.446089 6.69575 0.74837L0.184129 8.02109C-0.0613766 8.29529 -0.0613766 8.70471 0.184129 8.97891L6.69575 16.2516C6.9664 16.5539 7.43654 16.5845 7.74585 16.32Z"
            fill="#262626"/>
    </StyledSvg>
  );
};

const StyledSvg = styled.svg`
  cursor: pointer;
`;

export default BackIcon;

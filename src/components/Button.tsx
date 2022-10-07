import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number,
  isAlternativeStyle?: boolean
}

const Button: React.FC<Props> = ({
  children,
  width = 420,
  isAlternativeStyle = false,
  ...props
}) => {
  return (
    <StyledButton width={width} { ...props } isAlternativeStyle={isAlternativeStyle}>
      { children }
    </StyledButton>
  );
};

const StyledButton = styled.button<{ width: number, isAlternativeStyle: boolean }>`
  padding: 17px;
  width: 100%;
  max-width: ${({ width }) => `${width}px`};
  height: 50px;
  font-size: 18px;
  text-align: center;
  color: #FFF;
  font-weight: 500;
  background-color: #3300CC;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: .2s;
  
  :hover {
    opacity: .7;
  }
  
  :disabled {
    opacity: .33;
    cursor: default;
  }
  
  ${({ isAlternativeStyle }) => isAlternativeStyle ? css`
    color: #3300CC;
    border: 1px solid #3300CC;
    background-color: #fff;
  ` : ''}
`;

export default Button;

import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  width?: number
}

const Input: React.FC<Props> = ({ label, width, ...props }) => {
  return (
    <StyledInput width={width} {...props} />
  );
};

const StyledInput = styled.input<{ width?: number }>`
  padding: 15px 13px;
  width: 100%;
  max-width: ${({ width }) => `${width || 420}px`};
  height: 40px;
  border-radius: 10px;
  border: 1px solid #EEE;
  background-color: #F4F4F4;
  
  :focus {
    outline: none;
    border-color: #3300CC;
  }
`;

export default Input;

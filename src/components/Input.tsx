import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  width?: number,
  value: string
}

const Input: React.FC<Props> = ({ label, width, ...props }) => {
  return (
    <StyledInput
      width={width}
      style={{ cursor: props.type === 'date' ? 'pointer' : 'auto' }}
      {...props}
    />
  );
};

const StyledInput = styled.input<{ width?: number, type?: string, value: string }>`
  padding: 15px 13px;
  width: 100%;
  max-width: ${({ width }) => `${width || 420}px`};
  height: 40px;
  border-radius: 10px;
  border: 1px solid #EEE;
  background-color: #F4F4F4;
  transition: .1s ease-in-out;
  letter-spacing: ${({ type, value }) => type === 'password' ? value?.length ? '-5px' : 'normal' : 'normal'};
  
  :hover {
    background-color: #E7E7E7;
  }
  
  :focus {
    outline: none;
    border-color: #3300CC;
  }
`;

export default Input;

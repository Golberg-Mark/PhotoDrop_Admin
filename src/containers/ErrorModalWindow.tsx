import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Button from '@/components/Button';
import { errorActions } from '@/store/actions/errorActions';
import Background from '@/components/Background';

interface Props {
  error: string
}

const ErrorModalWindow: React.FC<Props> = ({ error }) => {
  const dispatch = useDispatch();

  const hideModalWindow = () => {
    dispatch(errorActions.setErrorMessage(null));
  };

  return (
    <Background onClick={hideModalWindow}>
      <ModalWindow onClick={(evt) => evt.stopPropagation()}>
        <p>{error}</p>
        <Button onClick={hideModalWindow}>
          Okay
        </Button>
      </ModalWindow>
    </Background>
  );
};

const ModalWindow = styled.div`
  padding: 40px 30px 20px 30px;
  width: 400px;
  background-color: #fff;
  cursor: auto;
  
  p {
    margin-bottom: 20px;
    font-size: 22px;
  }
`;

export default ErrorModalWindow;

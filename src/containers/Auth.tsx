import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router';

import Header from '@/components/Header';
import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '@/store/actions/userActions';
import Loader from '@/components/Loader';
import { selectErrorMessage } from '@/store/selectors/errorSelector';

interface Props {
  isLoggedIn: boolean
}

const Auth: React.FC<Props> = ({ isLoggedIn }) => {
  if (isLoggedIn) return <Navigate to="/" replace />
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [email, setEmail] = useInput('', 20);
  const [password, setPassword] = useInput('', 20);

  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  const isFormCorrect = !!(
    (email.length && email.length <= 20)
    && (password.length && password.length <= 20 && password.length >= 8));

  const submit = () => {
    if (isFormCorrect) {
      setIsButtonPressed(true);
      dispatch(loginAction({ username: email, password }));
    }
  }

  useEffect(() => {
    const enterListener = (evt: KeyboardEvent) => {
      if (evt.key === 'Enter') submit();
    };

    window.addEventListener('keypress', enterListener);

    return () => {
      window.removeEventListener('keypress', enterListener);
    }
  });

  useEffect(() => {
    if (errorMessage) setIsButtonPressed(false);
  }, [errorMessage]);

  return (
    <Container>
      <Input
        value={email}
        onChange={setEmail}
        placeholder="Login"
        maxLength={20}
        autoFocus={true}
      />
      <Input
        value={password}
        onChange={setPassword}
        type="password"
        placeholder="Password"
        maxLength={20}
      />
      <Button
        disabled={!isFormCorrect}
        style={{ marginTop: '20px' }}
        onClick={submit}
      >
        { isButtonPressed ? <Loader size={16}/> : 'Login' }
      </Button>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: -100px;
  height: 100%;
`;

export default Auth;

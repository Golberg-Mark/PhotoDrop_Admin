import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '@/store/actions/userActions';
import Loader from '@/components/Loader';
import { selectErrorMessage } from '@/store/selectors/errorSelector';

const Auth = () => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [email, setEmail] = useInput('', 20);
  const [password, setPassword] = useInput('', 20);

  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  const isFormCorrect = !!(
    (email.length && email.length <= 20)
    && (password.length && password.length <= 20 && password.length >= 8));

  const submit = (evt?: FormEvent<HTMLFormElement>) => {
    if (evt) evt.preventDefault();

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
    <Container onSubmit={submit}>
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
        type="submit"
        style={{ marginTop: '20px' }}
      >
        { isButtonPressed ? <Loader /> : 'Login' }
      </Button>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: -100px;
  padding: 0 15px;
  height: 100%;
`;

export default Auth;

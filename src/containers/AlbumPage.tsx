import React, { useEffect, useState } from 'react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import { Client } from '@/store/reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectAlbum } from '@/store/selectors/userSelector';
import { getSelectedAlbumAction, userActions } from '@/store/actions/userActions';
import { useParams } from 'react-router';
import Loader from '@/components/Loader';
import styled from 'styled-components';
import InputNumber from '@/components/InputNumber';
import Button from '@/components/Button';
import useToggle from '@/hooks/useToggle';
import UppyUploader from '@/components/UppyUploader';

const AlbumPage = () => {
  const [numbers, setNumbers] = useState<Client[]>([{
    countryCode: '',
    phoneNumber: ''
  }]);
  const [isLoadingFinished, toggleIsLoadingFinished] = useToggle();
  const [focusedInput, setFocusedInput] = useState<number>();

  const album = useSelector(selectAlbum);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedAlbumAction(params.id!));

    return () => {
      dispatch(userActions.setSelectedAlbum(null));
    }
  }, []);

  useEffect(() => {

  }, [numbers]);

  const changeNumbers = (i: number, phoneObj: Client) => {
    setNumbers(prevState => {
      const newArr = [...prevState];
      newArr[i] = phoneObj;

      return newArr;
    });
    setFocusedInput(i);
  };

  const addNewNumber = () => {
    const { countryCode, phoneNumber } = numbers[numbers.length - 1];

    if (countryCode.length && phoneNumber.length) {
      setNumbers(prevState => [...prevState, {
        countryCode: '',
        phoneNumber: ''
      }]);
    }
    dispatch(userActions.setClients(null));
  };

  const resetAll = () => {
    if (album) {
      setNumbers([{ countryCode: '', phoneNumber: '' }]);
      toggleIsLoadingFinished(true);
      dispatch(userActions.setClients(null));
    }
  };

  let correctNumbers = numbers.filter((el) => {
    const regexp = new RegExp(/^(\+\d{10,15})$/);
    const phone = el.countryCode + el.phoneNumber;
    return phone !== '' && regexp.test(phone);
  });

  return album ? (
    <StyledAlbumPage>
      <UppyUploader numbers={correctNumbers} album={album} resetAll={resetAll} />
      {numbers.map((_, i) => (
        <InputNumber
          phonePosition={i}
          isFocused={focusedInput ===  i}
          loadingFinished={isLoadingFinished}
          toggleIsLoadingFinished={toggleIsLoadingFinished}
          onChange={changeNumbers} key={`phone_${i}`}
        />
      ))}
      <StyledButton
        isAlternativeStyle
        onClick={addNewNumber}
        disabled={!numbers[numbers.length - 1].phoneNumber.length && !numbers[numbers.length - 1].countryCode.length}
      >
        Add new number
      </StyledButton>
    </StyledAlbumPage>
  ) : <Loader />;
};

const StyledAlbumPage = styled.div`
  padding: 40px 15px;
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;
`;

export default AlbumPage;

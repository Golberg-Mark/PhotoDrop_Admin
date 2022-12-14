import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import useInput from '@/hooks/useInput';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import useToggle, { HandleToggle } from '@/hooks/useToggle';
import { selectClients } from '@/store/selectors/userSelector';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { searchClientAction, userActions } from '@/store/actions/userActions';
import { Client } from '@/store/reducers/user';

interface Props {
  phonePosition: number,
  isFocused: boolean,
  loadingFinished: boolean,
  toggleIsLoadingFinished: HandleToggle,
  onChange: (i: number, phoneObj: Client) => void
}

const InputNumber: React.FC<Props> = ({
  phonePosition,
  isFocused,
  loadingFinished,
  toggleIsLoadingFinished,
  onChange
}) => {
  const dispatch = useDispatch();

  const [selectedCode, setSelectedCode] = useInput('+', 5, 'code', 1);
  const [phoneNumber, setPhoneNumber] = useInput('', 10, 'phone');
  const [isClientsVisible, toggleIsClientsVisible] = useToggle();
  const onClickOutside = useOnClickOutside<HTMLUListElement>(() => {
    toggleIsClientsVisible(false);
    dispatch(userActions.setClients(null));
  });

  const clients = useSelector(selectClients);

  useEffect(() => {
    const phoneNum = selectedCode + phoneNumber;

    if (phoneNumber.length >= 9 && selectedCode.length >= 2) {
      onChange(phonePosition, {
        countryCode: selectedCode,
        phoneNumber
      });
    } else onChange(phonePosition, {
      countryCode: '',
      phoneNumber: ''
    });

    if (phoneNum.length > 1) {
      dispatch(searchClientAction(selectedCode.replace('+', '%2B') + phoneNumber));
    } else dispatch(userActions.setClients(null));

    if (clients && phoneNum === (clients[0].countryCode + clients[0].phoneNumber)) {
      toggleIsClientsVisible(false);
    }
  }, [phoneNumber, selectedCode]);

  useEffect(() => {
    if (clients?.length && (selectedCode + phoneNumber) !== (clients[0].countryCode + clients[0].phoneNumber)) {
      toggleIsClientsVisible(true);
    }
  }, [clients]);

  useEffect(() => {
    if (loadingFinished) {
      setSelectedCode('+');
      setPhoneNumber('');
      toggleIsLoadingFinished(false);
    }
  }, [loadingFinished]);

  const pickNumber = (number: Client) => {
    setSelectedCode(number.countryCode);
    setPhoneNumber(number.phoneNumber);
    toggleIsClientsVisible(false);
  };

  return (
    <StyledInputNumber>
      <InputContainer>
        <StyledPhoneInput value={selectedCode} onChange={setSelectedCode} maxLength={5} />
        <StyledPhoneInput value={formatPhoneNumber(phoneNumber)} onChange={setPhoneNumber} maxLength={14} />
      </InputContainer>
      {isClientsVisible && clients && isFocused ? (
        <Clients ref={onClickOutside}>
          {clients.map((el) => (
            <li key={el.countryCode + el.phoneNumber} onClick={() => pickNumber(el)}>
              {`${el.countryCode} ${formatPhoneNumber(el.phoneNumber)}${el.name ? ` ??? ${el.name}` : ''}`}
            </li>
          ))}
        </Clients>
      ) : null}
    </StyledInputNumber>
  );
};

const StyledInputNumber = styled.div`
  position: relative;
  margin: 0 auto 10px;
  max-width: 420px;
  height: 42px;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.2fr;
`;

const StyledPhoneInput = styled.input`
  padding: 10px 18px;
  height: 42px;
  border: 1px solid #ccc;

  :first-child {
    width: 100%;
    border-right: none;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
  }

  :last-child {
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
  }
  
  :focus {
    outline: none;
    border-color: #3300CC;
  }
  
  :first-child:focus + :last-child {
    border-left-color: #3300CC;
  }
`;

const Clients = styled.ul`
  position: absolute;
  top: 52px;
  right: 0;
  left: 0;
  padding: 10px;
  height: auto;
  max-height: 240px;
  border-radius: 10px;
  box-shadow: 0 5px 15px 0 rgba(0,0,0,0.25);
  background-color: #fff;
  overflow-y: auto;
  z-index: 1;
  
  li {
    padding: 5px 0;
    font-size: 18px;
    
    :hover {
      color: #3300CC;
      cursor: pointer;
    }
  }
`;

export default InputNumber;

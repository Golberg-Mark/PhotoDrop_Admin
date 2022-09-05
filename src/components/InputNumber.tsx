import React, { useEffect } from 'react';
import styled from 'styled-components';

import useInput from '@/hooks/useInput';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import useToggle from '@/hooks/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import { selectClients } from '@/store/selectors/userSelector';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { searchClientAction, userActions } from '@/store/actions/userActions';
import { PhoneNumber } from '@/store/reducers/user';

interface Props {
  phonePosition: number,
  isFocused: boolean,
  loadingFinished: boolean,
  onChange: (i: number, phoneObj: PhoneNumber) => void
}

const InputNumber: React.FC<Props> = ({ phonePosition, isFocused, loadingFinished, onChange }) => {
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
    }

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
    }
  }, [loadingFinished]);

  const pickNumber = (number: PhoneNumber) => {
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
              {`${el.countryCode}${el.phoneNumber}`}
            </li>
          ))}
        </Clients>
      ) : null}
    </StyledInputNumber>
  );
};

const StyledInputNumber = styled.div`
  position: relative;
  margin-bottom: 10px;
  height: 42px;
`;

const InputContainer = styled.div`
  display: flex;
`;

const StyledPhoneInput = styled.input`
  padding: 10px 20px;
  height: 42px;
  border: 1px solid #ccc;

  :first-child {
    width: 100px;
    border-right: none;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
  }

  :last-child {
    width: 320px;
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
  padding: 10px 0;
  height: auto;
  max-height: 240px;
  background-color: #fff;
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

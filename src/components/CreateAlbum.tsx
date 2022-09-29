import React from 'react';
import styled from 'styled-components';

import Background from '@/components/Background';
import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createAlbumAction } from '@/store/actions/userActions';
import { selectIsAlbumCreating } from '@/store/selectors/userSelector';
import Loader from '@/components/Loader';
import { HandleToggle } from '@/hooks/useToggle';
import CloseIcon from '@/icons/CloseIcon';
import useModalWindow from '@/hooks/useModalWindow';

interface Props {
  hide: HandleToggle
}

const CreateAlbum: React.FC<Props> = ({ hide }) => {
  const [name, setName] = useInput('', 100);
  const [location, setLocation] = useInput('', 200);
  const [date, setDate] = useInput('', 10);

  useModalWindow();

  const dispatch = useDispatch();
  const isCreating = useSelector(selectIsAlbumCreating);

  const areFieldsValid = name.length >= 3 && location.length >= 3 && date.length === 10;

  const createAlbumHandler = () => {
    dispatch(createAlbumAction({
      name,
      location,
      date
    }));
  };

  return (
    <Background onClick={() => hide(false)}>
      <ModalWindow onClick={(evt) => evt.stopPropagation()}>
        <CloseIcon stroke="#262626" onClick={() => hide(false)}/>
        <Input value={name} onChange={setName} placeholder="Album Name" type="text" />
        <Input value={location} onChange={setLocation} placeholder="Location" type="text" />
        <Input type="date" onChange={setDate} value={date} />
        <Button disabled={!areFieldsValid} onClick={createAlbumHandler}>
          {isCreating ? <Loader size={16} /> : 'Create Album'}
        </Button>
      </ModalWindow>
    </Background>
  );
};

const ModalWindow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 15px;
  padding: 50px 15px;
  max-width: 500px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  cursor: auto;
  
  svg {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
  }
  
  @media (min-width: 768px) {
    padding: 50px;
    height: auto;
    border-radius: 20px;
  }
`;

export default CreateAlbum;

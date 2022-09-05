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

interface Props {
  hide: HandleToggle
}

const CreateAlbum: React.FC<Props> = ({ hide }) => {
  const [name, setName] = useInput('', 20);
  const [location, setLocation] = useInput('', 20);
  const [date, setDate] = useInput('', 10);

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
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 15px;
  padding: 50px;
  width: 500px;
  background-color: #fff;
  cursor: auto;
`;

export default CreateAlbum;

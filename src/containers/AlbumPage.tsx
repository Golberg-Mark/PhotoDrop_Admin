import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';

import {
  selectAlbum,
  selectIsLoadingCompleted, selectIsUploadingSessionExist
} from '@/store/selectors/userSelector';
import PageWrapper from '@/components/PageWrapper';
import Loader from '@/components/Loader';
import { getSelectedAlbumAction, uploadPhotoAction, userActions } from '@/store/actions/userActions';
import InputNumber from '@/components/InputNumber';
import Button from '@/components/Button';
import useToggle from '@/hooks/useToggle';
import { Client } from '@/store/reducers/user';
import UploadingProgressWindow from '@/components/UploadingProgressWindow';

const AlbumPage = () => {
  const [numbers, setNumbers] = useState<Client[]>([{
    countryCode: '',
    phoneNumber: ''
  }]);
  const [photos, setPhotos] = useState<File[]>();
  const [focusedInput, setFocusedInput] = useState<number>();
  const [isLoadingFinished, toggleIsLoadingFinished] = useToggle();
  const [isLoading, toggleIsLoading] = useToggle();

  const album = useSelector(selectAlbum);
  const isLoadingCompleted = useSelector(selectIsLoadingCompleted);
  const isUploadingSessionExist = useSelector(selectIsUploadingSessionExist);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedAlbumAction(params.id!));

    return () => {
      dispatch(userActions.setSelectedAlbum(null));
    }
  }, []);

  useEffect(() => {
    if (isLoadingCompleted) {
      toggleIsLoadingFinished(true);
      toggleIsLoading(false);
      setPhotos([]);
      setNumbers([{
        countryCode: '',
        phoneNumber: ''
      }]);
    }
  }, [isLoadingCompleted]);

  const choosePhotos = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const files: File[] = [];

      for (let i = 0; i < evt.target.files.length; i++) {
        const file = evt.target.files[i];
        const splitName = file.name.split('.');
        const type = file.type || `image/${splitName[splitName.length - 1]}`;
        if (new RegExp(/^image\/.*$/).test(type)) files.push(file);
      }

      setPhotos(files);
    }
  }

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

  const uploadPhoto = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (photos?.length && correctNumbers.length && album) {
      toggleIsLoading(true);
      const correctNumbers = numbers.filter((el) => el.countryCode !== '' && el.phoneNumber !== '');

      dispatch(uploadPhotoAction(correctNumbers, photos, album.id));
    }
  };

  let uploadedPhotosCount = 'Upload';

  if (photos?.length) {
    uploadedPhotosCount += ` ${photos.length} ${photos.length > 1 ? 'photos' : 'photo'}`;
  }

  let correctNumbers = numbers.filter((el) => {
    const regexp = new RegExp(/^(\+\d{10,15})$/);
    const phone = el.countryCode + el.phoneNumber;
    return phone !== '' && regexp.test(phone);
  });

  return (
    <PageWrapper>
      {album ? (
        <PageContent onSubmit={uploadPhoto}>
          <AddPhotosBlock>
            {numbers.map((_, i) => (
              <InputNumber
                phonePosition={i}
                isFocused={focusedInput ===  i}
                loadingFinished={isLoadingFinished}
                onChange={changeNumbers} key={`phone_${i}`}
              />
            ))}
            <Button
              isAlternativeStyle
              onClick={addNewNumber}
              disabled={!numbers[numbers.length - 1].phoneNumber.length && !numbers[numbers.length - 1].countryCode.length}
            >
              Add new number
            </Button>
          </AddPhotosBlock>
          {!album.countPhotos ? <NoPhotos>There is no photo yet</NoPhotos> : null}
          <Buttons>
            <StyledLabel>
              Choose Photos
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={choosePhotos}
                accept="image/*,.heic,.heif"
                id="Uppy"
                multiple
              />
            </StyledLabel>
            <Button disabled={!photos?.length || !correctNumbers.length} type="submit">
              {isLoading ? <Loader /> : uploadedPhotosCount }
            </Button>
          </Buttons>
        </PageContent>
      ) : <Loader />}
      {isUploadingSessionExist ? <UploadingProgressWindow totalPhotos={photos?.length}/> : ''}
    </PageWrapper>
  );
};

const PageContent = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AddPhotosBlock = styled.div`
  margin-bottom: 40px;
`;

const NoPhotos = styled.p`
  margin-bottom: 20px;
  font-size: 22px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  max-width: 420px;
  width: 100%;
`;

const StyledLabel = styled.label`
  padding: 17px;
  width: 100%;
  height: 50px;
  font-size: 18px;
  text-align: center;
  color: #FFF;
  background-color: #3300CC;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: .2s;

  :hover {
    opacity: .7;
  }
`;

export default AlbumPage;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { selectAlbum, selectLoadedPhotosCount } from '@/store/selectors/userSelector';
import PageWrapper from '@/components/PageWrapper';
import Loader from '@/components/Loader';
import { getSelectedAlbumAction, uploadPhotoAction, userActions } from '@/store/actions/userActions';
import InputNumber from '@/components/InputNumber';
import Button from '@/components/Button';
import useToggle from '@/hooks/useToggle';
import SuccessIcon from '@/icons/SuccessIcon';
import { Client } from '@/store/reducers/user';

const AlbumPage = () => {
  const [numbers, setNumbers] = useState<Client[]>([{
    countryCode: '',
    phoneNumber: ''
  }]);
  const [photos, setPhotos] = useState<File[]>();
  const [focusedInput, setFocusedInput] = useState<number>();
  const [isLoadingFinished, toggleIsLoadingFinished] = useToggle();
  const [isLoading, toggleIsLoading] = useToggle();
  const params = useParams();
  const dispatch = useDispatch();
  const album = useSelector(selectAlbum);
  const loadedPhotosCount = useSelector(selectLoadedPhotosCount);

  useEffect(() => {
    dispatch(getSelectedAlbumAction(params.id!));

    return () => {
      dispatch(userActions.setSelectedAlbum(null));
    }
  }, []);

  useEffect(() => {
    if (loadedPhotosCount === photos?.length) {
      toggleIsLoadingFinished(true);
      setPhotos([]);
      setNumbers([{
        countryCode: '',
        phoneNumber: ''
      }]);
      dispatch(userActions.setLoadedPhotosCount(null));
    }
  }, [loadedPhotosCount]);

  useEffect(() => {
    if (isLoadingFinished) {
      toggleIsLoading(false);
      const timer = setTimeout(() => {
        toggleIsLoadingFinished(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [isLoadingFinished]);

  const choosePhotos = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files?.length) {
      const files: File[] = [];

      for (let i = 0; i < evt.target.files.length; i++) {
        files.push(evt.target.files.item(i) as File);
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

  const uploadPhoto = () => {
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
        <PageContent>
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
                multiple
              />
            </StyledLabel>
            <Button disabled={!photos?.length || !correctNumbers.length} onClick={uploadPhoto}>
              {isLoading ? <Loader /> : uploadedPhotosCount }
            </Button>
          </Buttons>
        </PageContent>
      ) : <Loader />}
      {loadedPhotosCount && photos ? (
        <UploadedPhotos>
          {`${loadedPhotosCount}/${photos.length}`}
        </UploadedPhotos>
      ) : null}
      {isLoadingFinished ? (
        <UploadedPhotos>
          <SuccessIcon />
        </UploadedPhotos>
      ) : null}
    </PageWrapper>
  );
};

const PageContent = styled.div`
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

const UploadedPhotos = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  padding: 10px 20px;
  height: 52px;
  border: 1px solid #CCC;
  border-radius: 10px;
  background-color: #FFF;

  ::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    top: 50%;
    right: 0;
    border-top: 1px solid #CCC;
    border-right: 1px solid #CCC;
    transform: rotate(45deg) translate(0%, -75%);
    background-color: #FFF;
  }
`;

export default AlbumPage;

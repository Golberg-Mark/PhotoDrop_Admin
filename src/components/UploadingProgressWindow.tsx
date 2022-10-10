import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  selectFailedPhotos,
  selectIsLoadingCompleted,
  selectLoadedPhotosCount,
  selectPhotosProgress
} from '@/store/selectors/userSelector';
import Background from '@/components/Background';
import { userActions } from '@/store/actions/userActions';
import Button from '@/components/Button';
import SuccessIcon from '@/icons/SuccessIcon';

interface Props {
  totalPhotos?: number
}

const UploadingProgressWindow: React.FC<Props> = ({ totalPhotos }) => {
  const loadedPhotosCount = useSelector(selectLoadedPhotosCount);
  const totalProgress = useSelector(selectPhotosProgress);
  const isLoadingCompleted = useSelector(selectIsLoadingCompleted);
  const failedPhotos = useSelector(selectFailedPhotos);

  const dispatch = useDispatch();

  const close = () => {
    dispatch(userActions.clearLoadingSession(true));
  };

  const loadedPhotosCountExist = loadedPhotosCount !== null;
  const progressExist = totalProgress !== null;
  const failedPhotosExist = failedPhotos !== null;
  const itShouldBeRendered = loadedPhotosCountExist || progressExist || failedPhotosExist;

  return  itShouldBeRendered ? (
    <Background
      onClick={isLoadingCompleted ? close : undefined}
      style={{ cursor: isLoadingCompleted ? 'pointer' : 'default' }}
    >
      <UploadedPhotos>
        {isLoadingCompleted && !failedPhotos ? (
          <InfoText>
            <SuccessText>
              Your photos successfully added!
              <div>
                <SuccessIcon />
              </div>
            </SuccessText>
            <Button onClick={close}>
              Okay
            </Button>
          </InfoText>
        ) : ''}
        {progressExist && loadedPhotosCountExist ? (
          <>
            <InfoText>
              {`Loading ${loadedPhotosCount} of ${totalPhotos!}`}
            </InfoText>
            <ProgressBar value={totalProgress} >
              <ProgressValue value={totalProgress} />
            </ProgressBar>
          </>
        ) : ''}
        {failedPhotosExist ? (
          <>
            <InfoText>
              {`Your ${failedPhotos.length} photos weren't uploaded:`}
            </InfoText>
            <FailedPhotosList>
              {failedPhotos.map((photoName) => (
                <li>{photoName}</li>
              ))}
            </FailedPhotosList>
            <Button onClick={close} >
              Got it!
            </Button>
          </>
        ) : ''}
      </UploadedPhotos>
    </Background>
  ) : <></>;
};

const UploadedPhotos = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px 15px;
  max-width: 420px;
  width: calc(100% - 30px);
  max-height: 400px;
  border: 1px solid #CCC;
  border-radius: 20px;
  background-color: #FFF;
  transform: translate(-50%, -50%);
  overflow-y: auto;
`;

const InfoText = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
  text-align: center;
  
  @media (min-width: 480px) {
    font-size: 22px;
  }
`;

const SuccessText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
  margin-bottom: 20px;
  
  & > {
    width: 30%;
  }
`;

const ProgressBar = styled.div<{ value: number }>`
  position: relative;
  height: 26px;
  background-color: #292929;
  border-radius: 15px;
  
  ::after {
    content: '${({ value }) => value}%';
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    font-size: 16px;
    color: #fff;
    transform: translate(-50%, -50%);
  } 
`;

const ProgressValue = styled.div<{ value: number }>`
  width: calc(100% * ${({ value }) => value / 100});
  height: 100%;
  border-radius: 15px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 6s ease infinite;
  transition: width .2s ease-in-out;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const FailedPhotosList = styled.ul`
  margin-bottom: 20px;
`;

export default UploadingProgressWindow;

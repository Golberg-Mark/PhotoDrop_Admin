import React, { useEffect } from 'react';import Uppy from '@uppy/core';
import { FileInput, XHRUpload } from 'uppy';
import styled from 'styled-components';
import FileInputComponent from '@uppy/react/src/FileInput';
import { MainApiProtected } from '@/api/mainApiProtected';
import AwsS3 from '@uppy/aws-s3';

interface Props {
  numbers: string[],
  albumName: string
}

const UppyUploader: React.FC<Props> = ({ numbers, albumName }) => {
  const uppy = new Uppy();

  useEffect(() => {
    uppy.use(AwsS3, {
      getUploadParameters: (file) => {
        console.log(file);
        return {
          method: 'PUT',
          url: ''
        };
        /*return MainApiProtected.getInstance().getPreassignedUrl({numbers, amount: 1}, albumName).then(({ urls }) => {
          return {
            method: 'PUT',
            url: urls[0]
          }
        })*/
      }
    });
  }, []);

  return (
    <StyledFileInput uppy={uppy} inputName="files[]" />
  );
};

const StyledFileInput = styled(FileInputComponent)`
  padding: 17px;
  width: 420px;
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

export default UppyUploader;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Uppy, { UppyOptions } from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { Dashboard } from '@uppy/react';

import { Client, SelectedAlbum } from '@/store/reducers/user';
import { errorActions } from '@/store/actions/errorActions';
import { api } from '@/store';
import { userActions } from '@/store/actions/userActions';

interface Props {
  numbers: Client[],
  album: SelectedAlbum,
  resetAll: () => void
}

const UppyUploader: React.FC<Props> = ({ numbers, album, resetAll }) => {
  const dispatch = useDispatch();

  const uppy = React.useMemo(() => {
    const uppyOpts: UppyOptions = {
      restrictions: {
        allowedFileTypes: ['image/*', '.heic', '.heif']
      },
      onBeforeUpload: (files) => {
        const firstFileMeta = Object.values(files)[0].meta as { numbers?: Client[] };

        if (!firstFileMeta.numbers?.length) {
          dispatch(errorActions.setErrorMessage('Please, enter users number!'));
          return false;
        }

        return files;
      }
    };
    const uppyObj = new Uppy(uppyOpts);

    uppyObj
      .use(AwsS3, {
        async getUploadParameters(file) {
          return await api.mainApiProtected.getPreassignedUrl({
            contentType: file.type!,
            isLast: file.meta.isLast as boolean,
            numbers: file.meta.numbers as Client[]
          }, album.id).then(url => ({
            method: 'PUT',
            headers: {
              'Content-Type': file.type!
            },
            url
          }));
        }
      })
      .on('files-added', (files) => {
        files[files.length - 1].meta.isLast = true;
      })
      .on('complete', (result) => {
        if (result.successful.length) {
          dispatch(userActions.setSelectedAlbum({
            ...album,
            countPhotos: album!.countPhotos + result.successful.length
          }));
        }
      })
      .on('upload', (_) => {
        dispatch(userActions.setClients(null))
      });

    return uppyObj;
  }, []);

  useEffect(() => {
    if (uppy) {
      uppy.getFiles().forEach((file) => {
        const metaNumbers = file.meta.numbers as Client[];

        uppy.setFileMeta(file.id, {
          numbers: metaNumbers?.length ? metaNumbers : numbers
        });
      });
    }
  }, [numbers]);

  const doneButtonHandler = () => {
    resetAll();
    uppy.cancelAll();
  }

  return (
    <StyledDashboard uppy={uppy} theme="dark" doneButtonHandler={() => doneButtonHandler()} height={460} />
  );
};

const StyledDashboard = styled(Dashboard)`
  margin-bottom: 20px;
  
  .uppy-Dashboard-inner {
    margin: 0 auto;
  }

  .uppy-DashboardTab-name,
  .uppy-Dashboard-poweredByUppy, 
  .uppy-DashboardContent-addMoreCaption,
  .uppy-Dashboard-Item-statusSize {
    color: #fff;
  }

  .uppy-DashboardContent-addMore .uppy-c-icon {
    fill: #fff;
  }
`;

export default UppyUploader;

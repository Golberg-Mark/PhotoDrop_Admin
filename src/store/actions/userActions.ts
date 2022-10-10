import { createActionCreators } from 'immer-reducer';

import { Album, PhoneNumber, SelectedAlbum, UserReducer } from '@/store/reducers/user';
import { LoginData } from '@/api/mainApi';
import { AsyncAction } from '@/store/actions/common';
import { errorActions } from '@/store/actions/errorActions';
import { push } from '@lagunovsky/redux-react-router';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';

export const userActions = createActionCreators(UserReducer);

export type UserActions =
  ReturnType<typeof userActions.setIsLoggedIn>
  | ReturnType<typeof userActions.setAlbums>
  | ReturnType<typeof userActions.setSelectedAlbum>
  | ReturnType<typeof userActions.setIsAlbumCreating>
  | ReturnType<typeof userActions.setLoadedPhotosCount>
  | ReturnType<typeof userActions.setPhotosProgress>
  | ReturnType<typeof userActions.setIsLoadingCompleted>
  | ReturnType<typeof userActions.setFailedPhotos>
  | ReturnType<typeof userActions.setClients>
  | ReturnType<typeof userActions.startUploadingSession>
  | ReturnType<typeof userActions.clearLoadingSession>;

export const loginAction  = (data: LoginData): AsyncAction => async (
  dispatch,
  _,
  { mainApi }
) => {
  try {
    const { token } = await mainApi.login(data);

    if (token) {
      localStorage.setItem('token', token);
      dispatch(userActions.setIsLoggedIn(true));
      dispatch(push('/'));
    }
  } catch (error: any) {
    const message = error.code === 400 ? 'Invalid username or password' : error.message;
    dispatch(errorActions.setErrorMessage(message));
  }
};

export const getAlbumsAction = (): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const albums: Album[] = await mainApiProtected.getAlbums();

    if (albums) dispatch(userActions.setAlbums(albums));
  } catch (error: any) {
    console.log(error);
  }
};

export const createAlbumAction = (album: Omit<Album, 'id'>): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    dispatch(userActions.setIsAlbumCreating(true));
    const newAlbum = await mainApiProtected.createAlbum(album);

    if (newAlbum) {
      const { albums } = getState().userReducer;
      let updatedAlbums;

      if (albums) updatedAlbums = [newAlbum, ...albums];
      else updatedAlbums = [newAlbum
      ]
      dispatch(userActions.setAlbums(updatedAlbums));
    }
  } catch (error: any) {
    console.log(error);
    dispatch(userActions.setIsAlbumCreating(false));
  }
};

export const getSelectedAlbumAction = (albumName: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    const album: SelectedAlbum = await mainApiProtected.getAlbum(albumName);

    if (album) dispatch(userActions.setSelectedAlbum(album));
  } catch (error: any) {
    console.log(error);
  }
};

export const uploadPhotoAction = (numbers: PhoneNumber[], photos: File[], id: string): AsyncAction => async (
  dispatch,
  getState,
  { mainApiProtected }
) => {
  try {
    dispatch(userActions.startUploadingSession());
    let uploadedAmount = 0;

    const uppy = new Uppy();

    uppy.on('progress', (progress => {
      dispatch(userActions.setPhotosProgress(progress));
    }));
    uppy.on('upload-success', () => {
      dispatch(userActions.setLoadedPhotosCount(++uploadedAmount));
    });

    photos.forEach((photo, i) => {
      const splitName = photo.name.split('.');
      uppy.addFile({
        name: photo.name,
        type: photo.type || `image/${splitName[splitName.length - 1]}`,
        data: new Blob([photo]),
        meta: {
          isLast: i === photos.length - 1
        }
      });
    });

    uppy.use(AwsS3, {
      async getUploadParameters(file) {
        return await mainApiProtected.getPreassignedUrl({
          contentType: file.type!,
          isLast: file.meta.isLast as boolean,
          numbers
        }, id).then(url => ({
          method: 'PUT',
          headers: {
            'Content-Type': file.type!
          },
          url
        }));
      }
    });

    uppy.upload().then(result => {
      dispatch(userActions.setIsLoadingCompleted(true));
      dispatch(userActions.setLoadedPhotosCount(null));

      const { selectedAlbum } = getState().userReducer;

      dispatch(userActions.setSelectedAlbum({
        ...selectedAlbum,
        countPhotos: selectedAlbum!.countPhotos + result.successful.length
      } as SelectedAlbum));

      if (result.failed.length) {
        const failedPhotos = result.failed.map((el) => el.name);
        dispatch(userActions.setFailedPhotos(failedPhotos));
      }
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const searchClientAction = (number: string): AsyncAction => async (
  dispatch,
  _,
  { mainApiProtected }
) => {
  try {
    const clients = await mainApiProtected.searchClient(number);

    if (clients.length) {
      dispatch(userActions.setClients(clients));
    } else dispatch(userActions.setClients(null));
  } catch (error: any) {
    console.log(error);
  }
};

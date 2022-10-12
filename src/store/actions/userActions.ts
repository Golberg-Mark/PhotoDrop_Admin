import { createActionCreators } from 'immer-reducer';

import { Album, SelectedAlbum, UserReducer } from '@/store/reducers/user';
import { LoginData } from '@/api/mainApi';
import { AsyncAction } from '@/store/actions/common';
import { errorActions } from '@/store/actions/errorActions';
import { push } from '@lagunovsky/redux-react-router';

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

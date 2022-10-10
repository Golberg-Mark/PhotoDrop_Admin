import { ImmerReducer, createReducerFunction } from 'immer-reducer';
import { userActions } from '@/store/actions/userActions';

export interface Album {
  name: string,
  location: string,
  date: string,
  id: string
}

export interface SelectedAlbum extends Album {
  countPhotos: number
}

export interface PhoneNumber {
  countryCode: string,
  phoneNumber: string
}

export interface Client extends PhoneNumber {
  name?: string
}

interface UserState {
  isLoggedIn: boolean,
  albums: Album[] | null,
  selectedAlbum: SelectedAlbum | null,
  isHeaderVisible: boolean,
  isAlbumCreating: boolean,
  loadedPhotosCount: number | null,
  photosProgress: number | null,
  isLoadingCompleted: boolean | null,
  failedPhotos: string[] | null,
  isUploadingSessionExist: boolean,
  clients: Client[] | null
}

const InitialState: UserState = {
  isLoggedIn: !!localStorage.getItem('token'),
  albums: null,
  selectedAlbum: null,
  isHeaderVisible: true,
  isAlbumCreating: false,
  loadedPhotosCount: null,
  photosProgress: null,
  isLoadingCompleted: null,
  failedPhotos: null,
  isUploadingSessionExist: false,
  clients: null
}

export class UserReducer extends ImmerReducer<UserState> {
  setIsLoggedIn(value: boolean) {
    this.draftState.isLoggedIn = value;

    if (!value) localStorage.removeItem('token');
  }

  setAlbums(albums: Album[] | null) {
    this.draftState.albums = albums;
    this.draftState.isAlbumCreating = false;
  }

  setSelectedAlbum(album: SelectedAlbum | null) {
    this.draftState.selectedAlbum = album;
    this.draftState.isHeaderVisible = !album;
  }

  setIsAlbumCreating(value: boolean) {
    this.draftState.isAlbumCreating = value;
  }

  setLoadedPhotosCount(value: number | null) {
    this.draftState.loadedPhotosCount = value;
  }

  setPhotosProgress(value: number | null) {
    this.draftState.photosProgress = value;
  }

  setIsLoadingCompleted(value: boolean | null) {
    this.draftState.isLoadingCompleted = value;
  }

  setFailedPhotos(value: string[] | null) {
    this.draftState.failedPhotos = value;
  }

  setClients(value: Client[] | null) {
    this.draftState.clients = value;
  }

  startUploadingSession() {
    this.draftState.isUploadingSessionExist = true;
    this.draftState.isLoadingCompleted = false;
    this.draftState.loadedPhotosCount = 1;
    this.draftState.photosProgress = 0;
  }

  clearLoadingSession(isCloseSession: boolean = false) {
    this.draftState.isLoadingCompleted = null;
    this.draftState.loadedPhotosCount = null;
    this.draftState.photosProgress = null;

    if (isCloseSession) {
      this.draftState.failedPhotos = null;
      this.draftState.isUploadingSessionExist = false;
    }
  }
}

export default createReducerFunction(UserReducer, InitialState);

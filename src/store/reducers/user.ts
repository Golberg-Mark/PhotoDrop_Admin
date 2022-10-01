import { ImmerReducer, createReducerFunction } from 'immer-reducer';

export interface Album {
  name: string,
  location: string,
  date: string,
  id: string
}

export interface SelectedAlbum extends Album {
  countPhotos: number
}

export interface Client {
  countryCode: string,
  phoneNumber: string,
  name?: string
}

interface UserState {
  isLoggedIn: boolean,
  albums: Album[],
  selectedAlbum: SelectedAlbum | null,
  isHeaderVisible: boolean,
  isAlbumCreating: boolean,
  loadedPhotosCount: number | null,
  clients: Client[] | null
}

const InitialState: UserState = {
  isLoggedIn: !!localStorage.getItem('token'),
  albums: [],
  selectedAlbum: null,
  isHeaderVisible: true,
  isAlbumCreating: false,
  loadedPhotosCount: null,
  clients: null
}

export class UserReducer extends ImmerReducer<UserState> {
  setIsLoggedIn(value: boolean) {
    this.draftState.isLoggedIn = value;

    if (!value) localStorage.removeItem('token');
  }

  setAlbums(albums: Album[]) {
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

  setClients(value: Client[] | null) {
    this.draftState.clients = value;
  }
}

export default createReducerFunction(UserReducer, InitialState);

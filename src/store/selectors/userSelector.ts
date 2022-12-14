import { State } from '@/store';
import { createSelector, Selector } from 'reselect';
import { Album, Client, SelectedAlbum } from '@/store/reducers/user';

const userState = (state: State) => state.userReducer;

export const selectIsLoggedIn: Selector<State, boolean> = createSelector(
  userState,
  ({ isLoggedIn }) => isLoggedIn
);

export const selectAlbums: Selector<State, Album[] | null> = createSelector(
  userState,
  ({ albums }) => albums
);

export const selectAlbum: Selector<State, SelectedAlbum | null> = createSelector(
  userState,
  ({ selectedAlbum }) => selectedAlbum
);

export const selectIsHeaderVisible: Selector<State, boolean> = createSelector(
  userState,
  ({ isHeaderVisible }) => isHeaderVisible
);

export const selectIsAlbumCreating: Selector<State, boolean> = createSelector(
  userState,
  ({ isAlbumCreating }) => isAlbumCreating
);

export const selectLoadedPhotosCount: Selector<State, number | null> = createSelector(
  userState,
  ({ loadedPhotosCount }) => loadedPhotosCount
);

export const selectPhotosProgress: Selector<State, number | null> = createSelector(
  userState,
  ({ photosProgress }) => photosProgress
);

export const selectIsLoadingCompleted: Selector<State, boolean | null> = createSelector(
  userState,
  ({ isLoadingCompleted }) => isLoadingCompleted
);

export const selectFailedPhotos: Selector<State, string[] | null> = createSelector(
  userState,
  ({ failedPhotos }) => failedPhotos
);

export const selectIsUploadingSessionExist: Selector<State, boolean> = createSelector(
  userState,
  ({ isUploadingSessionExist }) => isUploadingSessionExist
);

export const selectClients: Selector<State, Client[] | null> = createSelector(
  userState,
  ({ clients }) => clients
);

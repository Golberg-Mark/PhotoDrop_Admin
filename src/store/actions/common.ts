import { ThunkAction } from 'redux-thunk';

import { State, api, Actions } from '@/store';
import { UpdateLocationAction } from '@lagunovsky/redux-react-router';

export type AsyncAction<R = void> = ThunkAction<R, State, typeof api, Actions | UpdateLocationAction>;

import { ThunkAction } from 'redux-thunk';

import { State, api, Actions } from '@/store';

export type AsyncAction<R = void> = ThunkAction<R, State, typeof api, Actions>;

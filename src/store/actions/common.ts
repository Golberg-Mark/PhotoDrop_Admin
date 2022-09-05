import { ThunkAction } from 'redux-thunk';

import { State, api, Actions } from '@/store';
import { CallHistoryMethodAction } from 'connected-react-router';

type HistoryActions = CallHistoryMethodAction<[string, unknown?]> | CallHistoryMethodAction<[]>;

export type AsyncAction<R = void> = ThunkAction<R, State, typeof api, Actions | HistoryActions>;

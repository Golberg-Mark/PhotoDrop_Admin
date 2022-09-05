import { createActionCreators } from 'immer-reducer';
import { ErrorReducer } from '@/store/reducers/error';

export const errorActions = createActionCreators(ErrorReducer);

export type ErrorActions = ReturnType<typeof errorActions.setErrorMessage>;

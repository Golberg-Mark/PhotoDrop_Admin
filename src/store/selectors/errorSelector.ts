import { State } from '@/store';
import { createSelector, Selector } from 'reselect';

const errorState = (state: State) => state.errorReducer;

export const selectErrorMessage: Selector<State, string | null> = createSelector(
  errorState,
  ({ errorMessage }) => errorMessage
);

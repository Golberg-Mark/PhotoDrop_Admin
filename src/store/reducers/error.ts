import { ImmerReducer, createReducerFunction } from 'immer-reducer';

interface ErrorState {
  errorMessage: string | null
}

const InitialState: ErrorState = {
  errorMessage: null
}

export class ErrorReducer extends ImmerReducer<ErrorState> {
  setErrorMessage(errorMessage: string | null) {
    this.draftState.errorMessage = errorMessage;
  }
}

export default createReducerFunction(ErrorReducer, InitialState);

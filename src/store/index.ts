import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

import UserReducer from '@/store/reducers/user';
import MainApi from '@/api/mainApi';
import { UserActions } from '@/store/actions/userActions';
import { MainApiProtected } from '@/api/mainApiProtected';
import ErrorReducer from '@/store/reducers/error';
import { ErrorActions } from '@/store/actions/errorActions';
import { createRouterMiddleware, createRouterReducer } from '@lagunovsky/redux-react-router';

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  router: createRouterReducer(history),
  userReducer: UserReducer,
  errorReducer: ErrorReducer
});

export const api = {
  mainApi: MainApi.getInstance(),
  mainApiProtected: MainApiProtected.getInstance()
}

const composeEnhancer = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const enhancer = composeEnhancer(
  applyMiddleware(thunk.withExtraArgument(api), createRouterMiddleware(history))
);

const store = createStore(rootReducer, enhancer);

export type State = ReturnType<typeof rootReducer>;

export type Actions = UserActions | ErrorActions;

export default store;

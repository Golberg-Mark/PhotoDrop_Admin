import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ReduxRouter } from '@lagunovsky/redux-react-router';

import App from '@/containers/App';
import store, { history } from '@/store';

const root = createRoot(document.getElementById('root')!);
root.render(
  <>
    <Provider store={store}>
      <ReduxRouter history={history}>
        <App />
      </ReduxRouter>
    </Provider>
  </>
);

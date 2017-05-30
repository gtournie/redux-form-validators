import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import configureStore from './redux';

import en from './locales/en.json';

const store = configureStore();

ReactDOM.render(
  (
    <IntlProvider locale="en" messages={en}>
      <Provider store={store}>
        <App />
      </Provider>
    </IntlProvider>
  ),
  document.getElementById('root')
);
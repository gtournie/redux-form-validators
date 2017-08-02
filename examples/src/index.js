import React from 'react'
import { FormattedMessage, defineMessages } from 'react-intl'
import ReactDOM from 'react-dom'
import App from './App'

import 'bootstrap-loader'

import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'

import configureStore from './redux'

import en from './locales/en.json'

import Validators from 'redux-form-validators'

Validators.formatMessage = function(msg) {
  return <FormattedMessage {...(msg.props || msg)}/>
}

const store = configureStore()

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
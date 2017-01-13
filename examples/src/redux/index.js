import { createStore } from 'redux';
import rootReducer from './root.reducer';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./root.reducer', () => {
      const nextReducer = require('./root.reducer').default
      store.replaceReducer(nextReducer)
    });
  }

  return store;
}
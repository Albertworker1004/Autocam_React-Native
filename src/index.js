import React from 'react';
import {AuthProvider} from './Store';

import Routes from '~/routes';
import CodePush from 'react-native-code-push';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
  orderedProducts: {},
};

const reducer = (state = initialState, {type, product, productID}) => {
  const newOrderedProducts = JSON.parse(JSON.stringify(state.orderedProducts));
  switch (type) {
    case 'ADD': {
      newOrderedProducts[productID] = product;
      return {orderedProducts: newOrderedProducts};
    }
    case 'REMOVE': {
      delete newOrderedProducts[productID];
      return {orderedProducts: newOrderedProducts};
    }
    case 'CLEAR': {
      return {orderedProducts: {}};
    }
    default:
      return {orderedProducts: state.orderedProducts};
  }
};

const store = createStore(reducer);

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </AuthProvider>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);

import React from 'react';
import { Provider } from 'react-redux/es/exports';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/router';
import store from './store/store';
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

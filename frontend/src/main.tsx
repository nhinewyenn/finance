/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyle } from './styles/GlobalStyle.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { financeAPI } from './store/financeSlice.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <ApiProvider api={financeAPI}>
        <App />
      </ApiProvider>
    </Provider>
  </React.StrictMode>
);

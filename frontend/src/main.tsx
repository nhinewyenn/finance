/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyle } from './styles/GlobalStyle.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Login/Signup.tsx';
import PrivateRoute from './components/Login/PrivateRoute.tsx';
import Login from './components/Login/Login.tsx';
import NotFound from './components/Login/NotFound.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<PrivateRoute />}>
            <Route index path='/' element={<App />} />
          </Route>
          <Route path='*' element={<NotFound />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

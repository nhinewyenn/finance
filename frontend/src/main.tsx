/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyle } from './styles/GlobalStyle.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Login/Signup.tsx';
import { CookiesProvider } from 'react-cookie';
import PrivateRoute from './components/Login/PrivateRoute.tsx';
import Login from './components/Login/Login.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='' element={<PrivateRoute />}>
              <Route index path='/' element={<App />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

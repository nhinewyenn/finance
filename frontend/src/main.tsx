/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyle } from './styles/GlobalStyle.ts';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login/Login.tsx';
import SignUp from './components/Login/Signup.tsx';
import { CookiesProvider } from 'react-cookie';
import PrivateRoute from './components/Login/PrivateRoute.tsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

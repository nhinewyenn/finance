/** @format */

import React, { useState } from 'react';

export default function useToken() {
  function getToken() {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken.token;
    }
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken: unknown) {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken?.token);
  }

  return {
    setToken: saveToken,
    token,
  };
}

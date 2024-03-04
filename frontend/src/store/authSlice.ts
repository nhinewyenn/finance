/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('userInfo')?.length
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('userID');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('access_token');
    },
  },
});

export const { setCredentials, logoutUser } = authSlice.actions;

export default authSlice.reducer;

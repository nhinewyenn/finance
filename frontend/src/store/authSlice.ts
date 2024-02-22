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
      state.user = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('userID');
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logoutUser } = authSlice.actions;

export default authSlice.reducer;

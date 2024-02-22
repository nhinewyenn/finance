/** @format */

import { createSlice } from "@reduxjs/toolkit";

type UserInfo = {
  user: {
    _id: string;
    username: string;
    password: string;
  };
};

const initialState: UserInfo = {
  user: localStorage.getItem("userInfo")?.length
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, _) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

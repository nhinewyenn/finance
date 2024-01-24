/** @format */

import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { ToastProps } from '../components/ToastNotification/ToastNotification';

const initialState: ToastProps[] = [];

const toastSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    toastMessage(state, action) {
      switch (action.type) {
        case 'ADD_TOAST':
          return [...state, action.payload as ToastProps];
        case 'DELETE_TOAST':
          return state.filter((toast) => toast.id !== action.payload);
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
    },
    addToast(state, action: PayloadAction<ToastProps>) {
      state.push(action.payload);
    },
    removeToast(state, action: PayloadAction<string>) {
      return state.filter((toast) => toast.id !== action.payload);
    },
  },
});

const { addToast, removeToast, toastMessage } = toastSlice.actions;
export default toastSlice.reducer;

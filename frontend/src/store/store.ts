/** @format */

/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { financeAPI } from './financeAPI';
import { userAPI } from './userAPI';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    [financeAPI.reducerPath]: financeAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    auth: authReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(financeAPI.middleware, userAPI.middleware), //enable caching, polling etc
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);

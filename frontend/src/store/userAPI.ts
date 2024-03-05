/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserAPI } from '../utils/typeUtils';
import { RootState } from './store';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_USER_API,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    headers: {
      'Access-Control-Allow-Origin': import.meta.env.VITE_HOST,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
        timeout: 1000,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
        credentials: 'include',
      }),
    }),
    logoutUser: builder.mutation<unknown, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
    getUserById: builder.query<UserAPI, string>({
      query: (id) => `user/${id}`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useLogoutUserMutation,
} = userAPI;

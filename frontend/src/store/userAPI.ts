/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserAPI } from '../utils/typeUtils';
import { RootState } from './store';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_USER_API ?? import.meta.env.VITE_RENDER_USER_API,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    headers: {
      'Access-Control-Allow-Origin':
        import.meta.env.VITE_RENDER_HOST ?? import.meta.env.VITE_HOST,
    },
  }),
  tagTypes: ['register', 'login', 'logoutUser'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
        timeout: 1000,
      }),
      invalidatesTags: [{ type: 'register' }],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
        credentials: 'include',
      }),
      invalidatesTags: [{ type: 'login' }],
    }),
    logoutUser: builder.mutation<unknown, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'logoutUser' }],
    }),
    getUserById: builder.query<UserAPI, string>({
      query: (id) => `user/${id}`,
      providesTags: (_, __, id) => [{ type: 'login', id }],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useLogoutUserMutation,
} = userAPI;

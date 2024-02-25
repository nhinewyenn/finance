/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserApiResponse } from '../utils/typeUtils';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1000/api/v1/auth/',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5173',
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
    getUserById: builder.query<UserApiResponse, string>({
      query: (id) => `user/${id}`,
      providesTags: (result, error, id) => [{ type: 'login', id }],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useLogoutUserMutation,
} = userAPI;

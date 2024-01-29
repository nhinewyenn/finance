/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../utils/typeUtils';
import { getToken } from '../utils/formUtils';

console.log(localStorage.getItem('access_token'));

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1000/api/v1/auth/',
  }),
  tagTypes: ['Register', 'Login'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
        timeout: 1000,
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
      invalidatesTags: [{ type: 'Register' }],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
        credentials: 'same-origin',
      }),
      invalidatesTags: [{ type: 'Login' }],
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `user/${id}`,
      providesTags: (result, error, id) => [{ type: 'Login', id }],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserByIdQuery } =
  userAPI;

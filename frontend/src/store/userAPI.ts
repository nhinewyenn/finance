/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserApiResponse } from '../utils/typeUtils';
import { getToken } from '../utils/formUtils';

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
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
      invalidatesTags: [{ type: 'Login' }],
    }),
    getUserById: builder.query<UserApiResponse, string>({
      query: (id) => `user/${id}`,
      providesTags: (result, error, id) => [{ type: 'Login', id }],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserByIdQuery } =
  userAPI;

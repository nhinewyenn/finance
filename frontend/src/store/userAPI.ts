/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1000/api/v1/auth' }),
  tagTypes: ['Register', 'Login'],
  endpoints: (builder) => ({
    getUser: builder.query<FormInput[], void>({
      query: () => 'get-incomes',
      providesTags: [{ type: 'Login' }],
    }),
    register: builder.mutation({
      query: (income) => ({
        url: 'add-income',
        method: 'POST',
        body: income,
      }),
      invalidatesTags: [{ type: 'Register' }],
    }),
    login: builder.mutation({
      query: (income) => ({
        url: 'add-income',
        method: 'POST',
        body: income,
      }),
      invalidatesTags: [{ type: 'Register' }],
    }),
  }),
});

export const { useGetUserQuery, useRegisterMutation, useLoginMutation } =
  userAPI;

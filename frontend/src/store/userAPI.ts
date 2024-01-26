/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../utils/typeUtils';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1000/api/v1/auth/' }),
  tagTypes: ['Register', 'Login'],
  endpoints: (builder) => ({
    getUser: builder.query<User, null>({
      query() {
        return {
          url: 'user',
          credentials: 'include',
        };
      },
      transformResponse: (result: { data: { user: User } }) => result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      providesTags: [{ type: 'Login' }],
    }),
    register: builder.mutation({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: [{ type: 'Register' }],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
        credentials: 'include',
      }),

      invalidatesTags: [{ type: 'Login' }],
    }),
  }),
});

export const { useGetUserQuery, useRegisterMutation, useLoginMutation } =
  userAPI;

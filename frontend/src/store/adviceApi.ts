/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { FormInput } from '../utils/typeUtils';

export const financeAPI = createApi({
  reducerPath: 'financeAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_FINANCE_API,
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
  tagTypes: ['Advice'],
  endpoints: (builder) => ({
    messages: builder.mutation({
      query: (msg: string) => ({
        url: 'completions',
        method: 'POST',
        body: JSON.stringify({ message: 'Say this is a test' }),
      }),
      invalidatesTags: [{ type: 'Advice' }],
    }),
  }),
});

export const { useMessagesMutation } = financeAPI;

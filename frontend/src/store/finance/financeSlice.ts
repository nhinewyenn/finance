/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../store';

export const financeAPI = createApi({
  reducerPath: 'financeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getIncomes: builder.query({
      query: () => 'get-incomes',
    }),
    addIncome: builder.mutation({
      query: (income) => ({
        url: 'add-income',
        method: 'POST',
        body: income,
      }),
    }),
    deleteIncome: builder.mutation({
      query: (id: string) => ({
        url: `delete-income/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
} = financeAPI;

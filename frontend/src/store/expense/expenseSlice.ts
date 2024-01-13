/** @format */
/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../store';

export const expenseAPI = createApi({
  reducerPath: 'expenseAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => 'get-expenses',
    }),
    addExpense: builder.mutation({
      query: (expense) => ({
        url: 'add-expense',
        method: 'POST',
        body: expense,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `delete-expense/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
} = expenseAPI;

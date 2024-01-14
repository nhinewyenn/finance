/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const financeAPI = createApi({
  reducerPath: 'financeAPI',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5173/api/v1/' }),
  tagTypes: ['Income', 'Expense'],
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
      query: (id) => ({
        url: `delete-income/${id}`,
        method: 'DELETE',
      }),
    }),
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
  useGetIncomesQuery,
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
} = financeAPI;

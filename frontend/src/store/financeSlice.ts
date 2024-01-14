/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const financeAPI = createApi({
  reducerPath: 'financeAPI',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1000/api/v1/' }),
  tagTypes: ['Income', 'Expense'],
  endpoints: (builder) => ({
    getIncomes: builder.query<FormData[], void>({
      query: () => 'get-incomes',
      providesTags: [{ type: 'Income', id: 'LIST' }],
    }),
    addIncome: builder.mutation<FormData, void>({
      query: (income) => ({
        url: 'add-income',
        method: 'POST',
        body: income,
      }),
      invalidatesTags: [{ type: 'Income', id: 'LIST' }],
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `delete-income/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Income', id: 'LIST' }],
    }),
    getExpenses: builder.query<FormData[], void>({
      query: () => 'get-expenses',
      providesTags: [{ type: 'Expense', id: 'LIST' }],
    }),
    addExpense: builder.mutation<FormData, void>({
      query: (expense) => ({
        url: 'add-expense',
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: [{ type: 'Expense', id: 'LIST' }],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `delete-expense/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Expense', id: 'LIST' }],
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

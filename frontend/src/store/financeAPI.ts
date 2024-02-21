/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormInput } from '../utils/typeUtils';

export const financeAPI = createApi({
  reducerPath: 'financeAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1000/api/v1/profile/',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5173',
    },
  }),
  tagTypes: ['Income', 'Expense'],
  endpoints: (builder) => ({
    getIncomes: builder.query<FormInput[], void>({
      query: () => 'get-incomes',

      providesTags: [{ type: 'Income' }],
    }),
    addIncome: builder.mutation({
      query: (income: FormInput) => ({
        url: 'add-income',
        method: 'POST',
        body: income,
      }),
      invalidatesTags: [{ type: 'Income' }],
    }),
    updateIncome: builder.mutation({
      query: ({ _id, ...income }) => ({
        url: `update-income/${_id}`,
        method: 'PATCH',
        body: income,
      }),
      transformResponse: (response) => response,
      invalidatesTags: (result, _, arg) => [{ type: 'Income', id: arg.id }],
    }),
    deleteIncome: builder.mutation({
      query: (id) => ({
        url: `delete-income/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, _, arg) => [{ type: 'Income', id: arg.id }],
    }),
    getExpenses: builder.query<FormInput[], void>({
      query: () => 'get-expenses',
      providesTags: [{ type: 'Expense' }],
    }),
    addExpense: builder.mutation({
      query: (expense: FormInput) => ({
        url: 'add-expense',
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: [{ type: 'Expense' }],
    }),
    updateExpense: builder.mutation({
      query: ({ _id, ...expense }) => ({
        url: `update-expense/${_id}`,
        method: 'PATCH',
        body: expense,
      }),
      transformResponse: (response) => response,
      invalidatesTags: (result, _, arg) => [{ type: 'Expense', id: arg.id }],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `delete-expense/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, _, arg) => [{ type: 'Expense', id: arg.id }],
    }),
  }),
});

export const {
  useGetIncomesQuery,
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = financeAPI;

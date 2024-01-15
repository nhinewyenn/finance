/** @format */

import {
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { FormInput, FormInputAmount } from '../utils/typeUtils';
import { calculateTotal } from '../utils/formUtils';

export const financeAPI = createApi({
  reducerPath: 'financeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1000/api/v1/' }),
  tagTypes: ['Income', 'Expense'],
  endpoints: (builder) => ({
    getIncomes: builder.query<FormInput[], void>({
      query: () => 'get-incomes',
      providesTags: [{ type: 'Income' }],
    }),
    addIncome: builder.mutation({
      query: (income) => ({
        url: 'add-income',
        method: 'POST',
        body: income,
      }),
      invalidatesTags: [{ type: 'Income' }],
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
      query: (expense) => ({
        url: 'add-expense',
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: [{ type: 'Expense' }],
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
  useDeleteIncomeMutation,
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
} = financeAPI;

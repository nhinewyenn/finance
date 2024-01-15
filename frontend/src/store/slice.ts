/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { financeAPI } from './financeAPI';

const initialState = {
  income: [],
  expenses: [],
  error: null,
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        financeAPI.endpoints.getIncomes.matchFulfilled,
        (state, action) => {
          state.income = action.payload;
        }
      )
      // ... add cases for other API endpoints
      .addCase(financeAPI.util.resetApiState.fulfilled, () => initialState);
  },
});

/** @format */

import express from 'express';
import {
  addIncome,
  deleteIncome,
  getIncomes,
  updateIncome,
} from './controllers/IncomeController';
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from './controllers/ExpenseController';

const router = express.Router();

router
  .post('/add-income', addIncome)
  .patch('/update-income/:id', updateIncome)
  .get('/get-incomes', getIncomes)
  .delete('/delete-income/:id', deleteIncome)
  .post('/add-expense', addExpense)
  .patch('/update-expense/:id', updateExpense)
  .get('/get-expenses', getExpenses)
  .delete('/delete-expense/:id', deleteExpense);

export default router;

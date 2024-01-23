/** @format */

import express from 'express';
import {
  addIncome,
  deleteIncome,
  getIncomes,
} from '../controllers/IncomeController';
import {
  addExpense,
  deleteExpense,
  getExpenses,
} from '../controllers/ExpenseController';

const router = express.Router();

router
  .post('/add-income', addIncome)
  .get('/get-incomes', getIncomes)
  .delete('/delete-income/:id', deleteIncome)
  .post('/add-expense', addExpense)
  .get('/get-expenses', getExpenses)
  .delete('/delete-expense/:id', deleteExpense);

module.exports = router;

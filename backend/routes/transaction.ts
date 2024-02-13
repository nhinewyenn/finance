/** @format */

import express from 'express';
import {
  addIncome,
  deleteIncome,
  getIncomes,
  updateIncome,
} from '../controllers/IncomeController';
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../controllers/ExpenseController';
import { verifyToken } from '../controllers/errorMiddleware';

const router = express.Router();

router
  .post('/add-income', verifyToken, addIncome)
  .patch('/update-income/:id', updateIncome)
  .get('/get-incomes', verifyToken, getIncomes)
  .delete('/delete-income/:id', deleteIncome)
  .post('/add-expense', addExpense)
  .patch('/update-expense/:id', updateExpense)
  .get('/get-expenses', getExpenses)
  .delete('/delete-expense/:id', deleteExpense);

module.exports = router;

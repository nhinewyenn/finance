/** @format */

import express, { Response, Request } from 'express';
import { addIncome, deleteIncome, getIncomes } from '../controllers/income';
import { addExpense, deleteExpense, getExpenses } from '../controllers/expense';

const router = express.Router();

router
  .post('/add-income', addIncome)
  .get('/get-incomes', getIncomes)
  .delete('/delete-income/:id', deleteIncome)
  .post('/add-expense', addExpense)
  .get('/get-expenses', getExpenses)
  .delete('/delete-expense/:id', deleteExpense);

module.exports = router;

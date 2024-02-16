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
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router
  .post('/add-income', verifyToken, addIncome)
  .patch('/update-income/:id', verifyToken, updateIncome)
  .get('/get-incomes', verifyToken, getIncomes)
  .delete('/delete-income/:id', deleteIncome)
  .post('/add-expense', verifyToken, addExpense)
  .patch('/update-expense/:id', verifyToken, updateExpense)
  .get('/get-expenses', verifyToken, getExpenses)
  .delete('/delete-expense/:id', deleteExpense);

module.exports = router;

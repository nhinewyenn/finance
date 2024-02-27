"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IncomeController_1 = require("../controllers/IncomeController");
const ExpenseController_1 = require("../controllers/ExpenseController");
const router = express_1.default.Router();
router
    .post('/add-income', IncomeController_1.addIncome)
    .patch('/update-income/:id', IncomeController_1.updateIncome)
    .get('/get-incomes', IncomeController_1.getIncomes)
    .delete('/delete-income/:id', IncomeController_1.deleteIncome)
    .post('/add-expense', ExpenseController_1.addExpense)
    .patch('/update-expense/:id', ExpenseController_1.updateExpense)
    .get('/get-expenses', ExpenseController_1.getExpenses)
    .delete('/delete-expense/:id', ExpenseController_1.deleteExpense);
exports.default = router;

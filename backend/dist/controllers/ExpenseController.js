"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.getExpenses = exports.addExpense = void 0;
const expenseModel_1 = __importDefault(require("../models/expenseModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
function addExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, amount, category, description, date, userID } = req.body;
            // validations
            if (!title || !category || !date) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            if (amount <= 0 && typeof amount !== 'number') {
                return res
                    .status(400)
                    .json({ message: 'Amount must be a positive value' });
            }
            const expense = new expenseModel_1.default({
                title,
                amount,
                category,
                description,
                date,
                userID,
            });
            yield expense.save();
            // Add the expense to the user's expenses array
            const user = yield userModel_1.default.findByIdAndUpdate(req.user._id, {
                $push: { expenses: expense._id },
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Expense added', success: true, expense });
        }
        catch (error) {
            res.status(500).json({ message: 'Add expense server error' });
        }
    });
}
exports.addExpense = addExpense;
function getExpenses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const expense = yield expenseModel_1.default.find({
                _id: { $in: user.expenses },
            }).sort({ createdAt: -1 });
            res.status(200).json(expense);
        }
        catch (error) {
            res.status(500).json({ message: 'Get expense server error' });
        }
    });
}
exports.getExpenses = getExpenses;
function updateExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, amount, category, description, date, userID } = req.body;
            const { id } = req.params;
            const expense = yield expenseModel_1.default.findByIdAndUpdate(id, {
                title,
                amount,
                category,
                description,
                date,
                userID,
            }, { new: true });
            if (!expense) {
                return res.status(400).json({
                    success: false,
                    message: 'Update expense error',
                });
            }
            if (amount <= 0 && typeof amount !== 'number') {
                return res
                    .status(400)
                    .json({ message: 'Amount must be a positive value' });
            }
            res.status(200).json({
                success: true,
                message: 'Expense updated successfully',
                expense,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: `Edit expense server error`,
            });
        }
    });
}
exports.updateExpense = updateExpense;
function deleteExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield expenseModel_1.default.findByIdAndDelete(id);
            res.status(200).json({ message: 'Expense deleted' });
        }
        catch (error) {
            console.error('Delete expense error:', error);
            res.status(500).json({ message: 'Delete expense server error' });
        }
    });
}
exports.deleteExpense = deleteExpense;

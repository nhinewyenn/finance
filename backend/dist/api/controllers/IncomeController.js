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
exports.deleteIncome = exports.updateIncome = exports.getIncomes = exports.addIncome = void 0;
const incomeModel_1 = __importDefault(require("../../models/incomeModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
function addIncome(req, res) {
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
            const income = new incomeModel_1.default({
                title,
                amount,
                category,
                description,
                date,
                userID,
            });
            yield income.save();
            const user = yield userModel_1.default.findByIdAndUpdate(req.user._id, {
                $push: { incomes: income._id },
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Income added', success: true, income });
        }
        catch (error) {
            res.status(500).json({ message: 'Add income server error', error });
        }
    });
}
exports.addIncome = addIncome;
function getIncomes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const income = yield incomeModel_1.default.find({
                _id: { $in: user.incomes },
            }).sort({
                createdAt: -1,
            });
            res.status(200).json(income);
        }
        catch (error) {
            res.status(500).json({ message: 'Get income server error', error });
        }
    });
}
exports.getIncomes = getIncomes;
function updateIncome(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, amount, category, description, date, userID } = req.body;
            const { id } = req.params;
            const income = yield incomeModel_1.default.findByIdAndUpdate(id, {
                title,
                amount,
                category,
                description,
                date,
                userID,
            }, { new: true });
            if (!income) {
                return res.status(400).json({
                    success: false,
                    message: 'Income not found',
                });
            }
            if (amount <= 0 && typeof amount !== 'number') {
                return res
                    .status(400)
                    .json({ message: 'Amount must be a positive value' });
            }
            res.status(200).json({
                success: true,
                message: 'Income updated successfully',
                income,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: `Edit income server error`,
            });
        }
    });
}
exports.updateIncome = updateIncome;
function deleteIncome(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield incomeModel_1.default.findByIdAndDelete(id);
            res.status(200).json({ message: 'Income deleted' });
        }
        catch (error) {
            console.error('Delete income error:', error);
            res.status(500).json({ message: 'Delete income server error' });
        }
    });
}
exports.deleteIncome = deleteIncome;

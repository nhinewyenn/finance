"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ExpenseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true,
        validate: {
            validator: (v) => v > 0,
            message: 'Value must be a positive number',
        },
    },
    type: {
        type: String,
        default: 'expense',
    },
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        maxLength: 20,
        trim: true,
    },
    userID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Expense', ExpenseSchema);

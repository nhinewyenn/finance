"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    incomes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'incomes' }],
    expenses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'expenses' }],
}, { timestamps: true });
exports.default = mongoose_1.default.model('User', UserSchema);

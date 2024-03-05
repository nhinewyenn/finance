"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function genToken(_id) {
    const token = jsonwebtoken_1.default.sign({ _id }, process.env.SECRET_KEY, {
        expiresIn: '3d',
    });
    return token;
}
exports.genToken = genToken;

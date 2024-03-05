"use strict";
/** @format */
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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const JWT_SECRET = process.env.SECRET_KEY;
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization || req.headers.Authorization;
            if (!authHeader) {
                return res.status(401).json({
                    error: 'Unauthorized - Header does not have authorization field',
                });
            }
            const token = Array.isArray(authHeader)
                ? authHeader[0].split(' ')[1]
                : authHeader.split(' ')[1];
            console.log(token);
            const user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            req.user = yield userModel_1.default.findById(user._id).select('-password');
            next();
        }
        catch (error) {
            console.error('Error in protectRoute middleware: ', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.verifyToken = verifyToken;

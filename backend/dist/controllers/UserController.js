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
exports.logoutUser = exports.login = exports.registerUser = exports.getUserByID = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
// Routes for all will be api/v1/auth
/**
 * @desc - get all user
 * @method - get
 */
function getUserByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield userModel_1.default.findById(id).select('-password');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({ success: true, user });
        }
        catch (error) {
            console.error('Error retrieving user by ID:', error);
            res.status(500).json({ error: 'Failed to retrieve user' });
        }
    });
}
exports.getUserByID = getUserByID;
/**
 * @desc - register user
 * @method - post
 */
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const userExist = yield userModel_1.default.findOne({ username });
            if (userExist) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            if (password.length < 8) {
                return res
                    .status(400)
                    .json({ message: 'Password must be at least 8 characters long' });
            }
            const hashedPass = yield bcrypt_1.default.hash(password, 12);
            const user = yield userModel_1.default.create({
                username,
                password: hashedPass,
            });
            res.status(201).json({
                success: true,
                message: 'User successfully created',
                _id: user._id,
                username: user.username,
            });
        }
        catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'User not created' });
        }
    });
}
exports.registerUser = registerUser;
/**
 * @desc - login
 * @method - post
 */
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res
                    .status(400)
                    .json({ message: 'Username or password is not provided' });
            }
            const user = yield userModel_1.default.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword) {
                return res
                    .status(401)
                    .json({ message: 'Incorrect username or password' });
            }
            (0, generateToken_1.generateToken)(res, user._id);
            res.status(200).json({
                message: 'Login successful',
                user,
                userID: user._id,
            });
        }
        catch (error) {
            console.error('Error logging in:', error);
            res
                .status(500)
                .json({ message: 'An error occurred with the login process' });
        }
    });
}
exports.login = login;
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie('access_token', {
                path: '/',
                httpOnly: true,
            });
            res.status(200).json({ message: 'Logged out successful' });
        }
        catch (error) {
            console.error('Error in logout controller', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
}
exports.logoutUser = logoutUser;

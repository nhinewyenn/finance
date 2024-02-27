"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
router
    .get('/user/:id', UserController_1.getUserByID)
    .post('/login', UserController_1.login)
    .post('/logout', UserController_1.logoutUser)
    .post('/register', UserController_1.registerUser);
exports.default = router;

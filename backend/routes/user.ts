/** @format */

import express, { Router } from 'express';
import { getAllUser, login, registerUser } from '../controllers/UserController';

const router = express.Router();
router.route('/login').get(getAllUser).post(login);
router.post('/register', registerUser);

module.exports = router;

/** @format */

import express from 'express';
import {
  getUserByID,
  login,
  logoutUser,
  registerUser,
} from '../controllers/UserController';

const router = express.Router();

router
  .get('/user/:id', getUserByID)
  .post('/login', login)
  .post('/logout', logoutUser)
  .post('/register', registerUser);

export default router;

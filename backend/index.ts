/** @format */

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { db } from './db/db';
import { readdirSync } from 'fs';
import { notFound, errorHandler } from './middlewares//errorMiddleware';
import {
  getAllUser,
  getUserByID,
  login,
  registerUser,
} from './controllers/UserController';

const app = express();
const { PORT } = process.env ?? 8000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
readdirSync('./routes').map((route) => {
  app.use('/api/v1/profile/', require('./routes/' + route));
});

// Login and register route
app.get('/api/v1/auth/user', getAllUser);
app.get('/api/v1/auth/user/:id', getUserByID);
app.post('/api/v1/auth/login', login);
app.post('/api/v1/auth/register', registerUser);

// Middleware
app.use(notFound);
app.use(errorHandler);

function server() {
  db();
  app.listen(PORT, () => {
    console.log('You are listening to PORT', PORT);
  });
}

server();

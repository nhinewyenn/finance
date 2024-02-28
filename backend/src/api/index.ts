/** @format */

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { db } from '../config/db';
import { notFound, errorHandler } from './middlewares/errorMiddleware';
import transaction from './transactionRoutes';
import user from './userRoutes';
import { verifyToken } from './middlewares/authMiddleware';
import path from 'path';

const app = express();
const { PORT } = process.env ?? 8000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../../frontend/dist'))); //serve the frontend static asset

// Routes
app.use('/api/v1/profile', verifyToken, transaction);
app.use('/api/v1/auth', user);

// Middleware
// app.use(notFound);
// app.use(errorHandler);

function server() {
  db();
  app.listen(PORT, () => {
    console.log('You are listening to PORT', PORT);
  });
}

server();

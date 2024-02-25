/** @format */

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { db } from './db/db';
import { notFound, errorHandler } from './middlewares/errorMiddleware';
import transaction from './routes/transactionRoutes';
import user from './routes/userRoutes';
import { verifyToken } from './middlewares/authMiddleware';

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
app.use('/api/v1/profile', verifyToken, transaction);
app.use('/api/v1/auth', user);

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

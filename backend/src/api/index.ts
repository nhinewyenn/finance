/** @format */

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express, { Request, Response } from 'express';
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
    origin: [
      process.env.FRONTEND_URL as string,
      process.env.RENDER_URL as string,
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/profile', transaction);
app.use('/api/v1/auth', user);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../../frontend/dist'))); //serve the frontend static asset
} else {
  app.get('/', (req: Request, res: Response) => {
    res.redirect('/api/v1/auth/login');
  });
}

// Middleware;
app.use(notFound);
app.use(errorHandler);

async function connectDB() {
  try {
    await db();
    console.log('Connected to database');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();

// Shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  process.exit(0);
});

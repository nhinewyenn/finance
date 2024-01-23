/** @format */

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import cors from 'cors';
import { db } from './db/db';
import { readdirSync } from 'fs';
import cookieSession from 'cookie-session';
import { notFound, errorHandler } from './controllers/errorMiddleware';
import { getAllUser, login, registerUser } from './controllers/UserController';

const app = express();
const { PORT } = process.env ?? 8000;

// Middlewares
app.use(express.json());
app.use(cors()); // Enable CORS middleware
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SECRET_KEY || ''],
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// Routes

// Routes
readdirSync('./routes').map((route) =>
  app.use('/api/v1', require('./routes/' + route))
);

// Login and register route
app.get('/api/v1/auth/user', getAllUser);
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

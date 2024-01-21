/** @format */

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import cors from 'cors';
import { db } from './db/db';
import { readdirSync } from 'fs';
import cookieSession from 'cookie-session';

const app = express();
const { PORT } = process.env ?? 8000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
); // Enable CORS middleware
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: 'session',
    keys: [`${process.env.SECRET_KEY}`],
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// Routes
readdirSync('./routes').map(
  (route) => app.use('/api/v1', require('./routes/' + route)),
  app.use('/api/v1/auth', require('./routes/user'))
); // read the files from routes folder

function server() {
  db();
  app.listen(PORT, () => {
    console.log('You are listening to PORT', PORT);
  });
}

server();

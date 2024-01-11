/** @format */

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import cors from 'cors';
import { db } from './db/db';
import { readdirSync } from 'fs';

const app = express();
const { PORT } = process.env ?? 8000;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
); // Enable CORS middleware

// Routes
readdirSync('./routes').map((route) =>
  app.use('/api/v1', require('./routes/' + route))
); // read the files from routes folder

function server() {
  db();
  app.listen(PORT, () => {
    console.log('You are listening to PORT', PORT);
  });
}

server();

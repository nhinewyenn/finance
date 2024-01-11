/** @format */

import mongoose from 'mongoose';

export async function db() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection error');
  }
}

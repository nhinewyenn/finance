/** @format */

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'incomes' }],
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'expenses' }],
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);

/** @format */

export type FormInput = {
  _id: string;
  title: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
  type?: 'income' | 'expense';
  createdAt?: Date;
  userID: string;
};

export type User = {
  _id: string;
  username: string;
  password: string;
  createdAt?: Date;
};

export type UserAPI = {
  success: boolean;
  user: User;
};

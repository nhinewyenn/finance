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
};

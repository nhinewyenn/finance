/** @format */
import express, { Response, Request } from 'express';
import ExpenseSchema from '../models/expenseModel';

export async function addExpense(req: Request, res: Response) {
  const { title, amount, category, description, date } = req.body;

  const expense = new ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    // validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (amount <= 0 && typeof amount !== 'number') {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive value' });
    }

    await expense.save();
    res.status(200).json({ message: 'Expense added' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getExpenses(req: Request, res: Response) {
  try {
    // Last created item to be at the top
    const expense = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteExpense(req: Request, res: Response) {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: 'Expense deleted' });
    })
    .catch((err) => res.status(500).json({ message: 'Server error' }));
}

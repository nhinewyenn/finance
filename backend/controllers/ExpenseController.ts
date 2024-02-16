/** @format */
import express, { Response, Request } from 'express';
import ExpenseSchema from '../models/expenseModel';
import UserSchema from '../models/userModel';

export async function addExpense(req: Request, res: Response) {
  const { title, amount, category, description, date, user } = req.body;

  const expense = new ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    user: user,
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
    res.status(500).json({ message: 'Add expense server error' });
  }
}

export async function getExpenses(req: Request, res: Response) {
  const user = await UserSchema.findById(req.body.userId);

  try {
    // Last created item to be at the top
    const expense = await ExpenseSchema.find({ user: user?._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Get expense server error' });
  }
}

export async function updateExpense(req: Request, res: Response) {
  try {
    const { title, amount, category, description, date, user } = req.body;
    const { id } = req.params;
    const income = await ExpenseSchema.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        category,
        description,
        date,
        user: user,
      },
      { new: true }
    );

    if (!income) {
      return res.status(400).json({
        success: false,
        message: 'Expense not found',
      });
    }

    if (amount <= 0 && typeof amount !== 'number') {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive value' });
    }

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      income,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Edit expense server error`,
    });
  }
}

export async function deleteExpense(req: Request, res: Response) {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: 'Expense deleted' });
    })
    .catch((err) =>
      res.status(500).json({ message: 'Delete expense server error' })
    );
}

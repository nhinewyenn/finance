/** @format */
import express, { Response, Request } from 'express';
import ExpenseSchema from '../models/expenseModel';
import UserSchema from '../models/userModel';

export async function addExpense(req: Request, res: Response) {
  const { title, amount, category, description, date, userID } = req.body;
  const expense = new ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    userID,
  });

  try {
    // validations
    if (!title || !category || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (amount <= 0 && typeof amount !== 'number') {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive value' });
    }

    await expense.save();

    // Add the expense to the user's expenses array
    const user = await UserSchema.findByIdAndUpdate(req.user._id, {
      $push: { expenses: expense._id },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Expense added', success: true, expense });
  } catch (error) {
    res.status(500).json({ message: 'Add expense server error' });
  }
}

export async function getExpenses(req: Request, res: Response) {
  try {
    const user = await UserSchema.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const expensesId = user.expenses ?? [];
    const expense = await ExpenseSchema.find({
      _id: { $in: expensesId },
    }).sort({ createdAt: -1 });

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Get expense server error' });
  }
}

export async function updateExpense(req: Request, res: Response) {
  try {
    const { title, amount, category, description, date, userID } = req.body;
    const { id } = req.params;
    const expense = await ExpenseSchema.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        category,
        description,
        date,
        userID,
      },
      { new: true }
    );

    if (!expense) {
      return res.status(400).json({
        success: false,
        message: 'Update expense error',
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
      expense,
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
    .then(() => {
      res.status(200).json({ message: 'Expense deleted' });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'Delete expense server error', success: false })
    );
}

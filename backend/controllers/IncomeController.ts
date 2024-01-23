/** @format */
import express, { Response, Request } from 'express';
import IncomeSchema from '../models/incomeModel';

export async function addIncome(req: Request, res: Response) {
  const { title, amount, category, description, date } = req.body;

  const income = new IncomeSchema({
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

    await income.save();
    res.status(200).json({ message: 'Income added' });
  } catch (error) {
    res.status(500).json({ message: 'Add income server error' });
  }
}

export async function getIncomes(req: Request, res: Response) {
  try {
    // Last created item to be at the top
    const income = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Get income server error' });
  }
}

export async function deleteIncome(req: Request, res: Response) {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: 'Income deleted' });
    })
    .catch((err) => res.status(500).json({ message: 'Delete income error' }));
}

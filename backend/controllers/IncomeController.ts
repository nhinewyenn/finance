/** @format */
import { Response, Request } from 'express';
import IncomeSchema from '../models/incomeModel';
import userModel from '../models/userModel';

export async function addIncome(req: Request, res: Response) {
  const { title, amount, category, description, date, userID } = req.body;
  const income = new IncomeSchema({
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

    await income.save();
    res.status(200).json({ message: 'Income added' });
  } catch (error) {
    res.status(500).json({ message: 'Add income server error', error });
  }
}

export async function getIncomes(req: Request, res: Response) {
  try {
    const user = await userModel.findById(req.body.userID);
    const income = await IncomeSchema.find().sort({
      createdAt: -1,
    });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Get income server error', error });
  }
}

export async function updateIncome(req: Request, res: Response) {
  try {
    const { title, amount, category, description, date, userID } = req.body;
    const { id } = req.params;
    const income = await IncomeSchema.findByIdAndUpdate(
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

    if (!income) {
      return res.status(400).json({
        success: false,
        message: 'Income not found',
      });
    }

    if (amount <= 0 && typeof amount !== 'number') {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive value' });
    }

    res.status(200).json({
      success: true,
      message: 'Income updated successfully',
      income,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Edit income server error`,
    });
  }
}

export async function deleteIncome(req: Request, res: Response) {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Income deleted' });
    })
    .catch((err) => res.status(500).json({ message: 'Delete income error' }));
}

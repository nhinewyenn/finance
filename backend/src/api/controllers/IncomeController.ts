/** @format */
import { Response, Request } from 'express';
import IncomeSchema from '../../models/incomeModel';
import UserSchema from '../../models/userModel';

export async function addIncome(req: Request, res: Response) {
  try {
    const { title, amount, category, description, date, userID } = req.body;

    // validations
    if (!title || !category || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (amount <= 0 && typeof amount !== 'number') {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive value' });
    }

    const income = new IncomeSchema({
      title,
      amount,
      category,
      description,
      date,
      userID,
    });

    const savedIncome = await income.save();

    if (!savedIncome) {
      return res.status(500).json({ message: 'Failed to save income' });
    }

    const user = await UserSchema.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { incomes: savedIncome._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res
      .status(200)
      .json({ message: 'Income added', success: true, savedIncome });
  } catch (error) {
    res.status(500).json({ message: 'Add income server error', error });
  }
}

export async function getIncomes(req: Request, res: Response) {
  try {
    const user = await UserSchema.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const income = await IncomeSchema.find({
      _id: { $in: user.incomes },
    }).sort({
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

    if (amount <= 0 && typeof amount !== 'number') {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive value' });
    }

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
  try {
    const { id } = req.params;
    const income = await IncomeSchema.findByIdAndDelete(id);

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    res.status(200).json({ message: 'Income deleted' });
  } catch (error) {
    console.error('Delete income error:', error);
    res.status(500).json({ message: 'Delete income server error' });
  }
}

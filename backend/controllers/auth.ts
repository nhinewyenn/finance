/** @format */
import express, { Response, Request } from 'express';
import UserSchema from '../models/userModel';

export async function registerUser(req: Request, res: Response) {
  const { username, password } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'Password is less than 6 character' });
  }

  try {
    await UserSchema.create({ username, password }).then((user) =>
      res.status(200).json({ message: 'User successfully created', user })
    );
  } catch (error) {
    res.status(401).json({ message: 'User not created' });
  }
}

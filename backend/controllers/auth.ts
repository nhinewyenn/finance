/** @format */
import express, { Response, Request } from 'express';
import UserSchema from '../models/userModel';
import bcrypt from 'bcrypt';

export async function registerUser(req: Request, res: Response, next) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserSchema.create({
      username,
      password: hashedPassword,
    });
    res.status(200).json({ message: 'User successfully created', user });
  } catch (error) {
    res.status(401).json({ message: 'User not created' });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username or password is not presented' });
  }

  try {
    const user = await UserSchema.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Login unsuccessful', error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(400).json({
        message: 'Login unsuccessful',
        error: 'Password do not match',
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'An error occurred with login process' });
  }
}

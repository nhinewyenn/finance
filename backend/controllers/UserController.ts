/** @format */
import express, { Response, Request } from 'express';
import UserSchema from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken';

// Routes for all will be api/v1/auth

/**
 * @desc - get all user
 * @method - get
 */
export async function getAllUser(req: Request, res: Response) {
  // find all user from mongo but exclude the password
  const user = await UserSchema.find({}).select('-password');
  res.status(201).json({ success: true, count: user.length, user });
}

/**
 * @desc - register user
 * @method - post
 */
export async function registerUser(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user = await UserSchema.create({
      username,
      password: hashedPass,
    });

    res.status(200).json({
      message: 'User successfully created',
      user: {
        id: user._id,
        username: user.username,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(401).json({ message: 'User not created' });
  }
}

/**
 * @desc - login
 * @method - post
 */
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

    const matchedPass = await bcrypt.compare(password, user.password);

    if (matchedPass) {
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          token: generateToken(user.id),
        },
      });
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

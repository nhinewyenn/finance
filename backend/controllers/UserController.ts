/** @format */

import { Response, Request } from 'express';
import UserSchema from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken';

// Routes for all will be api/v1/auth

/**
 * @desc - get all user
 * @method - get
 */
export async function getAllUser(req: Request, res: Response) {
  try {
    const users = await UserSchema.find({}, { password: 0 }); // exclude password
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
}

export async function getUserByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await UserSchema.findById(id, { password: 0 });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
}

/**
 * @desc - register user
 * @method - post
 */
export async function registerUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = await UserSchema.findOne({ username });

  if (user) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  try {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters long' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      const user = new UserSchema({
        username,
        password: hashedPass,
      });

      await user.save();
      return res.status(200).json({ message: 'User successfully created' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
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
      return res.status(400).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Incorrect username or password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        token: generateToken(user._id),
      },
      userID: user._id,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(400).json({ message: 'An error occurred with login process' });
  }
}
/** @format */

import { Response, Request } from 'express';
import UserSchema from '../../models/userModel';
import bcrypt from 'bcrypt';
import { genToken } from '../../utils/generateToken';

/**
 * @desc - get all user
 * @method - get
 */

export async function getUserByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await UserSchema.findById(id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
}

/**
 * @desc - register user
 * @method - post
 */
export async function registerUser(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const userExist = await UserSchema.findOne({ username });

    if (userExist) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters long' });
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const user = await UserSchema.create({
      username,
      password: hashedPass,
    });

    res.status(201).json({
      success: true,
      message: 'User successfully created',
      _id: user._id,
      username: user.username,
      token: genToken(user._id),
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'User not created' });
  }
}

/**
 * @desc - login
 * @method - post
 */

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username or password is not provided' });
    }

    const user = await UserSchema.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: 'Incorrect username or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user,
      userID: user._id,
      token: genToken(user._id),
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res
      .status(500)
      .json({ message: 'An error occurred with the login process' });
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    res.removeHeader('Authorization');
    res.status(200).json({ message: 'Logged out successful' });
  } catch (error) {
    console.error('Error in logout controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

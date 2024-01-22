/** @format */
import express, { Response, Request } from 'express';
import UserSchema from '../models/userModel';
import bcrypt from 'bcrypt';

export async function registerUser(req: Request, res: Response, next) {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    bcrypt
      .hash(password, 10)
      .then(
        async (hash) => await UserSchema.create({ username, password: hash })
      )
      .then((user) =>
        res.status(200).json({ message: 'User successfully created', user })
      );
  } catch (error) {
    res.status(401).json({ message: 'User not created' });
  }

  next();
}

export async function login(req: Request, res: Response, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username or password is not presented' });
  }

  try {
    const user = await UserSchema.findOne({ username });

    if (!user) {
      res
        .status(400)
        .json({ message: 'Login unsuccessful', error: 'User not found' });
    } else {
      // compare given password with hashed password
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          res.status(200).json({
            message: 'Login successful',
            user,
          });
        } else {
          res.status(400).json({
            message: 'Login unsuccessful',
            error: 'Password do not match',
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'An error occurred',
    });
  }
}

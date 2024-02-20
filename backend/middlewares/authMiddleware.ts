/** @format */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserSchema from '../models/userModel';

const JWT_SECRET = process.env.SECRET_KEY as string;

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  _id: string;
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { jwt } = req.cookies;

    console.log('cookie', jwt); //undefined

    if (!jwt) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - No Token Provided' });
    }

    const { _id } = jwt.verify(jwt, JWT_SECRET) as JwtPayload;
    console.log('Decoded user ID:', _id);

    if (!_id) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }

    const user = await UserSchema.findById(_id).select('-password');
    console.log('user', user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    res.locals.user = user;

    next();
  } catch (error) {
    console.log('Error in protectRoute middleware: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

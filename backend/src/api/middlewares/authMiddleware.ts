/** @format */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserSchema from '../../models/userModel';

const JWT_SECRET = process.env.SECRET_KEY as string;

declare global {
  namespace Express {
    interface Request {
      user: any;
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
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'Unauthorized - Header does not have authorization field',
      });
    }

    const token = Array.isArray(authHeader)
      ? authHeader[0].split(' ')[1]
      : authHeader.split(' ')[1];

    const user = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = await UserSchema.findById(user._id).select('-password').lean();
    next();
  } catch (error) {
    console.error('Error in protectRoute middleware: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

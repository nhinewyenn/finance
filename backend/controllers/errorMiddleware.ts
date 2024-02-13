/** @format */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.SECRET_KEY as string;

export function notFound(req: Request, res: Response, next: NextFunction) {
  const err = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(err);
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const bearerPrefix = 'Bearer ';

  if (authHeader && authHeader.startsWith(bearerPrefix)) {
    try {
      const token = authHeader.substring(bearerPrefix.length);
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

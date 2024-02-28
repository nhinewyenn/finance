/** @format */

/** @format */
import { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction) {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: err.message,
  });
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let status = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
  }

  res.status(status).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}

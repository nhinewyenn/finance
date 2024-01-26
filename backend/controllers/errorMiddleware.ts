/** @format */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({ success: false, message: err.message });
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) return res.status(403).send('Forbidden');
      next();
    });
  } else {
    return res.status(401).send('Unauthorized');
  }
}

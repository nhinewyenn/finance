/** @format */

import { Response } from 'express';
import jwt from 'jsonwebtoken';

export function generateToken(_id: unknown, res: Response) {
  const token = jwt.sign({ _id }, process.env.SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attack
    sameSite: 'strict', // CSRF attack cross-site request forgery attack
    secure: process.env.NODE_ENV !== 'development',
  });

  return token;
}

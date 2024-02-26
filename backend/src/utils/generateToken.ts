/** @format */

import { Response } from 'express';
import jwt from 'jsonwebtoken';

export function generateToken(res: Response, _id: unknown) {
  const token = jwt.sign({ _id }, process.env.SECRET_KEY as string, {
    expiresIn: '14d',
  });

  res.cookie('access_token', token, {
    httpOnly: true, //prevent XSS attack
    sameSite: 'strict', // CSRF attack cross-site request forgery attack
    maxAge: 30 * 24 * 60 * 1000,
  });
}
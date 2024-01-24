/** @format */

import jwt from 'jsonwebtoken';

export function generateToken(_id: unknown) {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
}

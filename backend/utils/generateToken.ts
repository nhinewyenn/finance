/** @format */

import jwt from 'jsonwebtoken';

export function generateFunction(id: string) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
}

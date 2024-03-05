/** @format */

import jwt from 'jsonwebtoken';

export function genToken(_id: unknown) {
  const token = jwt.sign({ _id }, process.env.SECRET_KEY as string, {
    expiresIn: '3d',
  });
  return token;
}

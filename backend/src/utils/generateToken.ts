/** @format */

import jwt from 'jsonwebtoken';

export function genToken(_id: unknown) {
  try {
    if (_id == null || _id === '' || _id === undefined) {
      throw new Error('Invalid _id parameter');
    }

    const token = jwt.sign({ _id }, process.env.SECRET_KEY as string, {
      expiresIn: '5d',
    });
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    return null;
  }
}

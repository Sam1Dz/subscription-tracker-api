import JWT from 'jsonwebtoken';

/* CONFIG */
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env';

/* TYPES */
import type { Types } from 'mongoose';
import type { SignOptions } from 'jsonwebtoken';

const generateToken = (userId: Types.ObjectId) => {
  return JWT.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'],
  });
};

export default generateToken;

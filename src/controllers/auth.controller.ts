import Mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';

/* MODELS */
import UserModel from '../models/user.model';

/* UTILITIES */
import ApiError from '../utils/ApiError';
import generateToken from '../utils/jwt';

/* TYPES */
import type { IUser } from '../types/user';
import type { BaseResponse } from '../types';
import type { Request, Response, NextFunction } from 'express';

type AuthResponse = BaseResponse<{
  token: string;
  user: Omit<IUser, 'password'>;
}>;
type SignUpBody = Omit<IUser, 'createdAt' | 'updatedAt'>;
type SignInBody = Omit<SignUpBody, 'name'>;

export const signUp = async (
  req: Request<object, object, SignUpBody>,
  res: Response<AuthResponse>,
  next: NextFunction,
) => {
  const session = await Mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // Check if a user already exists
    const existingUser = await UserModel.findOne({ email })
      .session(session)
      .lean();

    if (existingUser) {
      throw new ApiError(409, 'User already exists');
    }

    // Hash password
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);

    const newUsers = await UserModel.create(
      [{ name, email, password: hashedPassword }],
      { session },
    );

    const token = generateToken(newUsers[0]._id);

    // Exclude password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userData } = newUsers[0].toObject();

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: userData,
      },
    });
  } catch (error: unknown) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (
  req: Request<object, object, SignInBody>,
  res: Response<AuthResponse>,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email })
      .select('password email name')
      .lean();

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Check if password valid
    const isPasswordValid = await Bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid password');
    }

    const token = generateToken(user._id);

    // Exclude password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userData } = user;

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user: userData,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};

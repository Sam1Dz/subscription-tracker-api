/* UTILITIES */
import ApiError from '../utils/ApiError';

/* TYPES */
import type { MongoError } from 'mongodb';
import type { Error as MongooseError } from 'mongoose';
import type { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}
type AppError =
  | ApiError
  | CustomError
  | MongoError
  | MongooseError.ValidationError;

const errorMiddleware = (
  err: AppError,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  console.error(err);

  let statusCode = 500;
  let message = 'Server Error';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    data = 'data' in err ? err.data : undefined;
  } else if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  } else if ('code' in err && err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  } else if (err.name === 'ValidationError' && 'errors' in err && err.errors) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  } else if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(data && { data }),
    ...(process.env.npm_lifecycle_event === 'dev' && { stack: err.stack }),
  });
};

export default errorMiddleware;

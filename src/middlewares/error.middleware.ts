import { Error as MongooseError } from 'mongoose';

/* TYPES */
import type { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

const ErrorMiddleware = (
  err: CustomError | MongooseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let error = { ...err } as CustomError;
    error.message = err.message;

    console.error(err);

    if (err instanceof MongooseError.CastError) {
      const message = 'Resource not found';
      error = new Error(message) as CustomError;
      error.statusCode = 404;
    }

    if (err instanceof MongooseError.ValidationError) {
      const message = Object.values(err.errors)
        .map((val) => val.message)
        .join(', ');
      error = new Error(message) as CustomError;
      error.statusCode = 400;
    }

    if (err instanceof MongooseError.DocumentNotFoundError) {
      const message = 'Resource not found';
      error = new Error(message) as CustomError;
      error.statusCode = 404; // Or 204 No Content
    }

    if (err instanceof MongooseError.MissingSchemaError) {
      const message = 'Schema is missing for the model';
      error = new Error(message) as CustomError;
      error.statusCode = 500;
    }

    if (err instanceof MongooseError.OverwriteModelError) {
      const message = 'Model with that name already exists';
      error = new Error(message) as CustomError;
      error.statusCode = 500;
    }

    if (err.name === 'MongoServerError') {
      if (err.message.includes('E11000')) {
        const message = 'Duplicate field value entered';
        error = new Error(message) as CustomError;
        error.statusCode = 400;
      } else {
        const message = `Database error: ${err.message}`;
        error = new Error(message) as CustomError;
        error.statusCode = 500;

        console.error('MongoServerError details:', err);
      }
    }

    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message || 'Server Error' });
  } catch (error) {
    next(error);
  }
};

export default ErrorMiddleware;

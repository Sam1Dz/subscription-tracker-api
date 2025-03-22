/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ApiError extends Error {
  public statusCode: number;
  public data?: any;

  constructor(statusCode = 500, message: string, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
  }
}

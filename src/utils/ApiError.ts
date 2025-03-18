export default class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode = 500, message: string) {
    super(message);
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = this.constructor.name;
  }
}

import Express from 'express';
import CookieParser from 'cookie-parser';
import Mongoose from 'mongoose';
import Http from 'http';

import connectDB from './database';
import { BASE_API, PORT } from './config/env';

/* ROUTES */
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import subscriptionRouter from './routes/subscription.route';

/* MIDDLEWARE */
import errorMiddleware from './middlewares/error.middleware';

/* UTILITIES */
import ApiError from './utils/ApiError';

/* TYPES */
import type { Request, Response, NextFunction } from 'express';

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(CookieParser());

app.get('/', (_: Request, res: Response) => {
  res.send('Welcome to the Subscription Tracker API!');
});

app.use(`${BASE_API}/auth`, authRouter);
app.use(`${BASE_API}/users`, userRouter);
app.use(`${BASE_API}/subscriptions`, subscriptionRouter);

app.use((req: Request, _: Response, next: NextFunction) => {
  return next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

app.use(errorMiddleware);

let server: Http.Server;

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () => {
      console.info(
        `Subscription Tracker API is running on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

const stopServer = async () => {
  console.info('\nShutting down server...');
  try {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
      console.info('HTTP server closed.');
    }

    await Mongoose.disconnect();
    console.info('Database Disconnected.');
    process.exit(0);
  } catch (err: unknown) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);

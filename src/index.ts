import Express from 'express';
import CookieParser from 'cookie-parser';

import connectDB from './database';
import { BASE_URL, PORT } from './config/env';

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

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/users`, userRouter);
app.use(`${BASE_URL}/subscription`, subscriptionRouter);

app.use((req: Request, _: Response, next: NextFunction) => {
  return next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

app.use(errorMiddleware);

const StartServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.info(
        `Subscription Tracker API is running on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

StartServer();

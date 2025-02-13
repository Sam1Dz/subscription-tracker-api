import Express from 'express';
import CookieParser from 'cookie-parser';

import ConnectDB from './database';
import { BASE_URL, PORT } from './config/env';

/* MIDDLEWARE */
import ErrorMiddleware from './middlewares/error.middleware';

/* ROUTES */
import AuthRouter from './routes/auth.route';
import UserRouter from './routes/user.route';
import SubscriptionRouter from './routes/subscription.route';

const App = Express();

App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use(CookieParser());
App.use(ErrorMiddleware);

App.get('/', (_, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

App.use(`${BASE_URL}/auth`, AuthRouter);
App.use(`${BASE_URL}/users`, UserRouter);
App.use(`${BASE_URL}/subscription`, SubscriptionRouter);

App.listen(PORT, async () => {
  console.info(
    `Subscription Tracker API is running on http://localhost:${PORT}`,
  );

  await ConnectDB();
});

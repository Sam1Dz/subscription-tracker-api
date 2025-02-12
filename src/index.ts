import Express from 'express';
import ConnectDB from './database';
import { PORT } from './config/env';

const App = Express();

App.get('/', (_, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

App.listen(PORT, async () => {
  console.info(
    `Subscription Tracker API is running on http://localhost:${PORT}`,
  );

  await ConnectDB();
});

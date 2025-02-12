import Express from 'express';

const App = Express();

App.get('/', (_, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

App.listen(3001, () => {
  console.info('Subscription Tracker API is running on http://localhost:3001');
});

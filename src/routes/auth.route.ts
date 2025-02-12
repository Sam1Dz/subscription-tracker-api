import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.post('/sign-up', (_, res) => {
  res.send({ title: 'Sign up' });
});

AuthRouter.post('/sign-in', (_, res) => {
  res.send({ title: 'Sign in' });
});

AuthRouter.post('/sign-out', (_, res) => {
  res.send({ title: 'Sign out' });
});

export default AuthRouter;

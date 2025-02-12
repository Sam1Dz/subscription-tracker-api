import { Router } from 'express';

const UserRouter = Router();

UserRouter.get('/', (_, res) => {
  res.send({ title: 'GET all users' });
});

UserRouter.get('/:id', (req, res) => {
  res.send({ title: 'GET user details' });
});

UserRouter.post('/', (req, res) => {
  res.send({ title: 'CREATE new user' });
});

UserRouter.put('/:id', (req, res) => {
  res.send({ title: 'UPDATE user' });
});

UserRouter.delete('/:id', (req, res) => {
  res.send({ title: 'DELETE user' });
});

export default UserRouter;

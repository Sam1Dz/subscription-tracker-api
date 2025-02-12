import { Router } from 'express';

const SubscriptionRouter = Router();

SubscriptionRouter.get('/', (req, res) => {
  res.send({ title: 'GET all subscriptions' });
});

SubscriptionRouter.get('/:id', (req, res) => {
  res.send({ title: 'GET subscription details' });
});

SubscriptionRouter.post('/', (req, res) => {
  res.send({ title: 'CREATE subscription' });
});

SubscriptionRouter.put('/:id', (req, res) => {
  res.send({ title: 'UPDATE subscription' });
});

SubscriptionRouter.delete('/:id', (req, res) => {
  res.send({ title: 'DELETE subscription' });
});

SubscriptionRouter.get('/user/:id', (req, res) => {
  res.send({ title: 'GET all user subscription' });
});

SubscriptionRouter.put('/:id/cancel', (req, res) => {
  res.send({ title: 'CANCEL subscription' });
});

SubscriptionRouter.get('/upcoming-renewals', (req, res) => {
  res.send({ title: 'GET upcoming subscription' });
});

export default SubscriptionRouter;

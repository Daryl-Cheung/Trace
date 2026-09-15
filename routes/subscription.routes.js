import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js';

const subscriptRouter = Router();

subscriptRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions'}));

subscriptRouter.get('/:id', (req, res) => res.send({ title: 'GET subscription details'}));

subscriptRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals'}));

subscriptRouter.post('/', authorize, createSubscription);

subscriptRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription'}));

subscriptRouter.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription'}));

subscriptRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscription'}));

export default subscriptRouter;
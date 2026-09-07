import { Router } from 'express';

const subscriptRouter = Router();

subscriptRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions'}));

subscriptRouter.get('/:id', (req, res) => res.send({ title: 'GET subscription details'}));

subscriptRouter.get('/user/:id', (req, res) => res.send({ title: 'GET all user subscription details'}));

subscriptRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals'}));

subscriptRouter.post('/', (req, res) => res.send({ title: 'CREATE  subscription'}));

subscriptRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription'}));

subscriptRouter.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription'}));

subscriptRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscription'}));

export default subscriptRouter;
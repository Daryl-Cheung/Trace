import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => ({ title: 'GET all users'}));
userRouter.get('/:id', (req, res) => ({ title: 'GET user details'}));

userRouter.post('/', (req, res) => ({ title: 'CREATE new user'}));

userRouter.put('/id', (req, res) => ({ title: 'UPDATE user'}));

userRouter.delete('/id', (req, res) => ({ title: 'DELETE user'}));

export default userRouter;
import { Router } from 'express';
import { getUsers, getUser } from '../controllers/users.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => ({ title: 'CREATE new user'}));

userRouter.put('/id', (req, res) => ({ title: 'UPDATE user'}));

userRouter.delete('/id', (req, res) => ({ title: 'DELETE user'}));

export default userRouter;
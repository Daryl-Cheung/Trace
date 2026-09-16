import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import {
    createSubscription,
    getUserSubscriptions,
    getAllSubscriptions,
    getSubscriptionDetails,
    updateSubscription,
    cancelSubscription,
    deleteSubscription,
    getUpcomingRenewals,
} from '../controllers/subscription.controller.js';

const subscriptRouter = Router();

subscriptRouter.get('/', getAllSubscriptions);

subscriptRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);

subscriptRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptRouter.get('/:id', authorize, getSubscriptionDetails);

subscriptRouter.post('/', authorize, createSubscription);

subscriptRouter.put('/:id', authorize, updateSubscription);

subscriptRouter.put('/:id/cancel', authorize, cancelSubscription);

subscriptRouter.delete('/:id', authorize, deleteSubscription);

export default subscriptRouter;

import express from 'express';
import cors from 'cors';

import { PORT, CLIENT_URL } from "./config/env.js";

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

app.use(cors({ origin: CLIENT_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Vercel imports this module as a request handler and never calls listen(),
// so the database connects lazily on the first request instead.
if (process.env.VERCEL) {
    app.use(async (req, res, next) => {
        try {
            await connectToDatabase();
            next();
        } catch (error) {
            next(error);
        }
    });
}

app.use(arcjetMiddleware);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send("Welcome to Trace!");
});

if (!process.env.VERCEL) {
    app.listen(PORT, async () => {
        console.log(`Subscription tracker API is running on http://localhost:${PORT}`);
        await connectToDatabase();
    });
}

export default app;
import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
 throw new Error('Please define the MONGODB_URI environment vairable inside .env.<dev/prod>.local');
}

let connectionPromise = null;

const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(DB_URI)
            .then((conn) => {
                console.log(`Connected to database in ${NODE_ENV} mode`);
                return conn;
            })
            .catch((error) => {
                connectionPromise = null;
                console.error('Error connecting to database: ', error);
                throw error;
            });
    }

    return connectionPromise;
}

export default connectToDatabase
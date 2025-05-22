// MongoDB database connection
import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
    if (cachedConnection) {
        console.log('=> using existing database connection');
        return cachedConnection;
    }

    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        
        console.log('Connecting to MongoDB...', MONGODB_URI.substring(0, 20) + '...');
        
        // Set mongoose options
        mongoose.set('strictQuery', false);
        
        // Connect to the database
        const connection = await mongoose.connect(MONGODB_URI);
        cachedConnection = connection;
        
        console.log('=> MongoDB connected successfully');
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export async function disconnectFromDatabase() {
    if (!cachedConnection) {
        return;
    }

    try {
        await mongoose.disconnect();
        cachedConnection = null;
        console.log('=> disconnected from database');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        throw error;
    }
}

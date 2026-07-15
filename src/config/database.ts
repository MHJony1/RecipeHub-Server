import mongoose from 'mongoose';
import { config } from './env';

let cachedConnection: typeof mongoose | null = null;

export const connectDatabase = async (): Promise<typeof mongoose> => {
  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
    });
    cachedConnection = mongoose;
    console.log('✓ MongoDB Connected');
    return mongoose;
  } catch (error) {
    console.error('✗ MongoDB Connection Failed:', error);
    throw error;
  }
};

export const ensureConnection = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDatabase();
    }
  } catch (error) {
    console.error('✗ Failed to ensure database connection:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('✓ MongoDB Disconnected');
  } catch (error) {
    console.error('✗ MongoDB Disconnection Failed:', error);
    throw error;
  }
};

import mongoose from 'mongoose';
import { config } from './env';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.warn('⚠ MongoDB Connection Failed (continuing in development mode)');
    if (config.nodeEnv === 'production') {
      process.exit(1);
    }
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✓ MongoDB Disconnected');
  } catch (error) {
    console.error('✗ MongoDB Disconnection Failed:', error);
    process.exit(1);
  }
};

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/recipehub',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
};

export const isDevelopment = config.nodeEnv === 'development';
export const isProduction = config.nodeEnv === 'production';

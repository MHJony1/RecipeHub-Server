import app from './app';
import { config } from './config/env';
import { connectDatabase } from './config/database';

const startServer = async (): Promise<void> => {
  try {
    if (config.nodeEnv === 'production') {
      console.log('ℹ Production mode: connection will be established on first request');
    } else {
      await connectDatabase();
    }

    app.listen(config.port, () => {
      console.log(`✓ Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    if (config.nodeEnv !== 'production') {
      process.exit(1);
    }
  }
};

startServer();

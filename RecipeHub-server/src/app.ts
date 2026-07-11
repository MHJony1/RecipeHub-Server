import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env';
import healthRoutes from './routes/health';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);

// Logging middleware
app.use(morgan('dev'));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health routes
app.use('/api/v1', healthRoutes);

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

export default app;

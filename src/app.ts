import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config/env';
import { ensureConnection } from './config/database';
import healthRoutes from './routes/health';
import authRoutes from './routes/auth.routes';
import recipeRoutes from './routes/recipe.routes';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

const app = express();

// Ensure database connection before handling requests
app.use(async (_req, res, next) => {
  try {
    await ensureConnection();
    next();
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Database connection unavailable',
    });
  }
});

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
app.use(cookieParser());

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'RecipeHub API is running',
    version: '1.0.0',
  });
});

// Health routes
app.use('/api/v1', healthRoutes);

// Auth routes
app.use('/api/v1/auth', authRoutes);

// Recipe routes
app.use('/api/v1/recipes', recipeRoutes);

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

export default app;

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { sendError } from '../utils/response';
import { isProduction } from '../config/env';

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    sendError(res, error.statusCode, error.message);
    return;
  }

  if (error.name === 'ValidationError') {
    sendError(res, 400, 'Validation Error', [error.message]);
    return;
  }

  if (error.name === 'CastError') {
    sendError(res, 400, 'Invalid ID Format');
    return;
  }

  console.error('Unhandled Error:', error);
  const message = isProduction ? 'Internal Server Error' : error.message;
  sendError(res, 500, message);
};

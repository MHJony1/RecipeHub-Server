import { Request, Response } from 'express';
import { sendError } from '../utils/response';

export const notFound = (req: Request, res: Response): void => {
  sendError(res, 404, `Route ${req.originalUrl} not found`);
};

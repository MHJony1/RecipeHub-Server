import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validators/auth';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendError } from '../utils/response';
import { AppError } from '../utils/AppError';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => issue.message);
    sendError(res, 400, 'Validation error', errors);
    return;
  }

  const result = await authService.register(parsed.data);
  sendSuccess(res, 201, 'Registration successful', result);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => issue.message);
    sendError(res, 400, 'Validation error', errors);
    return;
  }

  const result = await authService.login(parsed.data);
  sendSuccess(res, 200, 'Login successful', result);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  sendSuccess(res, 200, 'Logged out successfully');
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const user = await authService.getCurrentUser(req.user.id);
  sendSuccess(res, 200, 'Current user', user);
});

import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/response';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  sendSuccess(res, 200, 'RecipeHub API Running');
});

export default router;

import { Router } from 'express';
import {
  createRecipe,
  getRecipes,
  getRecipeBySlug,
  getRecipeById,
  getUserRecipes,
  updateRecipe,
  deleteRecipe,
} from '../controllers/recipe.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, createRecipe);
router.get('/', getRecipes);
router.get('/user/my-recipes', authMiddleware, getUserRecipes);
router.get('/slug/:slug', getRecipeBySlug);
router.get('/:id', getRecipeById);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);

export default router;

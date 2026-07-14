import { Request, Response } from 'express';
import { recipeService } from '../services/recipe.service';
import { createRecipeSchema } from '../validators/recipe';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendError } from '../utils/response';
import { AppError } from '../utils/AppError';

export const createRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    const parsed = createRecipeSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => issue.message);
      sendError(res, 400, 'Validation error', errors);
      return;
    }

    const recipe = await recipeService.createRecipe(parsed.data, req.user.id);
    sendSuccess(res, 201, 'Recipe created successfully', recipe);
  }
);

export const getRecipes = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as any;

  const recipes = await recipeService.getRecipes({
    search: query.search,
    category: query.category,
    difficulty: query.difficulty,
    cookingTime: query.cookingTime,
    sort: query.sort,
  });

  sendSuccess(res, 200, 'Recipes fetched', recipes);
});

export const getRecipeBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const slug = req.params.slug as string;
    const recipe = await recipeService.getRecipeBySlug(slug);
    sendSuccess(res, 200, 'Recipe fetched', recipe);
  }
);

export const getRecipeById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const recipe = await recipeService.getRecipeById(id);
    sendSuccess(res, 200, 'Recipe fetched', recipe);
  }
);

export const getUserRecipes = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    const recipes = await recipeService.getUserRecipes(req.user.id);

    sendSuccess(
      res,
      200,
      'User recipes fetched',
      recipes
    );
  }
);

export const updateRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    const parsed = createRecipeSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => issue.message);
      sendError(res, 400, 'Validation error', errors);
      return;
    }

    const id = req.params.id as string;
    const recipe = await recipeService.updateRecipe(
      id,
      parsed.data,
      req.user.id
    );
    sendSuccess(res, 200, 'Recipe updated successfully', recipe);
  }
);

export const deleteRecipe = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    const id = req.params.id as string;
    await recipeService.deleteRecipe(id, req.user.id);
    sendSuccess(res, 200, 'Recipe deleted successfully');
  }
);

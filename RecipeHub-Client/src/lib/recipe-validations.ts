import { z } from 'zod';

export const recipeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Fast Food', 'Healthy', 'Seafood', 'Vegetarian']),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  cookingTime: z.number().min(1, 'Cooking time required'),
  image: z.string().optional(),
  ingredients: z.array(z.string()).min(1, 'At least one ingredient'),
  instructions: z.array(z.string()).min(1, 'At least one instruction'),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;

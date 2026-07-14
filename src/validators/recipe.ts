import { z } from 'zod';

export const createRecipeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  shortDescription: z.string().min(1, 'Short description is required').max(150),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Fast Food', 'Healthy', 'Seafood', 'Vegetarian']),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  cookingTime: z.number().min(1, 'Cooking time must be at least 1 minute'),
  image: z.string().optional(),
  ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
  instructions: z.array(z.string()).min(1, 'At least one instruction is required'),
});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;

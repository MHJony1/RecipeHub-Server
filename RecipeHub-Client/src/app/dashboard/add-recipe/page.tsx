'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { recipeSchema, type RecipeFormData } from '@/lib/recipe-validations';
import { recipeService } from '@/services/recipe.service';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { RECIPE_CATEGORIES } from '@/constants';

const difficultyLevels = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Hard', value: 'Hard' },
];

export default function AddRecipePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [''],
      instructions: [''],
    },
  });

  const onSubmit = async (data: RecipeFormData) => {
    setIsSubmitting(true);
    try {
      await recipeService.createRecipe({
        ...data,
        ingredients: ingredients.filter(Boolean),
        instructions: instructions.filter(Boolean),
      });
      toast.success('Recipe created successfully!');
      router.push('/dashboard/manage-recipes');
    } catch (error) {
      toast.error('Failed to create recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <Container className="py-20">
        <Card className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Recipe</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input label="Title" error={errors.title?.message} {...register('title')} />

            <Input label="Short Description" error={errors.shortDescription?.message} {...register('shortDescription')} />

            <Textarea label="Description" error={errors.description?.message} {...register('description')} />

            <Select
              label="Category"
              options={RECIPE_CATEGORIES.map((cat) => ({ label: cat, value: cat }))}
              error={errors.category?.message}
              {...register('category')}
            />

            <Select label="Difficulty" options={difficultyLevels} error={errors.difficulty?.message} {...register('difficulty')} />

            <Input label="Cooking Time (minutes)" type="number" error={errors.cookingTime?.message} {...register('cookingTime', { valueAsNumber: true })} />

            <Input label="Image URL" error={errors.image?.message} {...register('image')} />

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Ingredients</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => {
                      const newIngredients = [...ingredients];
                      newIngredients[index] = e.target.value;
                      setIngredients(newIngredients);
                    }}
                    placeholder="Add ingredient"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={() => setIngredients([...ingredients, ''])}>
                Add Ingredient
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Instructions</label>
              {instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <textarea
                    value={instruction}
                    onChange={(e) => {
                      const newInstructions = [...instructions];
                      newInstructions[index] = e.target.value;
                      setInstructions(newInstructions);
                    }}
                    placeholder="Add instruction"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl resize-none"
                  />
                  {instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setInstructions(instructions.filter((_, i) => i !== index))}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <Button type="button" variant="secondary" onClick={() => setInstructions([...instructions, ''])}>
                Add Instruction
              </Button>
            </div>

            <Button type="submit" isLoading={isSubmitting} className="w-full">
              Create Recipe
            </Button>
          </form>
        </Card>
      </Container>
    </ProtectedRoute>
  );
}

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
import { X } from 'lucide-react';

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
      <div className="min-h-screen bg-background py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-text mb-3">Add Recipe</h1>
              <p className="font-body text-lg text-text-secondary">Share your culinary creation with our community</p>
            </div>

            <Card className="p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Basic Info Section */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-text mb-6">Basic Information</h2>
                  <div className="space-y-6">
                    <Input label="Recipe Title" error={errors.title?.message} {...register('title')} />
                    <Input label="Short Description" error={errors.shortDescription?.message} {...register('shortDescription')} placeholder="A brief one-line description" />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border/30" />

                {/* Details Section */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-text mb-6">Recipe Details</h2>
                  <div className="space-y-6">
                    <Textarea label="Full Description" error={errors.description?.message} {...register('description')} placeholder="Detailed description of your recipe" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Select
                        label="Category"
                        options={RECIPE_CATEGORIES.map((cat) => ({ label: cat, value: cat }))}
                        error={errors.category?.message}
                        {...register('category')}
                      />

                      <Select label="Difficulty" options={difficultyLevels} error={errors.difficulty?.message} {...register('difficulty')} />

                      <Input label="Cooking Time (min)" type="number" error={errors.cookingTime?.message} {...register('cookingTime', { valueAsNumber: true })} />
                    </div>

                    <Input label="Image URL" error={errors.image?.message} {...register('image')} placeholder="https://example.com/image.jpg" />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border/30" />

                {/* Ingredients Section */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-text mb-6">Ingredients</h2>
                  <div className="space-y-4 mb-6">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                          {index + 1}
                        </div>
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => {
                            const newIngredients = [...ingredients];
                            newIngredients[index] = e.target.value;
                            setIngredients(newIngredients);
                          }}
                          placeholder="e.g., 2 cups flour"
                          className="flex-1 px-4 py-3 border border-accent/30 rounded-lg bg-white text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition font-body"
                        />
                        {ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
                            className="p-3 text-danger hover:bg-red-50 rounded-lg transition"
                            title="Remove ingredient"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button type="button" variant="secondary" onClick={() => setIngredients([...ingredients, ''])} className="w-full font-body">
                    + Add Ingredient
                  </Button>
                </div>

                {/* Divider */}
                <div className="border-t border-border/30" />

                {/* Instructions Section */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-text mb-6">Cooking Instructions</h2>
                  <div className="space-y-4 mb-6">
                    {instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-sm font-display font-bold">
                          {index + 1}
                        </div>
                        <textarea
                          value={instruction}
                          onChange={(e) => {
                            const newInstructions = [...instructions];
                            newInstructions[index] = e.target.value;
                            setInstructions(newInstructions);
                          }}
                          placeholder="Describe this step in detail"
                          className="flex-1 px-4 py-3 border border-accent/30 rounded-lg bg-white text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition font-body resize-none min-h-24"
                        />
                        {instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setInstructions(instructions.filter((_, i) => i !== index))}
                            className="p-3 text-danger hover:bg-red-50 rounded-lg transition"
                            title="Remove instruction"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button type="button" variant="secondary" onClick={() => setInstructions([...instructions, ''])} className="w-full font-body">
                    + Add Instruction
                  </Button>
                </div>

                {/* Submit Button */}
                <div className="border-t border-border/30 pt-6">
                  <Button type="submit" isLoading={isSubmitting} className="w-full font-display font-semibold text-lg py-4">
                    Create Recipe
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </Container>
      </div>
    </ProtectedRoute>
  );
}


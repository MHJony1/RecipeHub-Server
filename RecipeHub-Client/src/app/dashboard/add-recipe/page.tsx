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
import {
  X,
  Sparkles,
  ChefHat,
  Clock,
  Layers,
  ListChecks,
  FileText,
  Image as ImageIcon,
  Send,
  Plus,
} from 'lucide-react';

const difficultyLevels = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Hard', value: 'Hard' },
];

export default function AddRecipeClient() {
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
      toast.success('Recipe created successfully! 🎉');
      router.push('/dashboard/manage-recipes');
    } catch (error) {
      toast.error('Failed to create recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FFFBF7] py-8 sm:py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8 md:mb-10">
              <div className="flex items-start justify-between gap-4 flex-col sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-[#E07A2F]" />
                    <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
                      Share Your Creation
                    </span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D1B0E]">
                    Add <span className="text-[#E07A2F]">Recipe</span>
                  </h1>
                  <p className="text-[#7A6B5A] text-sm sm:text-base mt-1">
                    Share your culinary creation with our community
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white border border-[#F4A261]/20 rounded-full px-4 py-2 shadow-sm flex-shrink-0">
                  <ChefHat className="w-4 h-4 text-[#E07A2F]" />
                  <span className="text-[#2D1B0E] text-xs font-medium">
                    Share Recipe
                  </span>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <Card className="bg-white border border-[#F4A261]/10 rounded-3xl shadow-xl shadow-[#F4A261]/5 overflow-hidden">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-5 sm:p-6 md:p-8 lg:p-10 space-y-8"
              >
                {/* Basic Information */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E07A2F] to-[#F4A261] flex items-center justify-center shadow-md shadow-[#E07A2F]/20">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-[#2D1B0E]">
                      Basic Information
                    </h2>
                    <span className="ml-auto text-[#7A6B5A] text-xs bg-[#F4A261]/10 px-2.5 py-0.5 rounded-full">
                      Required
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium text-[#2D1B0E] text-sm mb-1.5">
                        Recipe Title <span className="text-[#E07A2F]">*</span>
                      </label>
                      <Input
                        {...register('title')}
                        placeholder="e.g., Creamy Garlic Pasta"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.title
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                        } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm`}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-medium text-[#2D1B0E] text-sm mb-1.5">
                        Short Description{' '}
                        <span className="text-[#E07A2F]">*</span>
                      </label>
                      <Input
                        {...register('shortDescription')}
                        placeholder="A brief one-line description"
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.shortDescription
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                        } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm`}
                      />
                      {errors.shortDescription && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.shortDescription.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#F4A261]/10" />

                {/* Recipe Details */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E9C46A] to-[#F4A261] flex items-center justify-center shadow-md shadow-[#E9C46A]/20">
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-[#2D1B0E]">
                      Recipe Details
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium text-[#2D1B0E] text-sm mb-1.5">
                        Full Description{' '}
                        <span className="text-[#E07A2F]">*</span>
                      </label>
                      <Textarea
                        {...register('description')}
                        placeholder="Detailed description of your recipe"
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.description
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                        } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm resize-none`}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.description.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-medium text-[#2D1B0E] text-sm mb-1.5">
                          Category <span className="text-[#E07A2F]">*</span>
                        </label>
                        <Select
                          options={RECIPE_CATEGORIES.map((cat) => ({
                            label: cat,
                            value: cat,
                          }))}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.category
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                          } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm appearance-none`}
                          {...register('category')}
                        />
                        {errors.category && (
                          <p className="text-red-500 text-xs mt-1.5">
                            {errors.category.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block font-medium text-[#2D1B0E] text-sm mb-1.5">
                          Difficulty <span className="text-[#E07A2F]">*</span>
                        </label>
                        <Select
                          options={difficultyLevels}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.difficulty
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                          } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm appearance-none`}
                          {...register('difficulty')}
                        />
                        {errors.difficulty && (
                          <p className="text-red-500 text-xs mt-1.5">
                            {errors.difficulty.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block font-medium text-[#2D1B0E] text-sm mb-1.5">
                          Cooking Time (min){' '}
                          <span className="text-[#E07A2F]">*</span>
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6B5A]" />
                          <Input
                            type="number"
                            {...register('cookingTime', {
                              valueAsNumber: true,
                            })}
                            placeholder="30"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                              errors.cookingTime
                                ? 'border-red-400 focus:border-red-500'
                                : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                            } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm`}
                          />
                        </div>
                        {errors.cookingTime && (
                          <p className="text-red-500 text-xs mt-1.5">
                            {errors.cookingTime.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-[#2D1B0E] text-sm mb-1.5">
                        Image URL
                      </label>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6B5A]" />
                        <Input
                          {...register('image')}
                          placeholder="https://example.com/image.jpg"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                            errors.image
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-[#F4A261]/30 focus:border-[#E07A2F]'
                          } bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 transition-all duration-300 text-sm`}
                        />
                      </div>
                      {errors.image && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.image.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#F4A261]/10" />

                {/* Ingredients - Header with Add Button */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] flex items-center justify-center shadow-md shadow-[#E07A2F]/20">
                        <ListChecks className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="font-display text-xl font-bold text-[#2D1B0E]">
                        Ingredients
                      </h2>
                      <span className="text-[#7A6B5A] text-xs bg-[#F4A261]/10 px-2.5 py-0.5 rounded-full">
                        {ingredients.filter(Boolean).length} items
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setIngredients([''])}
                          className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-all duration-300 text-xs font-medium"
                        >
                          Clear All
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setIngredients([...ingredients, ''])}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white text-xs font-medium shadow-md shadow-[#E07A2F]/20 hover:shadow-lg hover:shadow-[#E07A2F]/30 hover:scale-105 transition-all duration-300"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
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
                          className="flex-1 px-4 py-2.5 rounded-xl border border-[#F4A261]/30 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 focus:border-[#E07A2F] transition-all duration-300 text-sm placeholder:text-[#7A6B5A]"
                        />
                        {ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setIngredients(
                                ingredients.filter((_, i) => i !== index)
                              )
                            }
                            className="p-2 text-[#7A6B5A] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                            title="Remove ingredient"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#F4A261]/10" />

                {/* Instructions - Header with Add Button */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F4A261] to-[#E07A2F] flex items-center justify-center shadow-md shadow-[#F4A261]/20">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="font-display text-xl font-bold text-[#2D1B0E]">
                        Cooking Instructions
                      </h2>
                      <span className="text-[#7A6B5A] text-xs bg-[#F4A261]/10 px-2.5 py-0.5 rounded-full">
                        {instructions.filter(Boolean).length} steps
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {instructions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setInstructions([''])}
                          className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 transition-all duration-300 text-xs font-medium"
                        >
                          Clear All
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setInstructions([...instructions, ''])}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white text-xs font-medium shadow-md shadow-[#E07A2F]/20 hover:shadow-lg hover:shadow-[#E07A2F]/30 hover:scale-105 transition-all duration-300"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E9C46A] to-[#F4A261] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
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
                          className="flex-1 px-4 py-2.5 rounded-xl border border-[#F4A261]/30 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 focus:border-[#E07A2F] transition-all duration-300 text-sm placeholder:text-[#7A6B5A] resize-none min-h-[60px]"
                          rows={2}
                        />
                        {instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setInstructions(
                                instructions.filter((_, i) => i !== index)
                              )
                            }
                            className="p-2 text-[#7A6B5A] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                            title="Remove instruction"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="border-t border-[#F4A261]/10 pt-6">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-semibold shadow-lg shadow-[#E07A2F]/30 hover:shadow-xl hover:shadow-[#E07A2F]/40 hover:scale-[1.02] transition-all duration-300 py-3.5 rounded-xl text-base flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Creating Recipe...' : 'Create Recipe'}
                  </Button>
                  <p className="text-center text-[#7A6B5A] text-xs mt-3">
                    By submitting, you agree to our community guidelines
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </Container>
      </div>
    </ProtectedRoute>
  );
}

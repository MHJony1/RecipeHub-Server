'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { recipeSchema, type RecipeFormData } from '@/lib/recipe-validations';
import { recipeService, type Recipe } from '@/services/recipe.service';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { RECIPE_CATEGORIES } from '@/constants';
import {
  Pencil,
  Trash2,
  Eye,
  X,
  Sparkles,
  Search,
  Plus,
  Clock,
  ChefHat,
  Layers,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

const difficultyLevels = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Hard', value: 'Hard' },
];

export default function ManageRecipesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [''],
      instructions: [''],
    },
  });

  const loadRecipes = async () => {
    try {
      const response = await recipeService.getUserRecipes();
      setRecipes(response.data);
      setFilteredRecipes(response.data);
    } catch {
      toast.error('Failed to load recipes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    let result = recipes;
    if (searchQuery) {
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterCategory) {
      result = result.filter((r) => r.category === filterCategory);
    }
    setFilteredRecipes(result);
  }, [searchQuery, filterCategory, recipes]);

  const openUpdateModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIngredients(recipe.ingredients.length > 0 ? recipe.ingredients : ['']);
    setInstructions(
      recipe.instructions.length > 0 ? recipe.instructions : ['']
    );
    reset({
      title: recipe.title,
      shortDescription: recipe.shortDescription,
      description: recipe.description,
      category: recipe.category as RecipeFormData['category'],
      difficulty: recipe.difficulty as RecipeFormData['difficulty'],
      cookingTime: recipe.cookingTime,
      image: recipe.image,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });
    setUpdateModalOpen(true);
  };

  const handleUpdate = async (data: RecipeFormData) => {
    if (!selectedRecipe) return;

    setIsSubmitting(true);
    try {
      const updatedRecipe = await recipeService.updateRecipe(
        selectedRecipe._id,
        {
          ...data,
          ingredients: ingredients.filter(Boolean),
          instructions: instructions.filter(Boolean),
        }
      );

      setRecipes(
        recipes.map((r) => (r._id === selectedRecipe._id ? updatedRecipe : r))
      );
      toast.success('Recipe updated successfully!');
      setUpdateModalOpen(false);
      setSelectedRecipe(null);
    } catch {
      toast.error('Failed to update recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedRecipe) return;

    try {
      await recipeService.deleteRecipe(selectedRecipe._id);
      toast.success('Recipe deleted');
      setRecipes(recipes.filter((r) => r._id !== selectedRecipe._id));
      setDeleteModalOpen(false);
      setSelectedRecipe(null);
    } catch {
      toast.error('Failed to delete recipe');
    }
  };

  // Get all unique categories from RECIPE_CATEGORIES
  const allCategories = RECIPE_CATEGORIES;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center pt-20">
        <LoadingSpinner />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#FFFBF7] pt-24 pb-8">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-[#E07A2F]" />
                  <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
                    Your Collection
                  </span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2D1B0E]">
                  Manage <span className="text-[#E07A2F]">Recipes</span>
                </h1>
                <p className="text-[#7A6B5A] text-sm mt-1">
                  {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}{' '}
                  in your collection
                </p>
              </div>
              <Link href={ROUTES.ADD_RECIPE}>
                <Button className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 hover:scale-105 transition-all duration-300 rounded-xl flex items-center gap-2 px-5 py-2.5 text-sm">
                  <Plus className="w-4 h-4" />
                  Add Recipe
                </Button>
              </Link>
            </div>
          </div>

          {/* Search & Filter - Improved */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A6B5A]" />
              <input
                type="text"
                placeholder="Search recipes by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#F4A261]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 focus:border-[#E07A2F] transition-all duration-300 text-sm placeholder:text-[#7A6B5A]"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-[#F4A261]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 focus:border-[#E07A2F] transition-all duration-300 text-sm min-w-[160px]"
              >
                <option value="">All Categories</option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {(searchQuery || filterCategory) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterCategory('');
                  }}
                  className="px-4 py-2.5 rounded-xl border border-[#F4A261]/20 text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/10 transition-all duration-300 text-sm whitespace-nowrap"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Recipe List */}
          {filteredRecipes.length === 0 ? (
            <div className="bg-white border border-[#F4A261]/10 rounded-3xl p-12 text-center shadow-xl shadow-[#F4A261]/5">
              <div className="w-20 h-20 rounded-full bg-[#F4A261]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🍽️</span>
              </div>
              {recipes.length === 0 ? (
                <>
                  <h3 className="font-display text-xl font-bold text-[#2D1B0E] mb-2">
                    No Recipes Yet
                  </h3>
                  <p className="text-[#7A6B5A] text-sm mb-6">
                    Start your culinary journey by creating your first recipe!
                  </p>
                  <Link href={ROUTES.ADD_RECIPE}>
                    <Button className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 hover:scale-105 transition-all duration-300 rounded-xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Recipe
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="font-display text-xl font-bold text-[#2D1B0E] mb-2">
                    No Results Found
                  </h3>
                  <p className="text-[#7A6B5A] text-sm">
                    Try adjusting your search or filter criteria
                  </p>
                </>
              )}
            </div>
          ) : (
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredRecipes.map((recipe) => (
                <motion.div key={recipe._id} variants={itemVariants}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border border-[#F4A261]/10 hover:border-[#E07A2F]/30 rounded-2xl">
                    <div className="flex flex-col md:flex-row gap-5 p-5 md:p-6">
                      {/* Recipe Image */}
                      {recipe.image && (
                        <div className="md:w-44 md:h-44 flex-shrink-0 overflow-hidden rounded-xl">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-40 md:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="flex-1 flex flex-col justify-between">
                        {/* Title and Description */}
                        <div>
                          <h3 className="font-display text-xl font-bold text-[#2D1B0E] group-hover:text-[#E07A2F] transition-colors duration-300">
                            {recipe.title}
                          </h3>
                          <p className="text-[#7A6B5A] text-sm line-clamp-2 mt-1">
                            {recipe.shortDescription}
                          </p>
                        </div>

                        {/* Badges - Category, Difficulty, Time */}
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#E07A2F]/10 text-[#E07A2F] border border-[#E07A2F]/20">
                            <Layers className="w-3 h-3" />
                            {recipe.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#E9C46A]/10 text-[#B8860B] border border-[#E9C46A]/20">
                            <ChefHat className="w-3 h-3" />
                            {recipe.difficulty}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#F4A261]/10 text-[#7A6B5A] border border-[#F4A261]/20">
                            <Clock className="w-3 h-3" />
                            {recipe.cookingTime} min
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#4A90D9]/10 text-[#4A90D9] border border-[#4A90D9]/20">
                            <Calendar className="w-3 h-3" />
                            {new Date(recipe.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#F4A261]/10">
                          <button
                            onClick={() =>
                              router.push(`/recipes/${recipe.slug}`)
                            }
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#E07A2F] bg-[#F4A261]/10 hover:bg-[#F4A261]/20 rounded-xl transition-all duration-300"
                          >
                            <Eye size={16} />
                            View
                          </button>
                          <button
                            onClick={() => openUpdateModal(recipe)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#E9C46A] bg-[#E9C46A]/10 hover:bg-[#E9C46A]/20 rounded-xl transition-all duration-300"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRecipe(recipe);
                              setDeleteModalOpen(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-300"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            title="Delete Recipe"
            className="max-w-md"
          >
            <div className="space-y-6 p-2">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#2D1B0E] mb-2">
                  Are you sure?
                </h3>
                <p className="text-[#7A6B5A] text-sm">
                  This action cannot be undone. This will permanently delete the
                  recipe.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  className="flex-1 rounded-xl"
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>

          {/* Update Recipe Modal */}
          <Modal
            isOpen={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            title="Update Recipe"
            size="3xl"
            scrollable={true}
            className="max-w-4xl"
          >
            <form
              onSubmit={handleSubmit(handleUpdate)}
              className="space-y-8 p-2"
            >
              {/* Basic Info Section */}
              <div>
                <h3 className="font-display text-lg font-bold text-[#2D1B0E] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E07A2F]" />
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Recipe Title"
                    error={errors.title?.message}
                    {...register('title')}
                    className="rounded-xl"
                  />
                  <Input
                    label="Short Description"
                    error={errors.shortDescription?.message}
                    {...register('shortDescription')}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="border-t border-[#F4A261]/10" />

              {/* Recipe Details */}
              <div>
                <h3 className="font-display text-lg font-bold text-[#2D1B0E] mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#E07A2F]" />
                  Recipe Details
                </h3>
                <div className="space-y-4">
                  <Textarea
                    label="Full Description"
                    error={errors.description?.message}
                    {...register('description')}
                    className="rounded-xl"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select
                      label="Category"
                      options={RECIPE_CATEGORIES.map((cat) => ({
                        label: cat,
                        value: cat,
                      }))}
                      error={errors.category?.message}
                      {...register('category')}
                      className="rounded-xl"
                    />

                    <Select
                      label="Difficulty"
                      options={difficultyLevels}
                      error={errors.difficulty?.message}
                      {...register('difficulty')}
                      className="rounded-xl"
                    />

                    <Input
                      label="Cooking Time (min)"
                      type="number"
                      error={errors.cookingTime?.message}
                      {...register('cookingTime', { valueAsNumber: true })}
                      className="rounded-xl"
                    />
                  </div>

                  <Input
                    label="Image URL"
                    error={errors.image?.message}
                    {...register('image')}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="border-t border-[#F4A261]/10" />

              {/* Ingredients */}
              <div>
                <h3 className="font-display text-lg font-bold text-[#2D1B0E] mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#E07A2F]" />
                  Ingredients
                </h3>
                <div className="space-y-3 mb-4">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07A2F] to-[#E9C46A] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
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
                        className="flex-1 px-4 py-2.5 rounded-xl border border-[#F4A261]/30 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 focus:border-[#E07A2F] transition-all duration-300 text-sm"
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
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIngredients([...ingredients, ''])}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-[#F4A261]/30 hover:border-[#E07A2F]/50 text-[#7A6B5A] hover:text-[#E07A2F] transition-all duration-300 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Ingredient
                </button>
              </div>

              <div className="border-t border-[#F4A261]/10" />

              {/* Instructions */}
              <div>
                <h3 className="font-display text-lg font-bold text-[#2D1B0E] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E07A2F]" />
                  Cooking Instructions
                </h3>
                <div className="space-y-3 mb-4">
                  {instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E9C46A] to-[#F4A261] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
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
                        className="flex-1 px-4 py-2.5 rounded-xl border border-[#F4A261]/30 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E07A2F]/20 focus:border-[#E07A2F] transition-all duration-300 text-sm resize-none min-h-[60px]"
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
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setInstructions([...instructions, ''])}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-[#F4A261]/30 hover:border-[#E07A2F]/50 text-[#7A6B5A] hover:text-[#E07A2F] transition-all duration-300 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Instruction
                </button>
              </div>

              <div className="border-t border-[#F4A261]/10" />

              {/* Submit Buttons */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-semibold shadow-lg shadow-[#E07A2F]/30 hover:shadow-xl hover:shadow-[#E07A2F]/40 hover:scale-[1.02] transition-all duration-300 py-3.5 rounded-xl text-base"
                >
                  Update Recipe
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setUpdateModalOpen(false)}
                  className="flex-1 border-[#E07A2F]/20 text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/10 rounded-xl py-3.5 text-base"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Modal>
        </Container>
      </div>
    </ProtectedRoute>
  );
}

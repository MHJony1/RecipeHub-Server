'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { recipeSchema, type RecipeFormData } from '@/lib/recipe-validations';
import { recipeService, type Recipe } from '@/services/recipe.service';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { RECIPE_CATEGORIES } from '@/constants';

const difficultyLevels = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Hard', value: 'Hard' },
];

export default function ManageRecipesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);

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
    } catch (error) {
      toast.error('Failed to load recipes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const openUpdateModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIngredients(recipe.ingredients.length > 0 ? recipe.ingredients : ['']);
    setInstructions(recipe.instructions.length > 0 ? recipe.instructions : ['']);
    reset({
      title: recipe.title,
      shortDescription: recipe.shortDescription,
      description: recipe.description,
      category: recipe.category as any,
      difficulty: recipe.difficulty as any,
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
      const updatedRecipe = await recipeService.updateRecipe(selectedRecipe._id, {
        ...data,
        ingredients: ingredients.filter(Boolean),
        instructions: instructions.filter(Boolean),
      });

      setRecipes(recipes.map((r) => (r._id === selectedRecipe._id ? updatedRecipe : r)));
      toast.success('Recipe updated successfully!');
      setUpdateModalOpen(false);
      setSelectedRecipe(null);
    } catch (error) {
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
    } catch (error) {
      toast.error('Failed to delete recipe');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ProtectedRoute>
      <Container className="py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Recipes</h1>

        {recipes.length === 0 ? (
          <EmptyState title="No recipes yet" description="Start by creating your first recipe" />
        ) : (
          <div className="grid gap-6">
            {recipes.map((recipe) => (
              <Card key={recipe._id}>
                <div className="flex gap-6">
                  {recipe.image && <img src={recipe.image} alt={recipe.title} className="w-32 h-32 object-cover rounded-lg" />}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{recipe.title}</h3>
                    <p className="text-gray-600 mt-2">{recipe.shortDescription}</p>
                    <div className="flex gap-2 mt-3">
                      <Badge>{recipe.category}</Badge>
                      <Badge>{recipe.difficulty}</Badge>
                      <Badge>{recipe.cookingTime} min</Badge>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button size="sm" onClick={() => router.push(`/recipes/${recipe.slug}`)}>
                        View
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => openUpdateModal(recipe)}>
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          setSelectedRecipe(recipe);
                          setDeleteModalOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Recipe">
          <p className="text-gray-600 mb-6">Are you sure you want to delete this recipe? This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </Modal>

        <Modal isOpen={updateModalOpen} onClose={() => setUpdateModalOpen(false)} title="Update Recipe">
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
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

            <div className="flex gap-3">
              <Button type="submit" isLoading={isSubmitting} className="flex-1">
                Update Recipe
              </Button>
              <Button type="button" variant="secondary" onClick={() => setUpdateModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </Container>
    </ProtectedRoute>
  );
}

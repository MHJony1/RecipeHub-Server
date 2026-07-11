'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { recipeService, type Recipe } from '@/services/recipe.service';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ManageRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    loadRecipes();
  }, []);

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
                      <Button size="sm">View</Button>
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
      </Container>
    </ProtectedRoute>
  );
}

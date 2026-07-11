'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { recipeService, type Recipe } from '@/services/recipe.service';
import { ROUTES } from '@/constants';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Clock, Users, ChefHat, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecipeDetailsContentProps {
  slug: string;
}

export const RecipeDetailsContent = ({ slug }: RecipeDetailsContentProps) => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const recipeData = await recipeService.getRecipeBySlug(slug);
        setRecipe(recipeData);

        // Fetch related recipes from same category
        const response = await recipeService.getRecipes({ category: recipeData.category, limit: 4 });
        const filtered = (response.data || []).filter((r: Recipe) => r._id !== recipeData._id).slice(0, 4);
        setRelatedRecipes(filtered);
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
        setError('Recipe not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the recipe you're looking for.</p>
          <Button>
            <Link href={ROUTES.RECIPES}>Back to Recipes</Link>
          </Button>
        </div>
      </div>
    );
  }

  const publishDate = new Date(recipe.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-b from-orange-50 to-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative h-96 md:h-96 lg:h-96 rounded-2xl overflow-hidden bg-gray-200">
                {recipe.image ? (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-orange-200 to-amber-200">
                    🍽️
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex gap-2 mb-4">
                <Badge variant="default">{recipe.category}</Badge>
                <Badge variant="warning">{recipe.difficulty}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{recipe.shortDescription}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={20} className="text-orange-500" />
                  <span>{recipe.cookingTime} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <ChefHat size={20} className="text-orange-500" />
                  <span>By {recipe.author.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={20} className="text-orange-500" />
                  <span>{publishDate}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" size="sm">
                  <Link href={ROUTES.RECIPES}>Explore More</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Description */}
              <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Recipe</h2>
                <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
              </motion.div>

              {/* Ingredients */}
              <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-1">
                        ✓
                      </div>
                      <p className="text-gray-700 pt-1">{ingredient}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cooking Instructions</h2>
                <div className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="sticky top-24 p-6">
                <h3 className="font-bold text-gray-900 mb-6">Recipe Info</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Cooking Time</p>
                    <p className="text-lg font-semibold text-gray-900">{recipe.cookingTime} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Difficulty</p>
                    <p className="text-lg font-semibold text-gray-900">{recipe.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Category</p>
                    <p className="text-lg font-semibold text-gray-900">{recipe.category}</p>
                  </div>
                  <div className="pt-6 border-t">
                    <p className="text-sm text-gray-600 mb-3">Author</p>
                    <p className="font-semibold text-gray-900">{recipe.author.name}</p>
                    <p className="text-sm text-gray-600">{recipe.author.email}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="py-12 bg-gray-50">
          <Container>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">More from {recipe.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedRecipes.map((relRecipe, index) => (
                <motion.div
                  key={relRecipe._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={ROUTES.RECIPE_DETAILS(relRecipe._id)}>
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
                      <div className="relative h-40 w-full overflow-hidden bg-gray-200">
                        {relRecipe.image ? (
                          <Image
                            src={relRecipe.image}
                            alt={relRecipe.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-orange-200 to-amber-200">
                            🍽️
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">{relRecipe.title}</h3>
                        <Badge variant="default">{relRecipe.category}</Badge>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-orange-600">
        <Container>
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Cook?</h2>
            <p className="text-lg mb-8 opacity-90">Explore more recipes or share your own culinary creations.</p>
            <div className="flex gap-4 justify-center flex-col sm:flex-row">
              <Button size="lg" variant="secondary">
                <Link href={ROUTES.RECIPES}>Explore More Recipes</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

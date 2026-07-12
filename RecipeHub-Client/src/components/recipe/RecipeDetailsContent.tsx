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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-text mb-4">Recipe Not Found</h1>
          <p className="font-body text-text-secondary mb-8">Sorry, we couldn&apos;t find the recipe you&apos;re looking for.</p>
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
        className="bg-gradient-to-b from-background via-background to-accent/5 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="relative h-96 md:h-96 lg:h-full rounded-2xl overflow-hidden bg-gray-200 min-h-96">
                {recipe.image ? (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-secondary/30 to-accent/30">
                    🍽️
                  </div>
                )}
                {/* Premium overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex gap-2 mb-6">
                <Badge variant="default">{recipe.category}</Badge>
                <Badge variant="warning">{recipe.difficulty}</Badge>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-text mb-4 leading-tight">{recipe.title}</h1>
              <p className="font-body text-lg text-text-secondary mb-8 leading-relaxed">{recipe.shortDescription}</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-text">
                  <Clock size={20} className="text-primary" />
                  <span className="font-body">{recipe.cookingTime} minutes</span>
                </div>
                <div className="flex items-center gap-3 text-text">
                  <ChefHat size={20} className="text-primary" />
                  <span className="font-body">By {recipe.author.name}</span>
                </div>
                <div className="flex items-center gap-3 text-text">
                  <Calendar size={20} className="text-primary" />
                  <span className="font-body">{publishDate}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border/30">
                <Button variant="secondary" size="sm" className="font-body font-semibold">
                  <Link href={ROUTES.RECIPES}>Explore More</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              {/* Description */}
              <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-display text-3xl font-bold text-text mb-6">About This Recipe</h2>
                <p className="font-body text-text-secondary leading-relaxed text-lg">{recipe.description}</p>
              </motion.div>

              {/* Ingredients */}
              <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="font-display text-3xl font-bold text-text mb-8">Ingredients</h2>
                <div className="space-y-4">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold mt-0.5">
                        ✓
                      </div>
                      <p className="font-body text-text-secondary text-lg pt-1">{ingredient}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="font-display text-3xl font-bold text-text mb-8">Cooking Instructions</h2>
                <div className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-6">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-display font-bold">
                        {index + 1}
                      </div>
                      <p className="font-body text-text-secondary text-lg pt-1">{instruction}</p>
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
              <Card className="sticky top-28 p-8">
                <h3 className="font-display font-bold text-text text-xl mb-8">Recipe Info</h3>
                <div className="space-y-8">
                  <div>
                    <p className="font-body text-sm text-text-secondary mb-2">Cooking Time</p>
                    <p className="font-display text-xl font-bold text-primary">{recipe.cookingTime} minutes</p>
                  </div>
                  <div>
                    <p className="font-body text-sm text-text-secondary mb-2">Difficulty</p>
                    <p className="font-display text-xl font-bold text-primary">{recipe.difficulty}</p>
                  </div>
                  <div>
                    <p className="font-body text-sm text-text-secondary mb-2">Category</p>
                    <p className="font-display text-xl font-bold text-primary">{recipe.category}</p>
                  </div>
                  <div className="pt-8 border-t border-border/30">
                    <p className="font-body text-sm text-text-secondary mb-3">Author</p>
                    <p className="font-display font-bold text-text">{recipe.author.name}</p>
                    <p className="font-body text-sm text-text-secondary mt-1">{recipe.author.email}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="py-16 bg-background">
          <Container>
            <h2 className="font-display text-4xl font-bold text-text mb-12">More from {recipe.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedRecipes.map((relRecipe, index) => (
                <motion.div
                  key={relRecipe._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={ROUTES.RECIPE_DETAILS(relRecipe.slug)}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full hover:-translate-y-1">
                      <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-accent/20 to-secondary/20">
                        {relRecipe.image ? (
                          <Image
                            src={relRecipe.image}
                            alt={relRecipe.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-secondary/30 to-accent/30">
                            🍽️
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-display font-bold text-text line-clamp-2 mb-3">{relRecipe.title}</h3>
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
      <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-secondary/75">
        <Container>
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="font-display text-4xl font-bold mb-5">Ready to Cook?</h2>
            <p className="font-body text-lg mb-10 opacity-95">Explore more recipes or share your own culinary creations.</p>
            <div className="flex gap-4 justify-center flex-col sm:flex-row">
              <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white/10 font-display font-semibold">
                <Link href={ROUTES.RECIPES}>Explore More Recipes</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

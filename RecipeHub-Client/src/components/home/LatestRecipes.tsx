'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { Button } from '@/components/ui/Button';
import { recipeService, type Recipe } from '@/services/recipe.service';
import { ROUTES } from '@/constants';
import { EmptyState } from '@/components/ui/EmptyState';

export const LatestRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await recipeService.getRecipes({ limit: 4, sort: 'newest' });
        setRecipes(response.data || []);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        setError('Failed to load latest recipes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <SectionTitle
          title="Latest Recipes"
          description="Discover the newest recipes added to our community."
        />

        {error && (
          <div className="text-center text-red-600 mb-8">
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </motion.div>
        ) : recipes.length === 0 ? (
          <EmptyState
            title="No Recipes Yet"
            description="Check back later for new recipes!"
          />
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {recipes.map((recipe, index) => (
              <RecipeCard key={recipe._id} recipe={recipe} index={index} />
            ))}
          </motion.div>
        )}

        <div className="text-center">
          <Button size="lg">
            <Link href={ROUTES.RECIPES}>View All Recipes</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

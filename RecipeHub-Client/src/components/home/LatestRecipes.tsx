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
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

export const LatestRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await recipeService.getRecipes({
          limit: 4,
          sort: 'newest',
        });
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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-[#FFFBF7] overflow-hidden">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F4A261]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E9C46A]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#F4A261]/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#E9C46A]/5 rounded-full" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #2D1B0E 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 text-[#E9C46A]/15 text-6xl font-serif hidden lg:block">
        ✦
      </div>
      <div className="absolute bottom-20 left-10 text-[#F4A261]/15 text-6xl font-serif hidden lg:block">
        ✦
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#E07A2F]" />
              <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
                Fresh & New
              </span>
              <div className="w-8 h-px bg-gradient-to-r from-[#E07A2F] to-transparent" />
            </div>
            <SectionTitle
              title="Latest Recipes"
              description="Discover the newest recipes added to our community."
              className="text-left"
            />
          </div>

          <Link href={ROUTES.RECIPES}>
            <Button
              variant="ghost"
              className="group text-[#E07A2F] hover:text-[#E07A2F] hover:bg-[#F4A261]/10 px-4 py-2 text-sm font-medium shrink-0"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-red-50/80 backdrop-blur-sm border border-red-200/30 rounded-2xl py-8 px-6 max-w-md mx-auto mb-8"
          >
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">😕</span>
            </div>
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-sm text-[#E07A2F] hover:text-[#E07A2F]/80 font-medium"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Content */}
        {isLoading ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </motion.div>
        ) : recipes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-[#F4A261]/10 flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-[#E07A2F]/40" />
            </div>
            <EmptyState
              title="No Recipes Yet"
              description="Check back later for new recipes!"
            />
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {recipes.map((recipe, index) => (
                <RecipeCard key={recipe._id} recipe={recipe} index={index} />
              ))}
            </motion.div>

            {/* View All Button - Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 md:mt-12 text-center"
            >
              <Link href={ROUTES.RECIPES}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-semibold shadow-lg shadow-[#E07A2F]/30 hover:shadow-xl hover:shadow-[#E07A2F]/40 hover:scale-105 transition-all duration-300 px-8 py-3.5 text-base"
                >
                  <span>View All Recipes</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              {/* Sub-text */}
              <p className="text-[#7A6B5A] text-sm mt-3">
                Discover hundreds of delicious recipes from our community
              </p>
            </motion.div>
          </>
        )}
      </Container>
    </section>
  );
};

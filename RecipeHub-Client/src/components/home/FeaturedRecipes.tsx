'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { recipeService, type Recipe } from '@/services/recipe.service';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';
import {
  ArrowRight,
  Sparkles,
  ChefHat,
  Clock,
  Users,
  TrendingUp,
  Filter,
  Grid3x3,
  LayoutList,
} from 'lucide-react';

export const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await recipeService.getRecipes({ limit: 8 });
        setRecipes(response.data || []);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
        setError('Failed to load featured recipes');
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
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  // Stats for the section
  const sectionStats = [
    { icon: ChefHat, value: '8', label: 'Featured Recipes' },
    { icon: Clock, value: '25 min', label: 'Avg. Cooking Time' },
    { icon: Users, value: '12k+', label: 'Total Cooks' },
    { icon: TrendingUp, value: '4.9', label: 'Avg. Rating' },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-[#FFFBF7] overflow-hidden">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F4A261]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E9C46A]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#F4A261]/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#E9C46A]/5 rounded-full" />
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
      <div className="absolute top-20 left-10 text-[#E9C46A]/15 text-6xl font-serif hidden lg:block">
        ✦
      </div>
      <div className="absolute bottom-20 right-10 text-[#F4A261]/15 text-6xl font-serif hidden lg:block">
        ✦
      </div>

      <Container className="relative z-10">
        {/* Section Header with Stats */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E07A2F]/10 to-[#E9C46A]/10 backdrop-blur-sm border border-[#E07A2F]/20 rounded-full px-4 py-1.5 mb-4"
              >
                <Sparkles className="w-4 h-4 text-[#E07A2F]" />
                <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
                  Handpicked Collection
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D1B0E]"
              >
                Featured Recipes
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[#7A6B5A] text-base md:text-lg mt-2 max-w-2xl"
              >
                Explore our handpicked selection of delicious and easy-to-make
                recipes.
              </motion.p>
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-3 shrink-0"
            >
              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-white border border-[#F4A261]/20 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-[#E07A2F] text-white shadow-md shadow-[#E07A2F]/20'
                      : 'text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/10'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-[#E07A2F] text-white shadow-md shadow-[#E07A2F]/20'
                      : 'text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/10'
                  }`}
                  aria-label="List view"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>

              <Link href={ROUTES.RECIPES}>
                <Button
                  variant="ghost"
                  className="group text-[#E07A2F] hover:text-[#E07A2F] hover:bg-[#F4A261]/10 px-4 py-2 text-sm font-medium"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Section Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mt-8 pt-6 border-t border-[#F4A261]/10"
          >
            {sectionStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#E07A2F]/10 to-[#E9C46A]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#E07A2F]" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-[#2D1B0E] text-sm md:text-base">
                      {stat.value}
                    </p>
                    <p className="text-[#7A6B5A] text-[10px] md:text-xs">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-red-50/80 backdrop-blur-sm border border-red-200/30 rounded-2xl py-8 px-6 max-w-md mx-auto"
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

        {/* Loading State */}
        {isLoading ? (
          <motion.div
            className={`grid ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            } gap-5 md:gap-6`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </motion.div>
        ) : recipes.length === 0 ? (
          // Empty State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-[#F4A261]/10 flex items-center justify-center mb-4">
              <ChefHat className="w-12 h-12 text-[#E07A2F]/40" />
            </div>
            <EmptyState
              title="No Recipes Yet"
              description="Check back later for featured recipes!"
            />
          </motion.div>
        ) : (
          // Recipes Grid
          <motion.div
            className={`grid ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            } gap-5 md:gap-6`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                index={index}
                viewMode={viewMode}
              />
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
};

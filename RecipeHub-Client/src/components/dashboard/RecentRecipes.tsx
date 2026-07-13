'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { type Recipe } from '@/services/recipe.service';
import { ROUTES } from '@/constants';
import { Clock, User, ArrowRight, Sparkles } from 'lucide-react';

interface RecentRecipesProps {
  recipes: Recipe[];
}

export const RecentRecipes = ({ recipes }: RecentRecipesProps) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#E07A2F]" />
            <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
              Your Creations
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-[#2D1B0E]">
            Recent Recipes
          </h2>
          <p className="text-[#7A6B5A] text-sm mt-0.5">
            Your latest culinary creations
          </p>
        </div>
        <Link href={ROUTES.MANAGE_RECIPES}>
          <button className="text-[#E07A2F] hover:text-[#E07A2F]/80 text-sm font-medium flex items-center gap-1 group transition-colors">
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recipes.map((recipe) => {
          const createdDate = new Date(recipe.createdAt).toLocaleDateString();

          return (
            <motion.div key={recipe._id} variants={itemVariants}>
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border border-[#F4A261]/10 hover:border-[#E07A2F]/30 rounded-2xl h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#F4A261]/10 to-[#E9C46A]/10">
                  {recipe.image ? (
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      🍽️
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B0E]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-[#2D1B0E] shadow-lg border border-[#F4A261]/20">
                      {recipe.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <Link href={ROUTES.RECIPE_DETAILS(recipe.slug)}>
                    <h3 className="font-display font-bold text-[#2D1B0E] text-base hover:text-[#E07A2F] transition-colors line-clamp-2">
                      {recipe.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-3 text-xs text-[#7A6B5A] mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#E07A2F]" />
                      <span>{recipe.cookingTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#E07A2F]" />
                      <span>You</span>
                    </div>
                  </div>

                  <p className="text-[#7A6B5A] text-xs mt-1">{createdDate}</p>

                  <div className="mt-4 pt-3 border-t border-[#F4A261]/10">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full font-body text-sm rounded-xl border-[#E07A2F]/20 text-[#E07A2F] hover:bg-[#F4A261]/10 hover:border-[#E07A2F] transition-all duration-300"
                    >
                      <Link
                        href={ROUTES.RECIPE_DETAILS(recipe.slug)}
                        className="flex items-center justify-center gap-2"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

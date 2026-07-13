'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/constants';
import {
  Clock,
  ChefHat,
  Star,
  Bookmark,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { type Recipe } from '@/services/recipe.service';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
  viewMode?: 'grid' | 'list';
  className?: string;
}

export const RecipeCard = ({
  recipe,
  index = 0,
  viewMode = 'grid',
  className,
}: RecipeCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  };

  const difficultyColor =
    difficultyColors[recipe.difficulty as keyof typeof difficultyColors] ||
    difficultyColors.Easy;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.06,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -6,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  // List View
  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className={cn(
          'group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-[#F4A261]/10 flex flex-col sm:flex-row',
          className
        )}
      >
        {/* Image - Left */}
        <Link
          href={ROUTES.RECIPE_DETAILS(recipe.slug)}
          className="block relative w-full sm:w-56 md:w-64 lg:w-72 aspect-[4/3] sm:aspect-auto sm:h-48 flex-shrink-0 overflow-hidden"
        >
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, 300px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#F4A261]/10 to-[#E9C46A]/10 flex items-center justify-center">
              <span className="text-4xl">🍽️</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B0E]/20 via-transparent to-transparent z-10" />

          {/* Category Badge on Image */}
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-[#2D1B0E] shadow-lg border border-[#F4A261]/20">
              {recipe.category}
            </span>
          </div>
        </Link>

        {/* Content - Right */}
        <div className="flex-1 p-4 md:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <Link
                href={ROUTES.RECIPE_DETAILS(recipe.slug)}
                className="flex-1"
              >
                <h3 className="font-display font-bold text-[#2D1B0E] text-base md:text-lg leading-snug hover:text-[#E07A2F] transition-colors">
                  {recipe.title}
                </h3>
              </Link>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-8 h-8 rounded-full bg-[#F4A261]/5 hover:bg-[#F4A261]/10 flex items-center justify-center transition-colors duration-300 flex-shrink-0"
              >
                <Heart
                  className={cn(
                    'w-4 h-4 transition-colors duration-300',
                    isLiked
                      ? 'fill-[#E07A2F] text-[#E07A2F]'
                      : 'text-[#7A6B5A] hover:text-[#E07A2F]'
                  )}
                />
              </button>
            </div>

            <p className="text-[#7A6B5A] text-sm leading-relaxed mt-1.5 line-clamp-2">
              {recipe.shortDescription ||
                recipe.description ||
                'A delicious recipe waiting to be discovered.'}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F4A261]/10 text-[#E07A2F] border border-[#F4A261]/20">
                {recipe.category}
              </span>
              <span
                className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm',
                  difficultyColor
                )}
              >
                {recipe.difficulty}
              </span>
              {recipe.rating !== undefined && recipe.rating !== null && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E9C46A]/10 text-[#2D1B0E] border border-[#E9C46A]/20">
                  <Star className="w-3 h-3 fill-[#E9C46A] text-[#E9C46A]" />
                  {(recipe.rating as number).toFixed(1)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F4A261]/10">
            <div className="flex items-center gap-3 text-xs text-[#7A6B5A]">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E07A2F]" />
                <span>{recipe.cookingTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="w-3.5 h-3.5 text-[#E07A2F]" />
                <span className="truncate max-w-[80px]">
                  {recipe.author?.name || 'Anonymous'}
                </span>
              </div>
            </div>

            <Link
              href={ROUTES.RECIPE_DETAILS(recipe.slug)}
              className="text-[#E07A2F] hover:text-[#E07A2F]/80 text-sm font-medium flex items-center gap-1 group/btn transition-all duration-300"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={cn(
        'group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-[#F4A261]/10 h-full flex flex-col',
        className
      )}
    >
      {/* Image Container */}
      <Link
        href={ROUTES.RECIPE_DETAILS(recipe.slug)}
        className="block relative overflow-hidden aspect-[4/3] flex-shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B0E]/40 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#F4A261]/10 to-[#E9C46A]/10 flex items-center justify-center">
            <span className="text-4xl">🍽️</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-[#2D1B0E] shadow-lg border border-[#F4A261]/20">
            {recipe.category}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsBookmarked(!isBookmarked);
          }}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-colors duration-300 shadow-lg border border-[#F4A261]/20"
        >
          <Bookmark
            className={cn(
              'w-4 h-4 transition-colors duration-300',
              isBookmarked
                ? 'fill-[#E07A2F] text-[#E07A2F]'
                : 'text-[#7A6B5A] hover:text-[#E07A2F]'
            )}
          />
        </button>

        {/* Difficulty Badge */}
        <div className="absolute bottom-3 left-3 z-20">
          <span
            className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm',
              difficultyColor
            )}
          >
            {recipe.difficulty}
          </span>
        </div>

        {/* Rating Badge */}
        {recipe.rating && (
          <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-lg border border-[#F4A261]/20">
            <Star className="w-3 h-3 fill-[#E9C46A] text-[#E9C46A]" />
            <span className="text-xs font-semibold text-[#2D1B0E]">
              {recipe.rating.toFixed(1)}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <Link
            href={ROUTES.RECIPE_DETAILS(recipe.slug)}
            className="block group-hover:text-[#E07A2F] transition-colors duration-300"
          >
            <h3 className="font-display font-bold text-[#2D1B0E] text-base md:text-lg leading-snug line-clamp-1">
              {recipe.title}
            </h3>
          </Link>

          <p className="text-[#7A6B5A] text-sm leading-relaxed mt-1.5 line-clamp-2 flex-1">
            {recipe.shortDescription ||
              recipe.description ||
              'A delicious recipe waiting to be discovered.'}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F4A261]/10">
          <div className="flex items-center gap-3 text-xs text-[#7A6B5A]">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#E07A2F]" />
              <span>{recipe.cookingTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="w-3.5 h-3.5 text-[#E07A2F]" />
              <span className="truncate max-w-[60px]">
                {recipe.author?.name || 'Anonymous'}
              </span>
            </div>
          </div>

          <Link
            href={ROUTES.RECIPE_DETAILS(recipe.slug)}
            className="text-[#E07A2F] hover:text-[#E07A2F]/80 text-sm font-medium flex items-center gap-1 group/btn transition-all duration-300"
          >
            View
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

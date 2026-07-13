'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';
import { RECIPE_CATEGORIES, ROUTES } from '@/constants';
import { Sparkles, ArrowRight} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Category Images
const categoryImages: Record<string, string> = {
  Breakfast:
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80',
  Lunch: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
  Dinner:
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',
  Dessert:
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
  'Fast Food':
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
  Healthy:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
  Seafood:
    'https://images.unsplash.com/photo-1505576633757-0ac1084af824?w=400&q=80',
  Vegetarian:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
};

// Category Stats
const categoryStats: Record<string, string> = {
  Breakfast: '120+ recipes',
  Lunch: '95+ recipes',
  Dinner: '150+ recipes',
  Dessert: '85+ recipes',
  'Fast Food': '60+ recipes',
  Healthy: '110+ recipes',
  Seafood: '45+ recipes',
  Vegetarian: '75+ recipes',
};

const categoryColors: Record<string, string> = {
  Breakfast: 'from-[#F4A261] to-[#E9C46A]',
  Lunch: 'from-[#E07A2F] to-[#F4A261]',
  Dinner: 'from-[#E9C46A] to-[#E07A2F]',
  Dessert: 'from-[#E07A2F] to-[#E9C46A]',
  'Fast Food': 'from-[#F4A261] to-[#E07A2F]',
  Healthy: 'from-[#52B788] to-[#2D6A4F]',
  Seafood: 'from-[#4A90D9] to-[#2C6EAB]',
  Vegetarian: 'from-[#52B788] to-[#E9C46A]',
};

// Category Emojis
const categoryEmojis: Record<string, string> = {
  Breakfast: '🥐',
  Lunch: '🍱',
  Dinner: '🍽️',
  Dessert: '🍰',
  'Fast Food': '🍔',
  Healthy: '🥗',
  Seafood: '🦞',
  Vegetarian: '🥬',
};

export const Categories = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-[#FFFBF7] overflow-hidden">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4A261]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E9C46A]/5 rounded-full blur-3xl" />
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
      <div className="absolute top-20 left-10 text-[#E9C46A]/15 text-6xl font-serif hidden lg:block">
        ✦
      </div>
      <div className="absolute bottom-20 right-10 text-[#F4A261]/15 text-6xl font-serif hidden lg:block">
        ✦
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
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
                  Browse Categories
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D1B0E]"
              >
                Recipe <span className="text-[#E07A2F]">Categories</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[#7A6B5A] text-base md:text-lg mt-2 max-w-2xl"
              >
                Browse recipes by category and find exactly what you're looking
                for.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link href={ROUTES.RECIPES}>
                <Button
                  variant="ghost"
                  className="group text-[#E07A2F] hover:text-[#E07A2F] hover:bg-[#F4A261]/10 px-4 py-2 text-sm font-medium"
                >
                  View All Categories
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {RECIPE_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`${ROUTES.RECIPES}?category=${category}`}
            >
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="group cursor-pointer h-full"
              >
                <Card className="relative overflow-hidden h-full bg-white border border-[#F4A261]/10 hover:border-[#F4A261]/30 transition-all duration-500 p-0">
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={
                        categoryImages[category] ||
                        'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&q=80'
                      }
                      alt={category}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Dark Overlay - Improved */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0806]/80 via-[#0D0806]/40 to-[#0D0806]/10 group-hover:from-[#0D0806]/90 group-hover:via-[#0D0806]/50 transition-all duration-500" />

                    {/* Content - Centered on image */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 text-center">
                      {/* Category Emoji */}
                      <div className="text-5xl md:text-6xl mb-3 drop-shadow-lg">
                        {categoryEmojis[category] || '🍳'}
                      </div>

                      {/* Category Name */}
                      <h3 className="font-display font-bold text-white text-lg md:text-xl group-hover:text-[#E9C46A] transition-colors duration-300">
                        {category}
                      </h3>

                      {/* Recipe Count */}
                      <p className="text-white/80 text-sm mt-1">
                        {categoryStats[category] || 'Explore recipes'}
                      </p>

                      {/* Hover Arrow - Bottom */}
                      <div className="flex items-center gap-1 mt-3 text-[#E9C46A] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-xs font-medium">Browse</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Gradient Border Line - Bottom */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryColors[category] || 'from-[#E07A2F] to-[#E9C46A]'} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20`}
                    />
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white border border-[#F4A261]/20 rounded-full px-6 py-3 shadow-md">
            <span className="text-[#7A6B5A] text-sm">
              Can't find what you're looking for?
            </span>
            <Link href={ROUTES.RECIPES}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-medium shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 hover:scale-105 transition-all duration-300"
              >
                Browse All Recipes
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

'use client';

import { motion } from 'framer-motion';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { type Recipe } from '@/services/recipe.service';

interface RecipeGridProps {
  recipes: Recipe[];
}

export const RecipeGrid = ({ recipes }: RecipeGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {recipes.map((recipe, index) => (
        <RecipeCard key={recipe._id} recipe={recipe} index={index} />
      ))}
    </motion.div>
  );
};

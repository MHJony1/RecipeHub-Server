'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/constants';
import { Clock, ChefHat } from 'lucide-react';
import { type Recipe } from '@/services/recipe.service';

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export const RecipeCard = ({ recipe, index = 0 }: RecipeCardProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.4 },
    },
    hover: { y: -8 },
  };

  return (
    <motion.div variants={variants} whileHover="hover" initial="hidden" animate="visible">
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow">
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-amber-200 text-4xl">
              🍽️
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex gap-2 mb-3">
            <Badge variant="default">{recipe.category}</Badge>
            <Badge variant="warning">{recipe.difficulty}</Badge>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{recipe.title}</h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
            {recipe.shortDescription || recipe.description}
          </p>

          <div className="flex gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-orange-500" />
              <span>{recipe.cookingTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat size={16} className="text-orange-500" />
              <span className="truncate">{recipe.author.name}</span>
            </div>
          </div>

          <Button size="sm" variant="secondary" className="w-full">
            <Link href={ROUTES.RECIPE_DETAILS(recipe._id)}>View Details</Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

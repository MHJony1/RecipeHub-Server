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
    hover: { y: -8, boxShadow: '0 20px 40px rgba(107, 39, 55, 0.15)' },
  };

  return (
    <motion.div variants={variants} whileHover="hover" initial="hidden" animate="visible">
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all">
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-accent/20 to-secondary/20 rounded-xl" style={{ aspectRatio: '16/9' }}>
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/30 to-accent/30 text-5xl">
              🍽️
            </div>
          )}
          {/* Premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex gap-2 mb-3 flex-wrap">
            <Badge variant="default">{recipe.category}</Badge>
            <Badge variant="warning">{recipe.difficulty}</Badge>
          </div>

          <h3 className="font-display text-lg font-bold text-text mb-2 line-clamp-2">{recipe.title}</h3>

          <p className="font-body text-sm text-text-secondary mb-4 line-clamp-2 flex-1">
            {recipe.shortDescription || recipe.description}
          </p>

          <div className="flex gap-4 text-sm text-text-secondary mb-4">
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-primary" />
              <span className="font-body">{recipe.cookingTime} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ChefHat size={16} className="text-primary" />
              <span className="truncate font-body">{recipe.author.name}</span>
            </div>
          </div>

          <Button size="sm" variant="secondary" className="w-full font-body">
            <Link href={ROUTES.RECIPE_DETAILS(recipe.slug)}>View Details</Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

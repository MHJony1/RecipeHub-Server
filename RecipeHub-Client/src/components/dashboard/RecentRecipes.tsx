'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { type Recipe } from '@/services/recipe.service';
import { ROUTES } from '@/constants';
import { Badge } from '@/components/ui/Badge';

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Recipes</h2>
        <p className="text-gray-600 mt-1">Your latest creations</p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recipes.map((recipe) => {
          const createdDate = new Date(recipe.createdAt).toLocaleDateString();

          return (
            <motion.div key={recipe._id} variants={itemVariants}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-40 w-full overflow-hidden bg-gray-200">
                  {recipe.image ? (
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-amber-200 text-3xl">
                      🍽️
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{recipe.title}</h3>

                  <div className="flex gap-2 mb-4">
                    <Badge variant="default">{recipe.category}</Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 flex-1">{createdDate}</p>

                  <Button size="sm" variant="secondary" className="w-full">
                    <Link href={ROUTES.RECIPE_DETAILS(recipe._id)}>View Details</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

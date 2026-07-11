'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card } from '@/components/ui/Card';
import { RECIPE_CATEGORIES, ROUTES } from '@/constants';

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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05 },
  };

  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <SectionTitle
          title="Recipe Categories"
          description="Browse recipes by category and find exactly what you're looking for."
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {RECIPE_CATEGORIES.map((category) => (
            <Link key={category} href={`${ROUTES.RECIPES}?category=${category}`}>
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                className="cursor-pointer"
              >
                <Card className="text-center py-8 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{categoryEmojis[category] || '🍳'}</div>
                  <h3 className="font-semibold text-gray-900">{category}</h3>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

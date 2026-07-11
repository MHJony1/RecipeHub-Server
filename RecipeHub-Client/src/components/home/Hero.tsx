'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/common/Container';
import { ROUTES } from '@/constants';
import { useAuth } from '@/providers/AuthContext';

export const Hero = () => {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20 lg:py-28">
      <Container>
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Amazing <span className="text-orange-500">Recipes</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Explore thousands of delicious recipes from around the world. Learn from experienced cooks and share your culinary creations with our vibrant community.
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <Button size="lg">
                <Link href={ROUTES.RECIPES}>Explore Recipes</Link>
              </Button>
              <Button size="lg" variant="secondary">
                {isAuthenticated ? (
                  <Link href={ROUTES.ADD_RECIPE}>Add Recipe</Link>
                ) : (
                  <Link href={ROUTES.REGISTER}>Get Started</Link>
                )}
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full min-h-96 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-amber-200 rounded-3xl opacity-20" />
            <div className="relative z-10 text-6xl">🍽️</div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

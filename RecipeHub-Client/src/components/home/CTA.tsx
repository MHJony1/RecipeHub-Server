'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';
import { useAuth } from '@/providers/AuthContext';

export const CTA = () => {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
      <Container>
        <motion.div
          className="text-center text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Cooking?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {isAuthenticated
              ? 'Share your favorite recipes with our community and inspire other food lovers!'
              : 'Join thousands of home cooks and share your culinary creations with the world.'}
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button size="lg" variant="secondary">
              <Link href={ROUTES.RECIPES}>Explore Recipes</Link>
            </Button>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              {isAuthenticated ? (
                <Link href={ROUTES.ADD_RECIPE}>Add Your Recipe</Link>
              ) : (
                <Link href={ROUTES.REGISTER}>Get Started</Link>
              )}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

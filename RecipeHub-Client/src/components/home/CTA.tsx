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
    <section className="py-24 md:py-32 bg-gradient-to-r from-primary via-primary/95 to-secondary/75">
      <Container>
        <motion.div
          className="text-center text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">Ready to Start Cooking?</h2>
          <p className="font-body text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-95">
            {isAuthenticated
              ? 'Share your favorite recipes with our community and inspire other food lovers!'
              : 'Join thousands of home cooks and share your culinary creations with the world.'}
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Button size="lg" variant="secondary" className="border-white text-white hover:bg-white/10 font-display font-semibold">
              <Link href={ROUTES.RECIPES}>Explore Recipes</Link>
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-display font-semibold">
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

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';
import { useAuth } from '@/providers/AuthContext';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export const CTA = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-gradient-to-br from-[#FFFBF7] to-[#FDF5EC] border border-[#F4A261]/20 shadow-xl shadow-[#F4A261]/5 p-8 sm:p-10 md:p-14 lg:p-16"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4A261]/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E9C46A]/5 rounded-full blur-2xl" />

          <div className="absolute top-4 right-4 text-[#E9C46A]/20 text-4xl font-serif">
            ✦
          </div>
          <div className="absolute bottom-4 left-4 text-[#F4A261]/20 text-4xl font-serif">
            ✦
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E07A2F]/10 to-[#E9C46A]/10 border border-[#E07A2F]/20 rounded-full px-4 py-1.5 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E07A2F]" />
              <span className="text-[#E07A2F] text-[10px] font-medium tracking-[0.15em] uppercase">
                {isAuthenticated ? 'Share Your Passion' : 'Join Our Community'}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1B0E]"
            >
              {isAuthenticated ? (
                <>
                  Share Your{' '}
                  <span className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] bg-clip-text text-transparent">
                    Culinary Passion
                  </span>
                </>
              ) : (
                <>
                  Ready to Start{' '}
                  <span className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] bg-clip-text text-transparent">
                    Cooking?
                  </span>
                </>
              )}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[#7A6B5A] text-sm sm:text-base max-w-md mx-auto mt-2"
            >
              {isAuthenticated
                ? 'Share your favorite recipes with our community and inspire other food lovers!'
                : 'Join thousands of home cooks and share your culinary creations with the world.'}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mt-5"
            >
              <Link href={ROUTES.RECIPES}>
                <Button
                  size="md"
                  variant="ghost"
                  className="group text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/10 px-5 py-2.5 text-sm font-medium border border-[#F4A261]/20 hover:border-[#E07A2F]/30 rounded-xl transition-all duration-300"
                >
                  Explore Recipes
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link
                href={isAuthenticated ? ROUTES.ADD_RECIPE : ROUTES.REGISTER}
              >
                <Button
                  size="md"
                  className="group bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-medium shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 hover:scale-105 transition-all duration-300 px-5 py-2.5 text-sm rounded-xl"
                >
                  {isAuthenticated ? (
                    <>
                      <Heart className="w-4 h-4 mr-1.5" />
                      Add Recipe
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-1.5" />
                      Get Started
                    </>
                  )}
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

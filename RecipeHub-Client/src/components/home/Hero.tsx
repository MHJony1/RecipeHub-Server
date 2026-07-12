'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/common/Container';
import { ROUTES } from '@/constants';
import { useAuth } from '@/providers/AuthContext';

export const Hero = () => {
  const { isAuthenticated } = useAuth();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const text = titleRef.current.textContent || '';
    titleRef.current.innerHTML = text
      .split('')
      .map((char) => `<span style="opacity: 0;">${char === ' ' ? ' ' : char}</span>`)
      .join('');

    const spans = titleRef.current.querySelectorAll('span');

    gsap.to(spans, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.03,
      ease: 'power2.out',
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-32">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/10" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h1
                ref={titleRef}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-text leading-tight mb-6"
              >
                Discover Culinary Excellence
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-body text-xl text-text-secondary leading-relaxed max-w-lg"
            >
              Explore thousands of exquisite recipes from world-class chefs. Connect with a passionate community,
              share your creations, and transform your kitchen into a culinary studio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex gap-4 flex-col sm:flex-row pt-4"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Link href={ROUTES.RECIPES}>Explore Recipes</Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="border-2 border-primary text-primary hover:bg-primary/5 font-semibold rounded-lg px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              >
                {isAuthenticated ? (
                  <Link href={ROUTES.ADD_RECIPE}>Create Recipe</Link>
                ) : (
                  <Link href={ROUTES.REGISTER}>Get Started</Link>
                )}
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex gap-12 pt-8 border-t border-border/30"
            >
              <div>
                <p className="font-display text-3xl font-bold text-primary">5000+</p>
                <p className="text-text-secondary text-sm font-body">Recipes</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-primary">10k+</p>
                <p className="text-text-secondary text-sm font-body">Users</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-primary">Global</p>
                <p className="text-text-secondary text-sm font-body">Community</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Premium Image Treatment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative h-full min-h-96 md:min-h-full"
          >
            <div className="relative w-full h-96 md:h-full rounded-2xl overflow-hidden">
              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/20 z-10" />

              {/* Hero image placeholder with premium styling */}
              <div className="w-full h-full bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4 drop-shadow-lg">🍽️</div>
                  <p className="font-display text-2xl text-primary font-bold">RecipeHub</p>
                  <p className="text-text-secondary font-body text-sm mt-2">Premium Recipe Platform</p>
                </div>
              </div>

              {/* Decorative border */}
              <div className="absolute inset-0 border-2 border-accent/30 rounded-2xl pointer-events-none" />
            </div>

            {/* Floating card accent */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-8 right-0 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-border/20 w-64"
            >
              <p className="font-display text-sm text-primary font-bold">Trending</p>
              <p className="font-body text-text font-semibold mt-2">Mediterranean Cuisine</p>
              <p className="font-body text-text-secondary text-sm mt-1">3,200+ recipes</p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};


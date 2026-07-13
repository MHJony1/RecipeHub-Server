'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/common/Container';
import { ROUTES } from '@/constants';
import { useAuth } from '@/providers/AuthContext';
import { ArrowRight, Star, Users, ChefHat, Heart } from 'lucide-react';

export const Hero = () => {
  const { isAuthenticated } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Your provided images
  const slides = [
    {
      src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80',
      alt: 'Delicious pasta dish',
    },
    {
      src: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=1200&q=80',
      alt: 'Fresh salad bowl',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1728412897938-d70e9c5becd7?w=1200&q=80',
      alt: 'Gourmet dish',
    },
    {
      src: 'https://plus.unsplash.com/premium_photo-1663126351065-741a1d338b5d?w=1200&q=80',
      alt: 'Healthy food bowl',
    },
  ];

  // Auto slide - no fade, just change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const stats = [
    { value: '5,000+', label: 'Premium Recipes', icon: ChefHat },
    { value: '10,000+', label: 'Happy Cooks', icon: Users },
    { value: '4.9', label: 'Average Rating', icon: Star },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0D0806]">
      {/* Background Image - Simple change, no fade */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          key={currentIndex}
          src={slides[currentIndex].src}
          alt={slides[currentIndex].alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0806]/70 via-[#0D0806]/50 to-[#0D0806]/30 z-10" />

      {/* Content Overlay - Centered */}
      <Container className="relative z-20 h-screen flex items-center">
        <div className="max-w-3xl mx-auto text-center">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E07A2F]/20 to-[#E9C46A]/20 backdrop-blur-sm border border-[#E9C46A]/20 rounded-full px-4 py-1.5 md:px-5 md:py-2 mb-4 md:mb-6"
          >
            <span className="w-1.5 h-1.5 bg-[#E9C46A] rounded-full animate-pulse" />
            <span className="text-[#E9C46A] text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase">
               HEALTHY MEALS IN MINUTES
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] text-white"
          >
            Cook Like a
            <br />
            <span className="bg-gradient-to-r from-[#E07A2F] via-[#E9C46A] to-[#F4A261] bg-clip-text text-transparent">
              Professional
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[#C4B5A0] text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-4 md:mt-6"
          >
            Join thousands of home cooks discovering exquisite recipes, sharing
            creations, and turning everyday meals into extraordinary
            experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-6 md:mt-8"
          >
            <Link href={ROUTES.RECIPES}>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-semibold shadow-lg shadow-[#E07A2F]/30 hover:shadow-xl hover:shadow-[#E07A2F]/40 hover:scale-105 transition-all duration-300 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base w-full sm:w-auto"
              >
                Explore Recipes
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={isAuthenticated ? ROUTES.ADD_RECIPE : ROUTES.REGISTER}>
              <Button
                size="lg"
                variant="secondary"
                className="border-2 border-white/40 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base w-full sm:w-auto"
              >
                <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                {isAuthenticated ? 'Share Recipe' : 'Join Now'}
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex gap-6 md:gap-10 justify-center pt-5 md:pt-8 mt-6 border-t border-white/10"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center gap-1.5 md:gap-2 justify-center">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#E9C46A]" />
                    <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <p className="text-[#A89888] text-[10px] md:text-xs font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>

      {/* Slide Indicators - Bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-[#E9C46A] w-8 md:w-10 h-1.5'
                : 'bg-white/30 hover:bg-white/50 w-2 h-1.5'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

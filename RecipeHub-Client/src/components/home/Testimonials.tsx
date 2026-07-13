'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card } from '@/components/ui/Card';
import {
  Star,
  Quote,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/constants';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Home Cook',
    comment:
      'RecipeHub has completely transformed how I cook at home. The recipes are easy to follow and the community is so supportive!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Food Blogger',
    comment:
      'I love sharing my recipes on RecipeHub. The platform makes it easy to connect with other food enthusiasts and get feedback.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Busy Parent',
    comment:
      'Finding quick and healthy recipes for my family has never been easier. RecipeHub saves me so much time!',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Rodriguez',
    role: 'Chef',
    comment:
      'The quality of recipes and the community engagement on RecipeHub is outstanding. A must-have for any food lover.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Park',
    role: 'Nutritionist',
    comment:
      'I recommend RecipeHub to all my clients. The healthy recipe collection is comprehensive and beautifully presented.',
    rating: 5,
  },
];

const avatarColors = [
  'from-[#E07A2F] to-[#F4A261]',
  'from-[#E9C46A] to-[#F4A261]',
  'from-[#F4A261] to-[#E07A2F]',
  'from-[#52B788] to-[#2D6A4F]',
  'from-[#4A90D9] to-[#2C6EAB]',
];

const InitialAvatar = ({ name, color }: { name: string; color: string }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-display font-bold text-sm sm:text-base shadow-lg shadow-[#E07A2F]/20 flex-shrink-0`}
    >
      {initials}
    </div>
  );
};

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-[#FFFBF7] overflow-hidden">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#F4A261]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#E9C46A]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] border border-[#F4A261]/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] border border-[#E9C46A]/5 rounded-full" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #2D1B0E 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-[#E9C46A]/15 text-5xl sm:text-6xl font-serif hidden lg:block">
        ✦
      </div>
      <div className="absolute bottom-20 right-10 text-[#F4A261]/15 text-5xl sm:text-6xl font-serif hidden lg:block">
        ✦
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 md:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E07A2F]" />
              <span className="text-[#E07A2F] text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase">
                Testimonials
              </span>
              <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-[#E07A2F] to-transparent" />
            </div>
            <SectionTitle
              title="What Our Users Say"
              description="Real testimonials from our amazing community."
              className="text-left"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={prevSlide}
              className="p-1.5 sm:p-2 rounded-full border border-[#F4A261]/20 hover:border-[#E07A2F] hover:bg-[#F4A261]/10 transition-all duration-300 text-[#7A6B5A] hover:text-[#E07A2F]"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <span className="text-[#7A6B5A] text-xs sm:text-sm font-medium">
              {currentIndex + 1} / {totalPages}
            </span>
            <button
              onClick={nextSlide}
              className="p-1.5 sm:p-2 rounded-full border border-[#F4A261]/20 hover:border-[#E07A2F] hover:bg-[#F4A261]/10 transition-all duration-300 text-[#7A6B5A] hover:text-[#E07A2F]"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={currentIndex}
        >
          {currentTestimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="relative overflow-hidden h-full group bg-white border border-[#F4A261]/10 hover:border-[#F4A261]/30 transition-all duration-500 p-4 sm:p-5 md:p-6 lg:p-7">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#E07A2F]" />
                </div>

                {/* Rating */}
                <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < testimonial.rating
                          ? 'fill-[#E9C46A] text-[#E9C46A]'
                          : 'text-[#E8E0D8]'
                      } sm:w-4 sm:h-4`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-[#7A6B5A] text-sm sm:text-base leading-relaxed flex-1 mb-4 sm:mb-5 line-clamp-4">
                  "{testimonial.comment}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-[#F4A261]/10">
                  <InitialAvatar
                    name={testimonial.name}
                    color={avatarColors[testimonial.id % avatarColors.length]}
                  />
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-[#2D1B0E] text-sm sm:text-base truncate">
                      {testimonial.name}
                    </h3>
                    <p className="text-[#7A6B5A] text-xs sm:text-sm truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 sm:mt-10 md:mt-14 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white border border-[#F4A261]/20 rounded-full px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-3 shadow-md">
            <span className="text-[#7A6B5A] text-[10px] sm:text-xs md:text-sm">
              Join {testimonials.length}+ happy users
            </span>
            <span className="hidden xs:inline w-px h-4 sm:h-5 bg-[#F4A261]/20" />
            <Link href={ROUTES.REGISTER}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-medium shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 hover:scale-105 transition-all duration-300 text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 md:px-5 py-1.5 sm:py-2"
              >
                Share Your Story
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ml-1 sm:ml-1.5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 md:mt-10">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-[#E07A2F] w-6 sm:w-8 h-1.5 sm:h-2'
                  : 'bg-[#F4A261]/20 hover:bg-[#F4A261]/40 w-1.5 sm:w-2 h-1.5 sm:h-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

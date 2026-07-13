'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ROUTES } from '@/constants';
import {
  Code2,
  Users,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  ChefHat,
  Heart,
  Globe,
  Award,
} from 'lucide-react';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AboutPage() {
  const features = [
    {
      icon: Code2,
      title: 'Modern Design',
      description:
        'Clean, intuitive interface built with latest web technologies',
      gradient: 'from-[#E07A2F] to-[#F4A261]',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description:
        'Share your recipes and connect with food enthusiasts worldwide',
      gradient: 'from-[#E9C46A] to-[#F4A261]',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description:
        'Lightning-fast search, filters, and seamless user experience',
      gradient: 'from-[#E07A2F] to-[#E9C46A]',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description:
        'Your recipes and data are protected with modern security standards',
      gradient: 'from-[#F4A261] to-[#E07A2F]',
    },
  ];

  const stats = [
    { value: '5,000+', label: 'Recipes', icon: ChefHat },
    { value: '10,000+', label: 'Users', icon: Users },
    { value: '4.9', label: 'Rating', icon: Award },
    { value: '120+', label: 'Countries', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4A261]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E9C46A]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#F4A261]/5 rounded-full" />
        </div>

        <Container className="relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E07A2F]/10 to-[#E9C46A]/10 border border-[#E07A2F]/20 rounded-full px-4 py-1.5 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E07A2F]" />
              <span className="text-[#E07A2F] text-xs font-medium tracking-[0.15em] uppercase">
                About RecipeHub
              </span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#2D1B0E] mb-4">
              About{' '}
              <span className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] bg-clip-text text-transparent">
                RecipeHub
              </span>
            </h1>
            <p className="text-[#7A6B5A] text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              A modern platform connecting food lovers worldwide to discover,
              share, and celebrate culinary creativity.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 bg-white border-y border-[#F4A261]/10">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#E07A2F]" />
                    <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#2D1B0E]">
                      {stat.value}
                    </p>
                  </div>
                  <p className="text-[#7A6B5A] text-xs sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <Container>
          <motion.div
            className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#E07A2F]" />
                <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
                  Our Mission
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2D1B0E] mb-4">
                Connecting Food Lovers
                <br />
                <span className="text-[#E07A2F]">Worldwide</span>
              </h2>
              <p className="text-[#7A6B5A] text-base sm:text-lg leading-relaxed mb-4">
                We believe cooking should be accessible, enjoyable, and
                inspiring for everyone. RecipeHub was created to solve a simple
                problem: finding quality recipes without the clutter of
                advertisements and inconsistent layouts.
              </p>
              <p className="text-[#7A6B5A] text-base sm:text-lg leading-relaxed">
                Our mission is to provide a clean, modern platform where home
                cooks, students, and professional chefs can discover amazing
                recipes and share their culinary creations with a supportive
                community.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative bg-gradient-to-br from-[#F4A261]/10 to-[#E9C46A]/10 rounded-3xl p-8 sm:p-12 flex items-center justify-center border border-[#F4A261]/20"
            >
              <div className="text-center">
                <div className="text-6xl sm:text-7xl mb-4">🍽️</div>
                <p className="font-display text-xl sm:text-2xl font-bold text-[#E07A2F]">
                  Connecting Food Lovers
                </p>
                <p className="text-[#7A6B5A] text-sm mt-2">
                  Share. Discover. Inspire.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 md:py-24 bg-white border-y border-[#F4A261]/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#E07A2F]" />
              <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
                Why Choose Us
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2D1B0E]">
              Why Choose <span className="text-[#E07A2F]">RecipeHub</span>?
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-[#FFFBF7] border border-[#F4A261]/10 p-6 sm:p-8 rounded-2xl hover:border-[#E07A2F]/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#2D1B0E] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#7A6B5A] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFFBF7] to-[#FDF5EC] border border-[#F4A261]/20 shadow-xl shadow-[#F4A261]/5 p-8 sm:p-12 text-center"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F4A261]/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E9C46A]/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <Heart className="w-12 h-12 text-[#E07A2F] mx-auto mb-4" />
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1B0E] mb-3">
                Ready to Start Your{' '}
                <span className="text-[#E07A2F]">Culinary Journey</span>?
              </h2>
              <p className="text-[#7A6B5A] text-sm sm:text-base max-w-lg mx-auto mb-6">
                Join thousands of home cooks and share your culinary creations
                with the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href={ROUTES.REGISTER}>
                  <Button className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 hover:scale-105 transition-all duration-300 px-6 py-2.5">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href={ROUTES.RECIPES}>
                  <Button
                    variant="secondary"
                    className="border-[#E07A2F]/30 text-[#E07A2F] hover:bg-[#F4A261]/10"
                  >
                    Explore Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

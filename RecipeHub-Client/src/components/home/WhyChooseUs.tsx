'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { Card } from '@/components/ui/Card';
import { Zap, Users, Search, Clock, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';
import { Button } from '@/components/ui/Button';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
  {
    icon: <Search className="w-6 h-6 text-white" />,
    title: 'Easy Discovery',
    description:
      'Find recipes by ingredients, cuisine, or difficulty level with our smart search.',
    gradient: 'from-[#E07A2F] to-[#F4A261]',
  },
  {
    icon: <Zap className="w-6 h-6 text-white" />,
    title: 'Quick & Healthy',
    description:
      "Explore quick recipes that don't compromise on nutrition and taste.",
    gradient: 'from-[#E9C46A] to-[#F4A261]',
  },
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: 'Time Saving',
    description:
      'Filter by cooking time and find recipes that perfectly fit your schedule.',
    gradient: 'from-[#E07A2F] to-[#E9C46A]',
  },
  {
    icon: <Users className="w-6 h-6 text-white" />,
    title: 'Community Driven',
    description:
      'Share your recipes and learn from millions of passionate home cooks worldwide.',
    gradient: 'from-[#F4A261] to-[#E9C46A]',
  },
];

export const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-[#FFFBF7] overflow-hidden">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F4A261]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#E9C46A]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#F4A261]/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#E9C46A]/5 rounded-full" />
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
      <div className="absolute top-20 right-10 text-[#E9C46A]/15 text-6xl font-serif hidden lg:block">
        ✦
      </div>
      <div className="absolute bottom-20 left-10 text-[#F4A261]/15 text-6xl font-serif hidden lg:block">
        ✦
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E07A2F]/10 to-[#E9C46A]/10 backdrop-blur-sm border border-[#E07A2F]/20 rounded-full px-4 py-1.5 mb-4"
              >
                <Sparkles className="w-4 h-4 text-[#E07A2F]" />
                <span className="text-[#E07A2F] text-xs font-medium tracking-[0.2em] uppercase">
                  Why Choose Us
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D1B0E]"
              >
                Why Choose <span className="text-[#E07A2F]">RecipeHub</span>?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[#7A6B5A] text-base md:text-lg mt-2 max-w-2xl"
              >
                Discover what makes RecipeHub the best recipe platform for home
                cooks worldwide.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link href={ROUTES.ABOUT}>
                <Button
                  variant="ghost"
                  className="group text-[#E07A2F] hover:text-[#E07A2F] hover:bg-[#F4A261]/10 px-4 py-2 text-sm font-medium"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="h-full"
            >
              <Card className="relative overflow-hidden h-full group bg-white border border-[#F4A261]/10 hover:border-[#F4A261]/30 transition-all duration-500 p-6 md:p-7">
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4A261]/5 to-[#E9C46A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon with Gradient Circle */}
                <div className="relative mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg shadow-[#E07A2F]/20 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  {/* Decorative Ring */}
                  <div
                    className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500 -z-10`}
                  />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-[#2D1B0E] text-lg mb-2 group-hover:text-[#E07A2F] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[#7A6B5A] text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Indicator Line */}
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
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white border border-[#F4A261]/20 rounded-full px-6 py-3 shadow-md">
            <span className="text-[#7A6B5A] text-sm">
              Ready to start your culinary journey?
            </span>
            <Link href={ROUTES.REGISTER}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-medium shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 hover:scale-105 transition-all duration-300"
              >
                Join Now
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};




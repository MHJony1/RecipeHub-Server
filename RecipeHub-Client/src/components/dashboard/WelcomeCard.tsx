'use client';

import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';

interface WelcomeCardProps {
  userName: string;
}

export const WelcomeCard = ({ userName }: WelcomeCardProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-[#E07A2F] via-[#E9C46A] to-[#F4A261] text-white p-6 md:p-8 border-0 shadow-2xl shadow-[#E07A2F]/20 rounded-3xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-4 right-4 text-white/10 text-6xl font-serif">
          ✦
        </div>
        <div className="absolute bottom-4 left-4 text-white/10 text-4xl font-serif">
          ✦
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-xs font-medium tracking-[0.2em] uppercase">
                Dashboard Overview
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Manage your recipes and continue your culinary journey
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-white/70 text-sm font-medium hidden sm:block">
              {currentDate}
            </p>
            <Link href={ROUTES.ADD_RECIPE}>
              <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 flex items-center gap-2">
                <span>Create Recipe</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

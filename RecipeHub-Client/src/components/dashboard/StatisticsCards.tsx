'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import {
  BookOpen,
  Tag,
  Clock,
  Calendar,
} from 'lucide-react';

interface StatisticsCardsProps {
  stats: {
    totalRecipes: number;
    categoriesUsed: number;
    avgCookingTime: number;
    latestRecipeDate: string | null;
  };
}

export const StatisticsCards = ({ stats }: StatisticsCardsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const latestDate = stats.latestRecipeDate
    ? new Date(stats.latestRecipeDate).toLocaleDateString()
    : 'N/A';

  const cards = [
    {
      icon: BookOpen,
      title: 'Total Recipes',
      value: stats.totalRecipes,
      gradient: 'from-[#E07A2F] to-[#F4A261]',
      bgColor: 'bg-[#F4A261]/10',
      textColor: 'text-[#E07A2F]',
    },
    {
      icon: Tag,
      title: 'Categories',
      value: stats.categoriesUsed,
      gradient: 'from-[#E9C46A] to-[#F4A261]',
      bgColor: 'bg-[#E9C46A]/10',
      textColor: 'text-[#E9C46A]',
    },
    {
      icon: Clock,
      title: 'Avg Cooking Time',
      value: `${stats.avgCookingTime}m`,
      gradient: 'from-[#E07A2F] to-[#E9C46A]',
      bgColor: 'bg-[#E07A2F]/10',
      textColor: 'text-[#E07A2F]',
    },
    {
      icon: Calendar,
      title: 'Latest Recipe',
      value: latestDate,
      gradient: 'from-[#F4A261] to-[#E07A2F]',
      bgColor: 'bg-[#F4A261]/10',
      textColor: 'text-[#F4A261]',
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div key={index} variants={itemVariants}>
            <Card className="group relative overflow-hidden bg-white border border-[#F4A261]/10 hover:border-[#E07A2F]/30 hover:shadow-xl transition-all duration-500 p-5 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#F4A261]/5 to-[#E9C46A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#7A6B5A] text-[10px] font-medium uppercase tracking-wider">
                    {card.title}
                  </p>
                  <p className="font-display text-2xl font-bold text-[#2D1B0E] mt-1">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg shadow-[#E07A2F]/20 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

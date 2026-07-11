'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { BookOpen, Tag, Clock, Calendar } from 'lucide-react';

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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const latestDate = stats.latestRecipeDate
    ? new Date(stats.latestRecipeDate).toLocaleDateString()
    : 'N/A';

  const cards = [
    {
      icon: BookOpen,
      title: 'Total Recipes',
      value: stats.totalRecipes,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Tag,
      title: 'Categories',
      value: stats.categoriesUsed,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Clock,
      title: 'Avg Cooking Time',
      value: `${stats.avgCookingTime}m`,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Calendar,
      title: 'Latest Recipe',
      value: latestDate,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div key={index} variants={itemVariants}>
            <Card className="hover:shadow-xl transition-all">
              <div className={`${card.bgColor} p-3 rounded-lg mb-4 w-fit`}>
                <Icon className={`${card.color} w-7 h-7`} />
              </div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

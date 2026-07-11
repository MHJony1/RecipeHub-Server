'use client';

import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';

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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card className="bg-gradient-to-br from-orange-500 via-orange-500 to-amber-600 text-white p-8 border-0 shadow-lg">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
            <p className="text-base md:text-lg opacity-90 mb-4">
              Manage your recipes and continue your culinary journey
            </p>
            <p className="text-sm opacity-75 font-medium">{currentDate}</p>
          </div>
          <div className="text-6xl opacity-20 ml-4 hidden md:block">🍳</div>
        </div>
      </Card>
    </motion.div>
  );
};

'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Zap, Users, Search, Clock } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Search className="w-10 h-10 text-orange-500" />,
    title: 'Easy Discovery',
    description: 'Find recipes by ingredients, cuisine, or difficulty level.',
  },
  {
    icon: <Zap className="w-10 h-10 text-orange-500" />,
    title: 'Quick & Healthy',
    description: 'Explore quick recipes that dont compromise on nutrition.',
  },
  {
    icon: <Clock className="w-10 h-10 text-orange-500" />,
    title: 'Time Saving',
    description: 'Filter by cooking time and find recipes that fit your schedule.',
  },
  {
    icon: <Users className="w-10 h-10 text-orange-500" />,
    title: 'Community Driven',
    description: 'Share your recipes and learn from millions of home cooks.',
  },
];

export const WhyChooseUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle
          title="Why Choose RecipeHub?"
          description="Discover what makes RecipeHub the best recipe platform."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="text-center hover:shadow-xl transition-shadow h-full flex flex-col items-center justify-center py-8">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

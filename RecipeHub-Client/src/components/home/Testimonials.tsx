'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Home Cook',
    comment: 'RecipeHub has completely transformed how I cook at home. The recipes are easy to follow and the community is so supportive!',
    rating: 5,
    avatar: '👩‍🍳',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Food Blogger',
    comment: 'I love sharing my recipes on RecipeHub. The platform makes it easy to connect with other food enthusiasts and get feedback.',
    rating: 5,
    avatar: '👨‍🍳',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Busy Parent',
    comment: 'Finding quick and healthy recipes for my family has never been easier. RecipeHub saves me so much time!',
    rating: 5,
    avatar: '👩‍💼',
  },
];

export const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle title="What Our Users Say" description="Real testimonials from our amazing community." />

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate="visible">
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 flex-1">{testimonial.comment}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

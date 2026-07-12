'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card } from '@/components/ui/Card';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'How do I create an account?',
    answer: 'Click on the "Sign Up" button in the navigation bar, fill in your details, and you\'ll be able to start sharing recipes right away!',
  },
  {
    id: 2,
    question: 'Can I upload my own recipes?',
    answer: 'Yes! Once you\'re logged in, click "Add Recipe" in your dashboard and fill in the recipe details. Your recipe will be published immediately.',
  },
  {
    id: 3,
    question: 'How do I search for specific recipes?',
    answer: 'Use the search bar on the Recipes page or filter by category, difficulty, or cooking time to find exactly what you\'re looking for.',
  },
  {
    id: 4,
    question: 'Are the recipes free to use?',
    answer: 'Yes! All recipes on RecipeHub are completely free. You can view, save, and share any recipe on our platform.',
  },
  {
    id: 5,
    question: 'How do I edit or delete my recipes?',
    answer: 'Go to your dashboard, click "Manage Recipes", and you\'ll see all your recipes. You can edit or delete them from there.',
  },
  {
    id: 6,
    question: 'Can I contact other users?',
    answer: 'While we don\'t have direct messaging yet, you can leave comments on recipes and connect with other users in our community.',
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ item, isOpen, onToggle }: AccordionItemProps) => {
  return (
    <Card className="mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-accent/5 transition-colors"
      >
        <h3 className="font-display font-semibold text-text text-left">{item.question}</h3>
        <ChevronDown
          size={20}
          className={`text-primary transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border/30"
          >
            <p className="px-6 py-5 font-body text-text-secondary leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <Container>
        <SectionTitle
          title="Frequently Asked Questions"
          description="Find answers to common questions about RecipeHub."
        />

        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

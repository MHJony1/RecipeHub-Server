'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/common/Container';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Card } from '@/components/ui/Card';
import {
  ChevronDown,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Search,
  Upload,
  Edit,
  Users,
  Lock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants';
import { Button } from '@/components/ui/Button';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: React.ReactNode;
  category?: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'How do I create an account?',
    answer:
      'Click on the "Sign Up" button in the navigation bar, fill in your details, and you\'ll be able to start sharing recipes right away!',
    icon: <Users className="w-4 h-4" />,
    category: 'Account',
  },
  {
    id: 2,
    question: 'Can I upload my own recipes?',
    answer:
      'Yes! Once you\'re logged in, click "Add Recipe" in your dashboard and fill in the recipe details. Your recipe will be published immediately.',
    icon: <Upload className="w-4 h-4" />,
    category: 'Sharing',
  },
  {
    id: 3,
    question: 'How do I search for specific recipes?',
    answer:
      "Use the search bar on the Recipes page or filter by category, difficulty, or cooking time to find exactly what you're looking for.",
    icon: <Search className="w-4 h-4" />,
    category: 'Search',
  },
  {
    id: 4,
    question: 'Are the recipes free to use?',
    answer:
      'Yes! All recipes on RecipeHub are completely free. You can view, save, and share any recipe on our platform.',
    icon: <Lock className="w-4 h-4" />,
    category: 'Pricing',
  },
  {
    id: 5,
    question: 'How do I edit or delete my recipes?',
    answer:
      'Go to your dashboard, click "Manage Recipes", and you\'ll see all your recipes. You can edit or delete them from there.',
    icon: <Edit className="w-4 h-4" />,
    category: 'Management',
  },
  {
    id: 6,
    question: 'Can I contact other users?',
    answer:
      "While we don't have direct messaging yet, you can leave comments on recipes and connect with other users in our community.",
    icon: <MessageCircle className="w-4 h-4" />,
    category: 'Community',
  },
];

const categoryColors: Record<string, string> = {
  Account: 'from-[#4A90D9] to-[#2C6EAB]',
  Sharing: 'from-[#52B788] to-[#2D6A4F]',
  Search: 'from-[#E07A2F] to-[#F4A261]',
  Pricing: 'from-[#E9C46A] to-[#F4A261]',
  Management: 'from-[#E07A2F] to-[#E9C46A]',
  Community: 'from-[#F4A261] to-[#E07A2F]',
};

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const AccordionItem = ({
  item,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) => {
  const iconColor =
    categoryColors[item.category || ''] || 'from-[#E07A2F] to-[#F4A261]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card
        className={`mb-3 sm:mb-4 overflow-hidden border border-[#F4A261]/10 hover:border-[#F4A261]/20 transition-all duration-300 ${
          isOpen ? 'border-[#E07A2F]/30 shadow-lg shadow-[#E07A2F]/5' : ''
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full px-4 sm:px-5 md:px-6 py-3.5 sm:py-4 md:py-5 flex items-center gap-3 sm:gap-4 hover:bg-[#F4A261]/5 transition-colors duration-200 group"
        >
          {/* Icon */}
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${iconColor} flex items-center justify-center flex-shrink-0 shadow-md shadow-[#E07A2F]/10 group-hover:scale-110 transition-transform duration-300`}
          >
            <div className="text-white">
              {item.icon || (
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </div>
          </div>

          <div className="flex-1 text-left">
            <h3 className="font-body font-semibold text-[#2D1B0E] text-sm sm:text-base leading-snug">
              {item.question}
            </h3>
            {item.category && (
              <span className="text-[#7A6B5A] text-[10px] sm:text-xs font-medium">
                {item.category}
              </span>
            )}
          </div>

          <ChevronDown
            size={18}
            className={`text-[#7A6B5A] transition-all duration-300 shrink-0 ${
              isOpen
                ? 'rotate-180 text-[#E07A2F]'
                : 'group-hover:text-[#E07A2F]'
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="border-t border-[#F4A261]/10"
            >
              <div className="px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6">
                <div className="flex items-start gap-3">
                  <div className="w-0.5 h-full min-h-[40px] bg-gradient-to-b from-[#E07A2F] to-[#E9C46A] rounded-full flex-shrink-0" />
                  <p className="text-[#7A6B5A] text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-[#FFFBF7] overflow-hidden">
      {/* Premium Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#F4A261]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#E9C46A]/5 rounded-full blur-3xl" />
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
      <div className="absolute top-20 right-10 text-[#E9C46A]/15 text-5xl sm:text-6xl font-serif hidden lg:block">
        ✦
      </div>
      <div className="absolute bottom-20 left-10 text-[#F4A261]/15 text-5xl sm:text-6xl font-serif hidden lg:block">
        ✦
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 md:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E07A2F]" />
                <span className="text-[#E07A2F] text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase">
                  Help Center
                </span>
                <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-[#E07A2F] to-transparent" />
              </div>
              <SectionTitle
                title="Frequently Asked Questions"
                description="Find answers to common questions about RecipeHub."
                className="text-left"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="bg-white border border-[#F4A261]/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-sm">
                <span className="text-[#7A6B5A] text-[10px] sm:text-xs">
                  {faqs.length} questions answered
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              item={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 sm:mt-10 md:mt-14 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white border border-[#F4A261]/20 rounded-full px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-3 shadow-md">
            <span className="text-[#7A6B5A] text-[10px] sm:text-xs md:text-sm">
              Still have questions?
            </span>
            <span className="hidden xs:inline w-px h-4 sm:h-5 bg-[#F4A261]/20" />
            <Link href={ROUTES.CONTACT}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white font-medium shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35 hover:scale-105 transition-all duration-300 text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 md:px-5 py-1.5 sm:py-2"
              >
                Contact Us
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ml-1 sm:ml-1.5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#52B788]" />
            <span className="text-[#7A6B5A] text-[10px] sm:text-xs">
              100% Free
            </span>
          </div>
          <div className="w-px h-3 sm:h-4 bg-[#F4A261]/20" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E07A2F]" />
            <span className="text-[#7A6B5A] text-[10px] sm:text-xs">
              No Spam
            </span>
          </div>
          <div className="w-px h-3 sm:h-4 bg-[#F4A261]/20" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E9C46A]" />
            <span className="text-[#7A6B5A] text-[10px] sm:text-xs">
              24/7 Support
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

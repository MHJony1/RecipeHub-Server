'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';
import { PlusCircle, BookOpen, Compass, Sparkles } from 'lucide-react';

export const QuickActions = () => {
  const actions = [
    {
      label: 'Add Recipe',
      href: ROUTES.ADD_RECIPE,
      icon: PlusCircle,
      gradient: 'from-[#E07A2F] to-[#E9C46A]',
      primary: true,
    },
    {
      label: 'Manage Recipes',
      href: ROUTES.MANAGE_RECIPES,
      icon: BookOpen,
      gradient: 'from-[#E9C46A] to-[#F4A261]',
      primary: false,
    },
    {
      label: 'Explore',
      href: ROUTES.RECIPES,
      icon: Compass,
      gradient: 'from-[#F4A261] to-[#E07A2F]',
      primary: false,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Link key={index} href={action.href}>
            <Button
              className={`group ${
                action.primary
                  ? 'bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white shadow-md shadow-[#E07A2F]/25 hover:shadow-lg hover:shadow-[#E07A2F]/35'
                  : 'border-2 border-[#E07A2F]/20 text-[#2D1B0E] hover:bg-[#F4A261]/10 hover:border-[#E07A2F]/40'
              } hover:scale-105 transition-all duration-300 px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2`}
            >
              <Icon
                className={`w-4 h-4 ${action.primary ? 'text-white' : 'text-[#E07A2F]'}`}
              />
              {action.label}
              {action.primary && (
                <Sparkles className="w-3.5 h-3.5 text-white/70" />
              )}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 border border-gray-200',
    success: 'bg-green-50 text-green-800 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
    danger: 'bg-red-50 text-red-800 border border-red-200',
  };

  return (
    <span className={cn('px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider', variants[variant], className)}>
      {children}
    </span>
  );
};

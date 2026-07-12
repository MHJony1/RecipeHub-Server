import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('bg-white rounded-xl shadow-md border border-accent/20 hover:shadow-lg transition-all duration-300', className)}>
      {children}
    </div>
  );
};

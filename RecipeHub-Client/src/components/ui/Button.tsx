import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'font-medium rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 inline-flex items-center justify-center whitespace-nowrap';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#E07A2F] to-[#E9C46A] text-white shadow-md shadow-[#E07A2F]/30 hover:shadow-lg hover:shadow-[#E07A2F]/40 hover:scale-105',
    secondary: 'border-2 border-[#E07A2F] text-[#E07A2F] hover:bg-[#F4A261]/10',
    ghost: 'text-[#7A6B5A] hover:text-[#E07A2F] hover:bg-[#F4A261]/10',
    danger:
      'bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/20',
  };

  const sizes = {
    sm: 'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm',
    md: 'px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base',
    lg: 'px-6 sm:px-8 py-2.5 sm:py-3.5 text-base sm:text-lg',
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

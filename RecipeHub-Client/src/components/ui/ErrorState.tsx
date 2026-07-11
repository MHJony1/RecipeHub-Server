import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title: string;
  message?: string;
  description?: string;
  action?: ReactNode;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({
  title,
  message,
  description,
  action,
  onRetry,
  className = '',
}: ErrorStateProps) => {
  const text = description || message;

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 bg-red-50 rounded-2xl border border-red-200 ${className}`}>
      <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
      <h3 className="text-2xl font-bold text-red-700 mb-2 text-center">{title}</h3>
      {text && (
        <p className="text-red-600 text-center mb-8 max-w-sm">{text}</p>
      )}
      {action || (onRetry && (
        <Button onClick={onRetry} variant="primary">
          Try Again
        </Button>
      ))}
    </div>
  );
};

import { ReactNode } from 'react';

interface ErrorStateProps {
  title: string;
  message?: string;
  description?: string;
  action?: ReactNode;
  onRetry?: () => void;
}

export const ErrorState = ({ title, message, description, action, onRetry }: ErrorStateProps) => {
  const text = description || message;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-2xl font-bold text-red-600 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6">{text}</p>
      {action || (onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      ))}
    </div>
  );
};

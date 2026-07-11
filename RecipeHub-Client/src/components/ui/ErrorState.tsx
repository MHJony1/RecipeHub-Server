import { ReactNode } from 'react';

interface ErrorStateProps {
  title: string;
  message: string;
  action?: ReactNode;
}

export const ErrorState = ({ title, message, action }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-2xl font-bold text-red-600 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6">{message}</p>
      {action}
    </div>
  );
};

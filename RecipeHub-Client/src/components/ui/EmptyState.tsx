import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon | string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  icon: Icon,
  action,
  className = ''
}: EmptyStateProps) => {
  const isCustomIcon = typeof Icon === 'string';

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-2xl ${className}`}>
      <div className="mb-6">
        {isCustomIcon ? (
          <div className="text-6xl">{Icon}</div>
        ) : Icon ? (
          <Icon className="w-16 h-16 text-gray-400" />
        ) : (
          <div className="text-6xl">📭</div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center mb-8 max-w-sm">{description}</p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
};

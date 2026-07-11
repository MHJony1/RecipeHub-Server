import { cn } from '@/utils/cn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionTitle = ({
  title,
  subtitle,
  centered = true,
  className,
}: SectionTitleProps) => {
  return (
    <div className={cn(centered ? 'text-center' : '', className)}>
      <h2 className="text-4xl font-bold text-gray-900 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
    </div>
  );
};

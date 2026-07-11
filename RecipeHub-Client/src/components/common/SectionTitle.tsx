import { cn } from '@/utils/cn';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionTitle = ({
  title,
  subtitle,
  description,
  centered = true,
  className,
}: SectionTitleProps) => {
  const text = description || subtitle;

  return (
    <div className={cn('mb-12', centered ? 'text-center' : '', className)}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
      {text && <p className="text-gray-600 text-lg max-w-2xl mx-auto">{text}</p>}
    </div>
  );
};

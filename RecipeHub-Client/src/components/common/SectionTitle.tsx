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
    <div className={cn('mb-16 md:mb-20', centered ? 'text-center' : '', className)}>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-text mb-4">{title}</h2>
      {text && (
        <p className="font-body text-text-secondary text-lg md:text-xl max-w-3xl mx-auto">{text}</p>
      )}
    </div>
  );
};

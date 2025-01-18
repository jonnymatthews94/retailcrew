import { cn } from '../../lib/utils';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg'
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-primary-100 font-medium text-primary-700 transition-colors hover:bg-primary-200',
        sizeClasses[size],
        className
      )}
    >
      {initial}
    </div>
  );
}
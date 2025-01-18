import { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
  loadingClassName?: string;
}

export function LazyImage({ 
  src, 
  alt, 
  className,
  fallback = <ImageOff className="h-6 w-6 text-gray-400" />,
  loadingClassName,
  ...props 
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src || '';
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gray-100",
        className
      )}>
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        className,
        !loaded && loadingClassName,
        !loaded && "animate-pulse bg-gray-200"
      )}
      {...props}
    />
  );
}
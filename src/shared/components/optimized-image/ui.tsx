import { useState, useRef, useEffect } from 'react';
import { cn } from '@shared/lib/utils';
import { LoadingSpinner } from '@shared/components/loading-spinner';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Оптимизированный компонент изображения с lazy loading и placeholder
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  placeholder,
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  return (
    <div className={cn('relative overflow-hidden', className)} ref={imgRef}>
      {isLoading && !hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
          {placeholder ? (
            <img src={placeholder} alt='' className='h-full w-full object-cover opacity-50' />
          ) : (
            <LoadingSpinner size='sm' />
          )}
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            hasError && 'opacity-50',
          )}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
      {hasError && (
        <div className='flex h-full w-full items-center justify-center bg-gray-100 text-gray-400'>
          <span className='text-sm'>Ошибка загрузки</span>
        </div>
      )}
    </div>
  );
};

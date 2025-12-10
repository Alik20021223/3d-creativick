import { cn } from '@shared/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
  variant?: 'spinner' | 'dots' | 'pulse';
}

/**
 * Компонент спиннера загрузки с плавной анимацией
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  fullScreen = false,
  variant = 'spinner',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const borderSizeClasses = {
    sm: 'border-2',
    md: 'border-2',
    lg: 'border-3',
  };

  const renderSpinner = () => {
    if (variant === 'dots') {
      return (
        <div
          className={cn('flex items-center gap-1.5', className)}
          role='status'
          aria-label='Загрузка'
        >
          <div
            className={cn(
              'bg-primary animate-bounce rounded-full',
              size === 'sm' ? 'h-1.5 w-1.5' : size === 'md' ? 'h-2 w-2' : 'h-3 w-3',
            )}
            style={{ animationDelay: '0ms' }}
          />
          <div
            className={cn(
              'bg-primary animate-bounce rounded-full',
              size === 'sm' ? 'h-1.5 w-1.5' : size === 'md' ? 'h-2 w-2' : 'h-3 w-3',
            )}
            style={{ animationDelay: '150ms' }}
          />
          <div
            className={cn(
              'bg-primary animate-bounce rounded-full',
              size === 'sm' ? 'h-1.5 w-1.5' : size === 'md' ? 'h-2 w-2' : 'h-3 w-3',
            )}
            style={{ animationDelay: '300ms' }}
          />
          <span className='sr-only'>Загрузка...</span>
        </div>
      );
    }

    if (variant === 'pulse') {
      return (
        <div
          className={cn('bg-primary animate-pulse rounded-full', sizeClasses[size], className)}
          role='status'
          aria-label='Загрузка'
        >
          <span className='sr-only'>Загрузка...</span>
        </div>
      );
    }

    // Default spinner
    return (
      <div
        className={cn(
          'border-primary animate-spin rounded-full border-t-transparent',
          sizeClasses[size],
          borderSizeClasses[size],
          className,
        )}
        role='status'
        aria-label='Загрузка'
      >
        <span className='sr-only'>Загрузка...</span>
      </div>
    );
  };

  if (fullScreen) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm'>
        <div className='flex flex-col items-center gap-4'>
          {renderSpinner()}
          <p className='animate-pulse text-sm text-gray-600'>Загрузка...</p>
        </div>
      </div>
    );
  }

  return renderSpinner();
};

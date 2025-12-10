import { cn } from '@shared/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Компонент скелетона для отображения состояния загрузки контента
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], animationClasses[animation], className)}
      style={style}
      aria-hidden='true'
    />
  );
};

/**
 * Скелетон для карточки продукта
 */
export const ProductCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex flex-col gap-4 rounded-2xl bg-white p-4', className)}>
      <Skeleton variant='rectangular' height={260} className='w-full rounded-xl' />
      <div className='space-y-2'>
        <Skeleton variant='text' height={20} width='80%' />
        <Skeleton variant='text' height={16} width='60%' />
        <Skeleton variant='text' height={24} width='40%' />
      </div>
      <div className='flex gap-2'>
        <Skeleton variant='rectangular' height={40} width={120} />
        <Skeleton variant='circular' height={40} width={40} />
      </div>
    </div>
  );
};

/**
 * Скелетон для списка продуктов
 */
export const ProductListSkeleton: React.FC<{ count?: number; className?: string }> = ({
  count = 6,
  className,
}) => {
  return (
    <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

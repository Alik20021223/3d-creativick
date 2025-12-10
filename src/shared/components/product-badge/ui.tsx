import React from 'react';
import { ProductBadge as ProductBadgeType } from '@shared/types';

interface ProductBadgeProps {
  badge: ProductBadgeType;
  className?: string;
}

const ProductBadge: React.FC<ProductBadgeProps> = ({ badge, className = '' }) => {
  if (!badge.active) return null;

  return (
    <div
      className={`description-text bg-secondary-white rounded-full px-5.5 py-1 ${className}`}
    >
      {badge.icon && <span className='mr-1'>{badge.icon}</span>}
      {badge.translation?.title || ''}
    </div>
  );
};

export default ProductBadge;


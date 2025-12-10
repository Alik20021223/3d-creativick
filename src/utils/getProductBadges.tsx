// src/entities/products/utils/getProductBadges.ts
import { FileImage, AlarmClock, Atom } from 'lucide-react';
import type { Badge, ProductCardType } from '@shared/types';

const formatPrintTime = (minutes: number) => {
  if (minutes < 60) return `${minutes} мин`;
  const hours = Math.floor(minutes / 60);
  const restMin = minutes % 60;
  if (restMin === 0) return `${hours} ч`;
  return `${hours} ч ${restMin} мин`;
};

export const getProductBadges = (data: ProductCardType): Badge[] => {
  const badges: Badge[] = [];

  if (typeof data.file_size_mb === 'number') {
    badges.push({
      icon: <FileImage className='size-5' />,
      text: (
        <div className='flex w-full justify-between gap-2'>
          <span>Размер файла</span>
          <span className='font-semibold'>{data.file_size_mb} МБ</span>
        </div>
      ),
    });
  }

  if (typeof data.print_time_min === 'number') {
    badges.push({
      icon: <AlarmClock className='size-5' />,
      text: (
        <div className='flex w-full justify-between gap-2'>
          <span>Время печати модели</span>
          <span className='font-semibold'>{formatPrintTime(data.print_time_min)}</span>
        </div>
      ),
    });
  }

  if (typeof data.material_grams === 'number') {
    badges.push({
      icon: <Atom className='size-5' />,
      text: (
        <div className='flex w-full justify-between gap-2'>
          <span>Количество материала</span>
          <span className='font-semibold'>{data.material_grams} г</span>
        </div>
      ),
    });
  }

  return badges;
};

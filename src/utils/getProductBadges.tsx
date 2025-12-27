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

type BadgeOptions = { isSeries?: boolean };

const getSeriesPrintTime = (data: ProductCardType) => {
  if (typeof data.print_time_min === 'number') return data.print_time_min;

  if (Array.isArray(data.models)) {
    const total = data.models.reduce((acc, model) => {
      return typeof model.print_time_min === 'number' ? acc + model.print_time_min : acc;
    }, 0);
    return total > 0 ? total : undefined;
  }

  return undefined;
};

export const getProductBadges = (data: ProductCardType, options?: BadgeOptions): Badge[] => {
  const badges: Badge[] = [];
  const isSeries = options?.isSeries ?? false;

  console.log(options);
  

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

  const printTime = isSeries ? getSeriesPrintTime(data) : data.print_time_min;

  if (typeof printTime === 'number') {
    badges.push({
      icon: <AlarmClock className='size-5' />,
      text: (
        <div className='flex w-full justify-between gap-2'>
          <span>{!isSeries ? 'Время печати серии' : 'Время печати модели'}</span>
          <span className='font-semibold'>{formatPrintTime(printTime)}</span>
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

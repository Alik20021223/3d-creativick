import React, { useMemo } from 'react';
import { Button } from '@shared/shadcn/button';
import { formatPrice } from '@utils/constant';
import {
  OrderDetail,
  ProductFile,
  ProductFileType,
  ProductFileVisibility,
  ProductWithFiles,
} from '@entities/profile/types/order';
import { DownloadIcon } from 'lucide-react';

interface OrderDetailItemProps {
  detail: OrderDetail;
  currencySymbol?: string;
}

const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL || ''; // <-- настроишь под своё API/сторедж

const OrderDetailItem: React.FC<OrderDetailItemProps> = ({ detail, currencySymbol = '₽' }) => {
  const stock = detail?.stock;
  const product = stock?.product;

  // ---------- 🧾 ВЫБОР ФАЙЛОВ ----------
  const files = product
    ? ((product as ProductWithFiles).files as
        | {
            id: number;
            product_id: number;
            type: ProductFileType;
            visibility: ProductFileVisibility;
            path: string;
            original_name: string;
            mime: string;
            size: number | null;
          }[]
        | undefined)
    : undefined;

  const { manualFile, archiveFile } = useMemo(() => {
    if (!files || !files.length) {
      return { manualFile: null, archiveFile: null };
    }

    const privateManual = files.find(
      (f) => f.type === 'public_manual_pdf' || f.type === 'private_manual_pdf',
    );
    const publicManual = files.find(
      (f) => f.type === 'public_manual_pdf' || f.type === 'private_manual_pdf',
    );
    const archive = files.find((f) => f.type === 'assets_archive');

    return {
      // приоритет: private → public
      manualFile: privateManual ?? publicManual ?? null,
      archiveFile: archive ?? null,
    };
  }, [files]);

  if (!stock || !product) return null;

  const title = product.translation?.title ?? `Товар #${product.id}`;
  const image = product.img;

  const size = stock.size ?? '';
  const color = stock.color ?? '';

  const isDefaultSize = size === 'default';
  const isDefaultColor = color === 'default';

  const isHexColor = typeof color === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color);

  const isNumericSize = !!size && !isNaN(Number(size));

  // кнопка "Скачать инструкцию"
  const showInstructionButton = (isDefaultSize && isDefaultColor) || (isDefaultSize && isHexColor);

  // менеджер свяжется
  const showManagerNote = (isDefaultSize && isHexColor) || (isNumericSize && isHexColor);

  // хелпер для URL
  const buildFileUrl = (rawPath: string) => {
    if (!rawPath) return '';
    const isAbsoluteUrl = /^https?:\/\//i.test(rawPath);
    return isAbsoluteUrl
      ? rawPath
      : `${FILE_BASE_URL.replace(/\/$/, '')}/${rawPath.replace(/^\//, '')}`;
  };

  // общий хелпер скачивания
  const downloadFile = (file: ProductFile) => {
    const url = buildFileUrl(file.path);
    if (!url) return;

    const link = document.createElement('a');
    link.href = url;
    link.download = file.original_name || `file-${file.id}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDownloadInstruction = () => {
    if (!manualFile) return;
    downloadFile(manualFile);
  };

  const handleDownloadArchive = () => {
    if (!archiveFile) return;
    downloadFile(archiveFile);
  };

  const canShowInstructionButton = showInstructionButton && !!manualFile;
  const canShowArchiveButton = !!archiveFile; // можно привязать к showInstructionButton, если нужно

  return (
    <div className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 md:px-5 md:py-5'>
      <div className='flex items-start gap-4 max-md:flex-col'>
        {/* Фото товара */}
        <div className='h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white'>
          {image ? (
            <img src={image} alt={title} className='h-full w-full object-cover' />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-xs text-slate-400'>
              Нет фото
            </div>
          )}
        </div>

        {/* Основная информация */}
        <div className='flex min-w-0 flex-1 flex-col gap-1'>
          <div className='truncate text-[15px] font-semibold text-slate-900 md:text-base'>
            {title}
          </div>

          <div className='mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600'>
            {isNumericSize && <span className='rounded-full bg-white px-2 py-0.5'>{size} г</span>}

            {isHexColor && (
              <span className='inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5'>
                <span
                  className='inline-block h-2.5 w-2.5 rounded-full border border-black/10'
                  style={{ backgroundColor: color }}
                />
                <span className='text-[11px] text-slate-600'>Цвет</span>
              </span>
            )}
          </div>

          {showManagerNote && (
            <p className='mt-3 text-xs leading-relaxed text-slate-600 md:text-sm'>
              По данному заказу с вами свяжется наш сотрудник для уточнения деталей.
            </p>
          )}

          {/* Цена + кнопки */}
          <div className='mt-2 flex flex-col items-start gap-2'>
            <div className='text-base font-semibold text-[#0B4CA1] md:text-lg'>
              {formatPrice(detail.total_price)} {currencySymbol}
            </div>

            {canShowInstructionButton && (
              <Button
                type='button'
                className='flex gap-2 text-base text-white'
                onClick={handleDownloadInstruction}
              >
                Скачать инструкцию
                <DownloadIcon />
              </Button>
            )}

            {canShowArchiveButton && (
              <Button
                type='button'
                variant='outline'
                className='mt-1 flex gap-2 text-sm'
                onClick={handleDownloadArchive}
              >
                Скачать материалы (архив)
                <DownloadIcon className='h-4 w-4' />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailItem;

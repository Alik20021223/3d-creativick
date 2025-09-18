// src/widgets/product/BlockItem.tsx
import { InfoBlockData } from '@entities/products/types';
import VerticalThumbGallery from '@entities/products/ui/image-block';
import InfoBlock from '@entities/products/ui/info-block';

type Img = { src: string; alt?: string };

type Props = {
  images: Img[];
  visible?: number;

  /** данные для InfoBlock */
  infoData: InfoBlockData;

  /** коллбеки */
  onAdd?: () => void;
  onColorChange?: (c: string) => void;
  onWeightChange?: (w: number) => void;

  className?: string;
};

const BlockItem: React.FC<Props> = ({
  images,
  visible = 4,
  infoData,
  onAdd,
  onColorChange,
  onWeightChange,
  className = '',
}) => {
  return (
    <div className={`flex w-full items-start gap-6 max-md:flex-col ${className}`}>
      <div className='w-full md:w-1/2'>
        <VerticalThumbGallery images={images} visible={visible} />
      </div>

      <InfoBlock
        data={infoData}
        onAdd={onAdd}
        onColorChange={onColorChange}
        onWeightChange={onWeightChange}
      />
    </div>
  );
};

export default BlockItem;

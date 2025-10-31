// src/widgets/product/DetailsSeriesContent.tsx
import DetailsCarousel from '@entities/products/ui/details-carousel';
// import { DETAILS_MOCK_10 } from '@utils/mock';
import { ProductCardType } from '@shared/types'; // тип для items

type Props = {
  title?: string;
  items: ProductCardType[];
  className?: string;
};

const DetailsSeriesContent: React.FC<Props> = ({
  title = 'Детали серии',
  items,
  className = '',
}) => {
  return (
    <section className={`container-custom pt-20 pb-25 max-md:py-15 ${className}`}>
      <h1 className='title-text px-10 text-white max-md:pb-10 max-md:text-center 2xl:px-0'>
        {title}
      </h1>
      <DetailsCarousel items={items} />
    </section>
  );
};

export default DetailsSeriesContent;

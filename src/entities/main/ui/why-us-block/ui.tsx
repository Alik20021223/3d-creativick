import { benefitsMock } from '@utils/mock';
import DotImg from '@assets/dot-img.svg';
import BenefitCard from '@shared/components/why-us';

const CARD_CLASSES = [
  'md:mt-8', // 0-я карточка
  'md:mt-28', // 1-я — чуть выше
  'md:mt-8', // 2-я
  'md:mt-28', // 3-я — чуть ниже
];

const WhyUsBlock = () => {
  return (
    <>
      <section className='w-full pt-15'>
        <div className='container-custom flex justify-center'>
          <div className='mb-[52px] flex flex-col items-center gap-5'>
            <h1 className='text-dark-blue text-center text-[28px] leading-[1.1] font-bold md:text-[54px] md:leading-[60px]'>
              Играй, учись
              <br className='md:hidden' />и создавай!
            </h1>

            <div className='bg-pink-active flex h-[63px] w-[355px] -rotate-3 items-center justify-center rounded-[44px] text-[24px] font-bold text-white md:h-[68px] md:w-[443px] md:text-[32px]'>
              вместе с 3D Кретивик
            </div>
          </div>
        </div>
        <div className='relative flex justify-center'>
          <div className='absolute -top-25 max-md:hidden'>
            <img src={DotImg} alt={DotImg} className='' />
          </div>
          <div className='flex gap-5 px-2.5 max-md:flex-col md:px-10 xl:gap-12 2xl:gap-4'>
            {benefitsMock.map((b, i) => (
              <BenefitCard
                key={b.id}
                title={b.title}
                lines={b.lines}
                buttonText={b.buttonText}
                image={b.image}
                accentClassName={b.accentClassName}
                className={CARD_CLASSES[i % CARD_CLASSES.length]} // <- тут
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUsBlock;

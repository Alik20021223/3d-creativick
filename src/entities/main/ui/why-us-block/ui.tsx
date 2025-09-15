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
      <section className='pt-15 w-full'>
        <div className=' container-custom flex justify-center'>
          <div className="mb-[52px] flex flex-col items-center gap-5">
            <h1 className="text-dark-blue font-bold text-center
                 text-[28px] leading-[1.1]
                 md:text-[54px] md:leading-[60px]">
              Играй, учись
              <br className="md:hidden" />
              и создавай!
            </h1>

            <div className='bg-pink-active flex md:h-[68px] h-[63px] md:w-[443px] w-[355px] -rotate-3 items-center justify-center rounded-[44px] md:text-[32px] text-[24px] font-bold text-white'>
              вместе с 3D Кретивик
            </div>
          </div>

        </div>
        <div className='relative flex justify-center'>
          <div className='absolute -top-25 max-md:hidden'>
            <img src={DotImg} alt={DotImg} className='' />
          </div>
          <div className='flex max-md:flex-col 2xl:gap-4 xl:gap-12 gap-5 md:px-10 px-2.5'>
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

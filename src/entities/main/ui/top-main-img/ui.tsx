import bearImg from '@assets/mini-bear-store.png';
import heartImg from '@assets/heart-main.png';
import moscowImg from '@assets/moscow-main.png';
import katushkaImg from '@assets/katushka-main.svg';

const TopMainImg = () => {
  return (
    <div className='relative z-0'>
      <img src={bearImg} alt='bear' className='relative z-5 block h-[1217px] w-[912px]' />

      <img src={heartImg} alt='heart' className='absolute top-0 -left-15 z-0 h-[410px] w-[406px]' />

      <img
        src={moscowImg}
        alt='moscow'
        className='absolute top-[320px] -right-[300px] z-0 h-[780px] w-[780px]'
      />

      <img
        src={katushkaImg}
        alt='machine'
        className='absolute top-70 -left-[320px] z-0 h-[1000px] w-[890px]'
      />
    </div>
  );
};

export default TopMainImg;

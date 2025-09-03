import bearImg from '@assets/bear-top-main.png';
import horseImg from '@assets/main-top-horse.png';
import dinoImg from '@assets/top-main-dinosaur.png';
import machineImg from '@assets/main-top-3d-machine.svg';

const TopMainImg = () => {
  return (
    <>
      <div className='relative'>
        <img src={bearImg} alt='bear' className='relative z-10 block' />

        {/* Лошадь: плавает вверх-вниз (вверх к середине цикла) */}
        <img src={horseImg} alt='horse' className='float absolute top-[90px] -right-[20px] z-0' />

        {/* Дино: в противофазе (вниз к середине цикла) */}
        <img
          src={dinoImg}
          alt='dino'
          className='float-rev absolute -top-[415px] -left-[200px] z-0'
        />

        <img src={machineImg} alt='machine' className='absolute top-70 -left-[320px] z-0' />
      </div>
    </>
  );
};

export default TopMainImg;

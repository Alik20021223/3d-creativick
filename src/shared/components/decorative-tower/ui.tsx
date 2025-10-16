import buildingImg from '@assets/building.svg';

export default function DecorativeTower() {
  return (
    <img
      src={buildingImg}
      alt='' // декоративно
      aria-hidden='true' // скрыть для скринридеров
      className='/* позади всего */ pointer-events-none fixed right-0 bottom-0 -z-10 w-[780px] max-w-[60vw] select-none'
    />
  );
}

import bearImg from '@assets/mini-bear-store.png';
import heartImg from '@assets/heart-main.png';
import moscowImg from '@assets/moscow-main.png';
import katushkaImg from '@assets/katushka-main.png';

const TopMainImg = () => {
  return (
    <div className="relative z-0">
      <img src={bearImg} alt="bear" className="relative block w-[912px] h-[1217px] z-5" />

      <img src={heartImg} alt="heart" className="absolute top-15 left-5 w-[306px] h-[310px] z-0" />

      <img
        src={moscowImg}
        alt="moscow"
        className="absolute top-[320px] -right-[300px] w-[780px] h-[780px] z-0"
      />

      <img
        src={katushkaImg}
        alt="machine"
        className="absolute top-70 -left-[320px] w-[890px] h-[1000px] z-0"
      />
    </div>
  );
};


export default TopMainImg;

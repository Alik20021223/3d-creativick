import ExclusiveCta from '@entities/main/ui/exclusive-cta';
import ExclusiveBlock from '@entities/main/ui/exclusive-content';
import WhyUsBlock from '@entities/main/ui/why-us-block/ui';
import OurActionsContent from '@entities/main/ui/our-actions';

const ExclusiveContent = () => {
  return (
    <>
      <div className='relative z-5 mt-[180px] grid w-screen place-items-center'>
        <div className='max-w-[1540px] pt-20 pb-10'>
          <WhyUsBlock />
          <ExclusiveBlock />
          <ExclusiveCta href='#' />
          <OurActionsContent />
        </div>
      </div>
    </>
  );
};

export default ExclusiveContent;

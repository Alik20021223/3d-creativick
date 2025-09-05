import ExclusiveCta from '@entities/main/ui/exclusive-cta';
import ExclusiveBlock from '@entities/main/ui/exclusive-content';
import WhyUsBlock from '@entities/main/ui/why-us-block/ui';
import OurActionsContent from '@entities/main/ui/our-actions';

const ExclusiveContent = () => {
  return (
    <>
      <div className='relative z-5 md:grid md:w-screen md:place-items-center'>
        <WhyUsBlock />
        <div className='max-w-[1540px] pb-10'>
          <ExclusiveBlock />
          <ExclusiveCta href='#' />
          <OurActionsContent />
        </div>
      </div>
    </>
  );
};

export default ExclusiveContent;

import ExclusiveCta from '@entities/main/ui/exclusive-cta';
import ExclusiveBlock from '@entities/main/ui/exclusive-content';
import WhyUsBlock from '@entities/main/ui/why-us-block/ui';
import OurActionsContent from '@entities/main/ui/our-actions';

const ExclusiveContent = () => {
  return (
    <>
      <div className='relative z-5'>
        <WhyUsBlock />
        <div className='w-full  md:grid md:w-full md:place-items-center'>
          <div className='container-custom pb-10 max-2xl:mx-0! px-2.5 md:px-10'>
            <ExclusiveBlock />
            <ExclusiveCta href='#' />
            <OurActionsContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExclusiveContent;

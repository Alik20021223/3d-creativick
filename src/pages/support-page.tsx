import MainContent from '@widgets/support-content/main/main-content';
import BottomFormContent from '@widgets/support-content/main/bottom-form-content';
import TopMainContent from '@widgets/support-content/main/top-main-content';

const SupportPage = () => {
  return (
    <>
      <section className='flex flex-col gap-15 pt-25 md:gap-25'>
        <TopMainContent />
        <div className='flex-grow px-2.5 md:px-10'>
          <MainContent />
        </div>
        <BottomFormContent />
      </section>
    </>
  );
};

export default SupportPage;

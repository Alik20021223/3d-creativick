import TopMainBlock from '@entities/support/ui/top-main';

const TopMainContent = () => {
  return (
    <>
      <section className='container-custom px-2.5 md:px-41'>
        <div className='flex gap-4 max-md:w-full max-md:flex-col'>
          <TopMainBlock
            subtitle='Программа обеспечения'
            title='SLICER.ZIP / 100 МБ'
            description='Слайсер «3D Креативик» – это ваш помощник в мире 3D-печати. Интуитивно понятное программное обеспечение, которое поможет вам подготовить 3D-модель к печати. 
Просто скачайте, установите и начните печатать!'
          />
          <TopMainBlock
            subtitle='Инструкции'
            title='INSTR.PDF / 10 МБ'
            description='Здесь вы можете скачать подробное руководство пользователя к набору для творчества «3D Креативик». В ней вы найдете ответы на все ваши вопросы по настройке, эксплуатации и обслуживанию.'
          />
        </div>
      </section>
    </>
  );
};

export default TopMainContent;

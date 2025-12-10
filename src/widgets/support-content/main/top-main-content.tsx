// src/entities/support/ui/top-main-content.tsx
import TopMainBlock from '@entities/support/ui/top-main';
import { useSharedStore } from '@/shared/store';

const TopMainContent = () => {
  const appSettings = useSharedStore((s) => s.appSettings);

  const slicerUrl = appSettings.find((s) => s.key === 'slicer')?.value ?? undefined;
  const instructionUrl = appSettings.find((s) => s.key === 'user_instruction')?.value ?? undefined;

  return (
    <section id='instructions' className='container-custom scroll-mt-[120px] px-2.5 md:px-41'>
      <div className='flex gap-4 max-md:w-full max-md:flex-col'>
        <TopMainBlock
          subtitle='Программное обеспечение'
          title='SLICER.ZIP / 100 МБ'
          description={`Слайсер «3D Креативик» – это ваш помощник в мире 3D-печати. Интуитивно понятное программное обеспечение, которое поможет вам подготовить 3D-модель к печати. 
Просто скачайте, установите и начните печатать!`}
          downloadUrl={slicerUrl}
        />
        <TopMainBlock
          subtitle='Инструкция'
          title='INSTR.PDF / 10 МБ'
          description='Здесь вы можете скачать подробное руководство пользователя к набору для творчества «3D Креативик». В нем вы найдете ответы на все вопросы по настройке, эксплуатации и обслуживанию.'
          downloadUrl={instructionUrl}
        />
      </div>
    </section>
  );
};

export default TopMainContent;

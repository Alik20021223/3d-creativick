import ContactForm from '@entities/support/ui/contact-form';
import { Mail, MapPin, Phone } from 'lucide-react';
// import imgSupportInfo from '@assets/support-info.svg';

const BottomFormContent = () => {
  return (
    <section id='have-questions' className='rounded-t-[80px] bg-white'>
      <div className='container-custom flex w-full gap-10 px-2.5 py-15 max-lg:flex-col md:px-10 md:py-30'>
        <div className='flex w-1/2 flex-col gap-10 max-lg:w-full'>
          <div className='w-full'>
            <span className='text-secondary-gray text-[22px] leading-[130%]'>Наши контакты</span>
            <h1 className='title-text mt-2 mb-6'>Остались вопросы?</h1>
            <p className='description-text'>
              Не стесняйтесь спрашивать – мы с удовольствием вам поможем!
            </p>
          </div>
          <div className='bg-contact-form w-full flex-grow rounded-[22px] px-2.5 pt-2.5'>
            <div className='w-full space-y-6 rounded-[12px] bg-white p-10'>
              {/* Email */}
              <div
                onClick={() => window.open('mailto:info@3dkreativik.ru', '_blank')}
                className='flex cursor-pointer items-center space-x-2 transition hover:opacity-80'
              >
                <Mail className='text-dark-blue flex-shrink-0 stroke-2' />
                <span className='text-secondary-text text-[22px] font-bold select-none'>
                  info@3dkreativik.ru
                </span>
              </div>

              {/* Phone */}
              <div
                onClick={() => window.open('tel:+74959888282')}
                className='flex cursor-pointer items-center space-x-2 transition hover:opacity-80'
              >
                <Phone className='text-dark-blue flex-shrink-0 stroke-2' />
                <span className='text-secondary-text text-[22px] font-bold select-none'>
                  8 (495) 988-82-82
                </span>
              </div>

              {/* Address */}
              <div
                onClick={() =>
                  window.open(
                    'https://yandex.ru/maps/?text=115409%2C%20Москва%2C%20Каширское%20шоссе%2C%2049',
                    '_blank',
                  )
                }
                className='flex cursor-pointer items-start space-x-2 transition hover:opacity-80'
              >
                <MapPin className='text-dark-blue mt-1 flex-shrink-0 stroke-2' />
                <span className='text-secondary-text text-[22px] leading-[130%] font-bold break-words select-none'>
                  115409, г. Москва, вн. тер. г. муниципальный округ Москворечье-Сабурово, Каширское
                  шоссе, д.49, этаж 10, помещ. XXIX, комн. 5
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА — ФОРМА */}
        <div className='flex w-1/2 max-lg:w-full'>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default BottomFormContent;

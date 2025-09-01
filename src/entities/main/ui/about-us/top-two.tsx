// src/widgets/top-two/ui.tsx
import React from 'react';

type TopTwoProps = {
  imgPrinter?: string; // розовый 3D-принтер
  imgPhone?: string; // розовый "смартфон"
  imgReels?: string; // катушки филамента
  imgGear?: string; // розовая шестерня
};

const TopTwo: React.FC<TopTwoProps> = ({ imgPrinter, imgPhone, imgReels, imgGear }) => {
  return (
    <section className='relative mx-auto w-full max-w-[1540px] px-[38px] py-12 md:py-16'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
        {/* A) 3D-принтер (розовая карточка) */}
        <article className='relative overflow-hidden rounded-3xl bg-[#FF5BA6] text-white md:col-span-6'>
          <div className='relative z-10 grid grid-cols-12 gap-4 p-6 md:p-8'>
            <header className='col-span-12 md:col-span-6'>
              <h3 className='text-2xl font-bold md:text-3xl'>3D-принтер</h3>
              <ul className='mt-4 space-y-2 text-sm md:text-base'>
                <li>— Простой и удобный</li>
                <li>— Безопасный и компактный</li>
                <li>— Красочный и бесшумный</li>
                <li>— Стабильный и эффективный</li>
              </ul>
            </header>

            {/* Декор: принтер */}
            <div className='relative col-span-12 md:col-span-6'>
              {imgPrinter ? (
                <img
                  src={imgPrinter}
                  alt=''
                  className='pointer-events-none select-none md:mt-2 md:-mr-6 md:translate-x-2'
                />
              ) : null}
            </div>
          </div>

          {/* Значок A (опционально) */}
          <div className='pointer-events-none absolute top-4 right-4 z-20 hidden h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold select-none md:flex'>
            A
          </div>

          {/* Мягкая тень/сияние */}
          <div className='pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/20 blur-3xl' />
        </article>

        {/* B) Креативик.Store (синяя карточка) */}
        <article className='relative overflow-hidden rounded-3xl bg-[#1177CF] text-white md:col-span-6'>
          <div className='relative z-10 grid grid-cols-12 gap-4 p-6 md:p-8'>
            <header className='col-span-12 md:col-span-7'>
              <h3 className='text-2xl font-bold md:text-3xl'>Креативик.Store</h3>
              <ul className='mt-4 space-y-2 text-sm md:text-base'>
                <li>— Онлайн покупка</li>
                <li>— Эксклюзивные 3D-модели</li>
                <li>— Новые серии</li>
                <li>— Подписка</li>
              </ul>
            </header>

            {/* Декор: телефон + «брызги» */}
            <div className='relative col-span-12 md:col-span-5'>
              {imgPhone ? (
                <img
                  src={imgPhone}
                  alt=''
                  className='float-slow pointer-events-none mx-auto select-none md:mt-2 md:-mr-2'
                />
              ) : null}
              {/* брызги */}
              <div className='pointer-events-none absolute top-6 -left-3 h-2 w-8 rounded-full bg-[#FF5BA6]' />
              <div className='pointer-events-none absolute top-12 left-2 h-2 w-5 rounded-full bg-[#FF5BA6]' />
              <div className='pointer-events-none absolute top-4 left-4 h-2 w-4 rounded-full bg-[#FF5BA6]' />
            </div>
          </div>
        </article>

        {/* C) Материалы */}
        <article className='relative overflow-hidden rounded-3xl bg-[#1177CF] text-white md:col-span-4'>
          <div className='relative z-10 grid grid-cols-12 gap-4 p-6 md:p-8'>
            <header className='col-span-12'>
              <h3 className='text-xl font-semibold md:text-2xl'>Материалы</h3>
            </header>

            <div className='col-span-7'>
              <ul className='mt-4 space-y-2 text-sm md:text-base'>
                <li>— Эксклюзивные филаменты для 3D-печати</li>
                <li>— Безопасный и биоразлагаемый материал</li>
              </ul>
            </div>

            <div className='relative col-span-5 flex items-end justify-end'>
              {imgReels ? (
                <img src={imgReels} alt='' className='pointer-events-none select-none' />
              ) : null}
            </div>
          </div>
        </article>

        {/* D) Сервис */}
        <article className='relative overflow-hidden rounded-3xl bg-[#1177CF] text-white md:col-span-4'>
          <div className='relative z-10 p-6 md:p-8'>
            <h3 className='text-xl font-semibold md:text-2xl'>Сервис</h3>
            <ul className='mt-4 space-y-2 text-sm md:text-base'>
              <li>— Поддержка</li>
              <li>— Ремонт</li>
              <li>— Гарантия</li>
              <li>— Запчасти</li>
            </ul>
          </div>
        </article>

        {/* E) Комплектация */}
        <article className='relative overflow-hidden rounded-3xl bg-[#1177CF] text-white md:col-span-4'>
          <div className='relative z-10 p-6 md:p-8'>
            <h3 className='text-xl font-semibold md:text-2xl'>Комплектация</h3>
            <ul className='mt-4 grid grid-cols-1 gap-2 text-sm md:text-base'>
              <li>— 3D-принтер</li>
              <li>— Филамент 250 г</li>
              <li>— Набор инструментов</li>
              <li>— USB-накопитель</li>
              <li>— Держатель катушки филамента</li>
              <li>— Комплект проводов</li>
              <li>— Бумажное руководство пользователя</li>
            </ul>
          </div>

          {/* Декор: розовая шестерня */}
          {imgGear ? (
            <img
              src={imgGear}
              alt=''
              className='pointer-events-none absolute -right-4 -bottom-6 z-0 w-36 select-none md:w-44'
            />
          ) : null}
        </article>
      </div>
    </section>
  );
};

export default TopTwo;

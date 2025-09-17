// src/widgets/product/InfoBlock.tsx
import { useSharedStore } from '@shared/store';
import ButtonSave from '@feature/button-save';
import { Button } from '@shadcn/button';
import { AlarmClock, Atom, FileImage } from 'lucide-react';
import React from 'react';
import TextInstructionBlock from './TextInstructionBlock';

type Badge = { icon: React.ReactNode; text: string };
type Props = {
    title?: string;
    badges?: Badge[];
    description?: string;
    price?: number;
    oldPrice?: number;
    onAdd?: () => void;
};

const InfoBlock: React.FC<Props> = ({
    title = 'Космический флот',
    badges = [
        { icon: <FileImage className='size-5' />, text: 'Размер файла 10МБ' },
        { icon: <AlarmClock className='size-5' />, text: 'Время печати серии 16 часов' },
        { icon: <Atom className='size-5' />, text: 'Количество требуемого материала 500 грамм' },
    ],
    description = `Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.`,
    price = 1900,
    oldPrice = 3900,
    onAdd,
}) => {


    const { isSave, setSave } = useSharedStore()

    return (
        <>
            <div className='flex flex-col w-1/2'>
                <section className="relative rounded-[28px] bg-white p-6 md:p-8 shadow-card-info ">
                    <h2 className="text-2xl md:text-[28px] font-semibold leading-tight text-slate-900">
                        {title}
                    </h2>

                    {/* Бейджи */}
                    <div className="mt-4 flex flex-wrap gap-3">
                        {badges.map((b, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-2 rounded-[8px] bg-gradient-badge text-white px-3 py-2 text-xs md:text-sm flex items-center"
                            >
                                {b.icon}
                                <span className="text-sm">{b.text}</span>
                            </span>
                        ))}
                    </div>

                    {/* Описание */}
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-secondary-text">
                        {description}
                    </p>

                    {/* Цена + кнопки */}
                    <div className="mt-5 flex flex-col md:justify-between gap-4">
                        <div className="flex items-end gap-3">
                            <div className="text-[34px] md:text-[38px] font-extrabold text-primary-active leading-none">
                                {price.toLocaleString('ru-RU')} <span className="text-[22px] font-bold">₽</span>
                            </div>
                            <div className="mb-1 text-slate-400 line-through italic">
                                {oldPrice.toLocaleString('ru-RU')}₽
                            </div>
                        </div>

                        <div className="flex items-center w-full h-[56px]">
                            <Button
                                onClick={onAdd}
                                className="w-full flex-1 rounded-full h-full text-white"
                            >
                                В корзину
                            </Button>

                            <ButtonSave onSave={() => setSave(!isSave)} status={isSave} />
                        </div>
                    </div>
                </section>
                <TextInstructionBlock />
            </div>
        </>
    );
};

export default InfoBlock;


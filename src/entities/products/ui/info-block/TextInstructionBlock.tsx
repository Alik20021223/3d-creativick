// src/widgets/product/TextInstructionBlock.tsx
import { Button } from "@shadcn/button";
import { ChevronRight } from "lucide-react";
import React from "react";

type Props = {
    title?: string;
    items?: string[];
    ctaText?: string;
    onOpen?: () => void;
    href?: string; // если нужно как ссылка
};

const TextInstructionBlock: React.FC<Props> = ({
    title = "Текстовая инструкция",
    items = [
        "Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.",
        "Приятно, граждане, наблюдать, как акционеры крупнейших компаний преданы социально-демократической анафеме. Современные технологии достигли такого уровня, что сплочённость команды профессионалов обеспечивает актуальность поставленных обществом задач.",
    ],
    ctaText = "Читать инструкцию",
    onOpen,
}) => {

    return (
        <section className="mt-10">
            <h3 className="text-xl md:text-[22px] font-bold leading-tight text-secondary-text">
                {title}
            </h3>

            <ol className="mt-4 list-decimal space-y-5.5 pl-6 text-sm leading-relaxed text-secondary-text">
                {items.map((t, i) => (
                    <li key={i}>{t}</li>
                ))}
            </ol>

            <div className="mt-5.5">
                <Button
                    onClick={onOpen}
                    className="inline-flex h-[56px] items-center gap-2 rounded-full w-[300px] text-white"
                >
                    <span className="text-lage md:text-[22px] leading-[130%]">{ctaText}</span>
                    <ChevronRight />
                </Button>
            </div>
        </section>
    );
};

export default TextInstructionBlock;


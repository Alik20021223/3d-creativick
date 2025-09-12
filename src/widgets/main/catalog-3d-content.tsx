import CatalogGrid from "@entities/main/ui/catolog-items/ui";
import { CATEGORIES } from "@utils/mock";
import { useRef, useState } from "react";

const Catalog3dContent = () => {
    const [active, setActive] = useState<string>("Категория 3");
    const topRef = useRef<HTMLDivElement | null>(null)

    return (
        <section ref={topRef} className="relative bg-white">
            {/* градиент фона */}
            <div className="absolute inset-0 bg-gradient-to-br rounded-t-[80px] from-fuchsia-500 via-indigo-500 to-blue-600" />
            <div className="relative container-custom z-10 w-full md:px-10 md:py-20">
                {/* заголовок и подзаголовок */}
                <div className="text-center space-y-4 flex items-center flex-col">
                    <h1 className="title-text text-white">Каталог 3D-моделей</h1>

                    <p className="max-w-[902px] text-md text-white md:text-lg">
                        В частности, разбавленное изрядной долей эмпатии, рациональное мышление
                        предоставляет широкие возможности для экспериментов, поражающих их по
                        своей масштабности и грандиозности
                    </p>
                </div>

                {/* чипы-категории */}
                <div className="mx-auto mt-6 flex max-w-[902px] flex-wrap items-center justify-center gap-3 md:mt-8 md:gap-4">
                    {CATEGORIES.map((name) => {
                        const isActive = name === active;
                        return (
                            <button
                                key={name}
                                onClick={() => setActive(name)}
                                className={[
                                    "select-none rounded-[12px] md:px-5.5 md:py-[8.5px] text-sm  md:text-lg leading-[130%] cursor-pointer",
                                    "transition-colors duration-200",
                                    // активная — как в макете (синяя)
                                    isActive
                                        ? "bg-primary-active text-white"
                                        : " bg-white text-secondary-text",
                                ].join(" ")}
                            >
                                {name}
                            </button>
                        );
                    })}
                </div>



                <CatalogGrid topRef={topRef} />
            </div>
        </section>
    );
};

export default Catalog3dContent;

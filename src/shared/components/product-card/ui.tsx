// ProductCard.tsx
import { JSX, useState } from "react";
import { ChevronRight, Heart } from "lucide-react";
import ColorButton from "@shared/components/color-button";
import { Link } from "react-router-dom";
import { colors } from "@utils/mock";
import { ProductCardType } from "@shared/types";
import ProductCarouselImage from "./product-carousel";

interface ProductCardProps {
    data: ProductCardType;
}

export default function ProductCard({ data }: ProductCardProps): JSX.Element {
    const [color, setColor] = useState<string>(data?.activeColor ?? colors[2].value); // "yellow" по умолчанию
    const [isSave, setSave] = useState<boolean>(false)

    const { price } = data

    return (
        <div className="relative max-w-md rounded-[60px] bg-secondary-white shadow-lg overflow-hidden">
            {/* Верх: картинка и теги */}
            <ProductCarouselImage images={data.image} category={data.category} />

            {/* Контент */}
            <div className="p-5.5 pt-0">
                <h2 className="text-2xl font-bold">{data.title ?? "Принтер голубой"}</h2>

                {/* Цвета */}
                {data.activeColor &&
                    <div className="mt-3">
                        <p className="text-gray-500 text-sm">Выберите цвет:</p>
                        <div className="flex gap-2 mt-2">
                            {colors.map((c) => (
                                <ColorButton
                                    key={c.value}                // <- key здесь
                                    data={c}
                                    activeColor={color}
                                    setNewColor={setColor}
                                />
                            ))}
                        </div>
                    </div>
                }

                {data.description &&
                    <div className="mt-3">
                        <p className="description-text">{data.description}</p>
                    </div>
                }

                {/* Цена */}
                <div className="flex items-center justify-between mt-5">
                    <Link to="#" className="text-sm flex text-secondary-text h-4 items-center hover:underline">
                        Подробнее <ChevronRight className="w-4 h-4" />
                    </Link>
                    <div className="text-right">
                        {price.last_price && <p className="text-gray-400 line-through">{price.last_price} ₽</p>}
                        <p className="text-2xl font-bold text-sky-600">{price.new_price} ₽</p>
                    </div>
                </div>

                {/* Кнопки */}
                <div className="mt-5 flex items-center justify-between">
                    <button className="flex-1 bg-sky-600 text-white text-lg font-semibold py-3 rounded-full hover:bg-sky-700 transition">
                        В корзину
                    </button>
                    <button onClick={() => setSave(!isSave)} className="ml-3 p-3 border border-primary rounded-full text-primary hover:bg-sky-50">
                        <Heart className={`w-6 h-6 ${isSave && 'fill-primary'}`} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// components/faq-card.tsx
import { ArrowUpRight } from "lucide-react";
import ImgDefault from "@assets/bg-catalog.png";
import { useNavigate } from "react-router-dom";

type FAQCardProps = {
    title: string;
    img?: string;
    href?: string;
};

const FAQCard: React.FC<FAQCardProps> = ({ title, img, href = 'support-1' }) => {

    const navigate = useNavigate()

    return (
        <article onClick={() => navigate(href)} className="group button-shadow-blue relative rounded-[60px] bg-secondary-white shadow-xl overflow-hidden transition-all px-2.5 pt-2.5 cursor-pointer">
            {/* превью */}
            <div className="relative h-[310px] rounded-[60px] overflow-hidden">
                <img
                    src={img ?? ImgDefault}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>

            {/* контент */}
            <div className="flex items-start justify-between gap-4 p-5">
                <h3 className="flex-1 break-words text-[18px] font-semibold leading-snug text-secondary-text">
                    {title}
                </h3>

                <span className="shrink-0 hidden md:grid h-[59px] w-[59px] place-items-center rounded-full border-2 border-primary-active text-primary-active transition group-hover:text-primary group-hover:border-primary">
                    <ArrowUpRight className="size-10" />
                </span>
            </div>


            {/* мягкая подсветка снизу слева как на скрине */}
            <div className="pointer-events-none absolute -bottom-5 -left-5 h-16 w-16 rounded-3xl bg-[#cde7ff] blur-2xl opacity-60" />
        </article>
    );
};

export default FAQCard

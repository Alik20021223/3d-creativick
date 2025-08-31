// PrevButton.tsx
import { ChevronLeft } from "lucide-react";
import { SwiperButtonProps } from "@shared/types";
import { Button } from "@shadcn/button";

const PrevButton = ({ swiperRef, className = "" }: SwiperButtonProps & { className?: string }) => (
    <Button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`grid place-items-center w-10 h-10 rounded-full
                bg-transparent outline-2 outline-white text-white hover:outline-primary-active hover:text-primary-active hover:bg-transparent  ${className}`}
        aria-label="Prev"
    >
        <ChevronLeft className="w-5 h-5" />
    </Button>
);
export default PrevButton;

// NextButton.tsx — аналогично с ChevronRight

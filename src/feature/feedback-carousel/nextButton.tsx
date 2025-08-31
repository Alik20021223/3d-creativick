import { Button } from "@shadcn/button";
import { SwiperButtonProps } from "@shared/types";
import { ChevronRight } from "lucide-react";

const NextButton = ({ swiperRef, className = "" }: SwiperButtonProps & { className?: string }) => {
    return (
        <Button
            variant="outline"
            onClick={() => swiperRef.current?.slideNext()}
            className={`grid place-items-center w-10 h-10 rounded-full
                ${className}`}
            aria-label="Next"
        >
            <ChevronRight className="w-5 h-5" />
        </Button>
    );
};

export default NextButton;
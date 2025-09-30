// EmptyState.tsx
import React from "react";
import { Button } from "@shared/shadcn/button";
import { ChevronRight } from "lucide-react";

type EmptyStateProps = {
    // контент
    title: string;
    description?: string;

    // картинка
    imageSrc?: string;
    imageAlt?: string;
    imageClassName?: string;

    // кнопка действия
    ctaText?: string;
    onCtaClick?: () => void;
    // либо ссылка, если нужно перейти
    to?: string; // если используешь react-router-dom
    LinkComponent?: React.ComponentType<any>; // передай Link из react-router/next

    // иконка справа у кнопки
    ctaIcon?: React.ReactNode;

    // оформление/верстка
    align?: "left" | "center"; // расположение контента
    wrapperClassName?: string; // кастомизация внешнего контейнера
    cardClassName?: string;    // кастомизация белой карточки

    // дополнительный слот (например, вторые кнопки/подсказки)
    children?: React.ReactNode;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    imageSrc,
    imageAlt = "empty-state",
    imageClassName = "w-[252px] h-[378px]",
    ctaText,
    onCtaClick,
    to,
    LinkComponent,
    ctaIcon = <ChevronRight />,
    align = "left",
    wrapperClassName = "",
    cardClassName = "",
    children,
}) => {
    const isCentered = align === "center";

    const Content = (
        <div className={`bg-secondary-white w-full md:p-10 p-5 rounded-[20px] space-y-[22px] ${cardClassName}`}>
            <h1 className={`title-text ${isCentered ? "text-center" : ""}`}>{title}</h1>
            {description && (
                <p className={`description-text max-w-[700px] ${isCentered ? "mx-auto text-center" : ""}`}>{description}</p>
            )}

            {(ctaText || children) && (
                <div className={`${isCentered ? "mx-auto" : ""} md:w-[157px] w-full flex flex-col gap-3`}>
                    {ctaText && (
                        <>
                            {to && LinkComponent ? (
                                // вариант: кнопка-ссылка через переданный Link
                                <Button className="h-12 text-white text-base w-full" asChild>
                                    <LinkComponent to={to}>
                                        {ctaText} {ctaIcon}
                                    </LinkComponent>
                                </Button>
                            ) : (
                                // вариант: обычная кнопка с onClick
                                <Button className="h-12 text-white text-base w-full" onClick={onCtaClick}>
                                    {ctaText} {ctaIcon}
                                </Button>
                            )}
                        </>
                    )}
                    {children /* любые дополнительные экшены/подсказки */}
                </div>
            )}
        </div>
    );

    return (
        <div
            className={
                `flex max-md:flex-col md:px-36 px-2.5 py-15 max-md:py-5 gap-10 w-full items-center ` +
                (isCentered ? "justify-center" : "") +
                ` ${wrapperClassName}`
            }
        >
            {imageSrc && (
                <div className={`flex ${isCentered ? "w-full justify-center" : "max-md:w-full max-md:justify-center"}`}>
                    <img src={imageSrc} alt={imageAlt} className={imageClassName} />
                </div>
            )}

            <div className={imageSrc ? "md:w-[calc(100%-252px)] w-full" : "w-full"}>
                {Content}
            </div>
        </div>
    );
};

export default EmptyState;

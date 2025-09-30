import { getLevelIndex } from "@utils/constant";
import { LoyaltyCardProps } from "@entities/profile/types";
import { LEVELS } from "@entities/profile/mock";

export function buildLoyaltyCard(currentTotal: number): LoyaltyCardProps {
    const i = getLevelIndex(currentTotal);
    const level = LEVELS[i];
    const next = LEVELS[i + 1]; // undefined, если максимум

    console.log(next);
    

    return {
        badgeTitle: "3D",
        title: level.title,
        perks: level.perks,
        art: level.art,              // строка с src (см. ниже патч рендера)
        current: currentTotal,
        toNext: next ? Math.max(0, next.threshold - currentTotal) : 0,
        nextThreshold: next ? next.threshold : level.threshold,
        maxReached: !next,
        nextLevelName: next?.title,
        nextLevelDiscount: level?.nextDiscountLabel,
        // правила можно оставить дефолтными в компоненте
    };
}

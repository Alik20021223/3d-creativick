import { getRandomItems } from "@utils/constant";
import FAQCard from "@entities/support/ui/faq-card";
import { SupportCards } from "@utils/mock";
import React from "react";



export const SameArticle = () => {
    const allItems = React.useMemo(
        () => Object.values(SupportCards).flat(),
        []
    );

    const random3 = React.useMemo(() => getRandomItems(allItems, 3), [allItems]);

    return (
        <article className="grid xl:grid-cols-3 grid-cols-1 gap-4 mt-6">
            {random3.map((title, i) => (
                <FAQCard key={i} title={title} />
            ))}
        </article>
    );
};



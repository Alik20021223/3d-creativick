
import BlockItem from "@widgets/product-series/block-item-content";
import BottomContent from "@widgets/product-series/bottom-content";
import DetailsSeriesContent from "@widgets/product-series/details-seria-content";
import { PRODUCT_PATH_MAP } from "@entities/products/constant/path-map";
import DynamicBreadcrumbs from "@feature/dynamicBreadcrump"

const PATH_MAP = {
    '*': PRODUCT_PATH_MAP,
};

const ItemPage = () => {



    return (
        <>
            <section className="bg-white pt-10">
                <div className="px-10">
                    <DynamicBreadcrumbs pathMap={PATH_MAP} />

                    <BlockItem />
                </div>
                <div className="bg-catalog h-full rounded-t-[80px] mt-15">
                    <DetailsSeriesContent />
                    <div className="h-full rounded-t-[80px] bg-white z-0">
                        <BottomContent />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ItemPage
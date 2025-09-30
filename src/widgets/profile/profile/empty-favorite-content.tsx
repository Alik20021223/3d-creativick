import EmptyState from "@feature/empty-content"
import OrderEmptyImg from '@assets/empty-loop.svg'
import { Link } from "react-router-dom"

const EmptyFavoriteContent = () => {
    return (
        <>
            <EmptyState
                title="Здесь пока ещё ничего нет"
                description="В частности, разбавленное изрядной долей эмпатии, рациональное мышление предоставляет широкие возможности для экспериментов, поражающих по своей масштабности и грандиозности."
                imageSrc={OrderEmptyImg}
                wrapperClassName="md:px-0!"
                imageAlt="empty-favorites"
                ctaText="В каталог"
                to="/catalog"
                LinkComponent={Link}
                align="left"
            />
        </>
    )
}

export default EmptyFavoriteContent
import VerticalThumbGallery from "@entities/products/ui/image-block"
import InfoBlock from "@entities/products/ui/info-block"
import KatushkaImg from '@assets/katushka-card.png'
import CosmoPersom from '@assets/cosmo-person.png'
import PrinterCard from '@assets/test-photo.png'

const BlockItem = () => {

    const images = [
        { src: KatushkaImg, alt: 'Катушка жёлтая — вид 1' },
        { src: CosmoPersom, alt: 'Катушка жёлтая — вид 2' },
        { src: PrinterCard, alt: 'Катушка жёлтая — вид 3' },
        { src: KatushkaImg, alt: 'Катушка жёлтая — вид 4' },
        { src: CosmoPersom, alt: 'Катушка жёлтая — вид 5' },
    ];


    return (
        <>
            <div className="w-full flex items-start gap-6">
                <div className="w-1/2">
                    <VerticalThumbGallery images={images} visible={4} height={620} />
                </div>
                <InfoBlock />
            </div>
        </>
    )
}

export default BlockItem
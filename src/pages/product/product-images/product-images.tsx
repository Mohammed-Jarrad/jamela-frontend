import { cn } from '@/lib/utils'
import { ImageProps, ProductProps } from '@/types'
import { useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ImageMagnifier from './image-magnifier'

type Props = {
    product: ProductProps
}

const ProductImages: React.FC<Props> = ({ product }) => {
    const images: ImageProps[] = [product.mainImage!, ...product.subImages!]
    const [currentImage, setCurrentImage] = useState(images[0])
    function handleImageClick(index: number) {
        setCurrentImage(images[index])
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="space-y-4">
            <ImageMagnifier imageUrl={currentImage.secure_url} />
            <div className={cn(images.length <= 1 && 'hidden')}>
                <Swiper
                    spaceBetween={10}
                    slidesPerView="auto"
                    className="max-w-[500px] px-6 py-2"
                    modules={[Navigation]}
                    navigation={true}
                    centerInsufficientSlides
                >
                    {images.map((image, index) => (
                        <SwiperSlide
                            key={image.secure_url}
                            className="h-[250px] w-[150px] cursor-pointer"
                        >
                            <img
                                src={image.secure_url}
                                alt={image.public_id!}
                                loading="lazy"
                                className={cn(
                                    'size-full rounded-3xl object-cover shadow',
                                    currentImage.secure_url === image.secure_url &&
                                        'p-1 ring-2 ring-primary/80'
                                )}
                                onClick={() => handleImageClick(index)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default ProductImages

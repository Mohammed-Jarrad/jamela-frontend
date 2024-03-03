import { cn } from '@/lib/utils'
import { ImageProps, ProductProps } from '@/types'
import { Box } from '@radix-ui/themes'
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
        <Box className="flex-1">
            <div className="flex flex-col items-center gap-2">
                <ImageMagnifier imageUrl={currentImage.secure_url} />
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={10}
                    className="w-full px-6"
                    modules={[Navigation]}
                    navigation={true}
                    centerInsufficientSlides
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={image.secure_url} className="h-[200px] w-[150px] cursor-pointer">
                            <img
                                src={image.secure_url}
                                alt={image.public_id!}
                                loading="lazy"
                                className={cn(
                                    'h-full w-full rounded-3xl object-cover shadow',
                                    currentImage.secure_url === image.secure_url && 'border border-primary/80 p-2'
                                )}
                                onClick={() => handleImageClick(index)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Box>
    )
}

export default ProductImages

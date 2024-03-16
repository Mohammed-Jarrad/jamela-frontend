import { ProductProps } from '@/types'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Autoplay, EffectFade, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
interface Props {
    product: ProductProps
}
const ProductCardImages: React.FC<Props> = ({ product }) => {
    const { mainImage, subImages } = product
    const images = [mainImage, ...subImages!]
    const [isHovered, setIsHovered] = React.useState<boolean>(false)
    const swiperInstance = React.useRef<SwiperRef>(null)
    useEffect(() => {
        if (isHovered) {
            swiperInstance.current?.swiper.autoplay.start()
        } else {
            swiperInstance.current?.swiper.autoplay.stop()
        }
    }, [isHovered])
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative rounded-xl"
        >
            {product.stock! == 0 && (
                <div
                    className={`pointer-events-none absolute inset-0 z-30 rounded-xl bg-black/30`}
                />
            )}
            <Swiper
                ref={swiperInstance}
                speed={1000}
                autoplay={{ delay: 1000 }}
                modules={[Autoplay, Scrollbar, EffectFade]}
                slidesPerView={'auto'}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                scrollbar={isHovered ? { draggable: true, snapOnRelease: true } : false}
            >
                {images?.map((image) => (
                    <SwiperSlide
                        key={image?.public_id}
                        className="w-full overflow-hidden rounded-xl"
                    >
                        <Link
                            to={`/product/${product.slug}`}
                            className="aspect-h-3 aspect-w-2 w-full"
                        >
                            <motion.img
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                src={image?.secure_url}
                                alt={product.name}
                                loading="lazy"
                                className=" cursor-pointer !rounded-xl object-cover"
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProductCardImages

import { NextElement, PrevElement } from '@/components/swiper-navigation'
import { SubcategoryProps } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {
    subcategories: SubcategoryProps[]
}

const SubcategoriesSlider: React.FC<Props> = ({ subcategories }) => {
    subcategories = [...subcategories, ...subcategories, ...subcategories, ...subcategories]
    const isMatch = subcategories.length > 4
    
    if (!subcategories.length) return null
    return (
        <div className="mt-7">
            <Swiper
                spaceBetween={10}
                slidesPerView={'auto'}
                modules={[Navigation, EffectCoverflow]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                slideToClickedSlide
                centerInsufficientSlides
                loop={isMatch}
                effect="coverflow"
                centeredSlides={isMatch}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: isMatch ? 30 : 0,
                    modifier: isMatch ? 4 : 0,
                    slideShadows: false,
                }}
                className="mx-auto"
            >
                {subcategories.map(
                    (sub, index) => (
                        <SwiperSlide
                            key={index}
                            className="w-[200px] md:w-[250px] lg:w-[300px] bg-white"
                        >
                            <Link to={`/shop?subcategoryId=${sub._id}`} className="group">
                                <div className="overflow-hidden rounded-xl">
                                    <img
                                        src={sub.image?.secure_url}
                                        alt={sub.name}
                                        className="w-full aspect-[7/10] object-cover mx-auto border shadow transition-all duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <p className="text-center mt-4 text-lg capitalize font-medium hover:underline text-muted-foreground hover:text-foreground transition-colors">
                                    {sub.name}
                                </p>
                            </Link>
                        </SwiperSlide>
                    )
                )}

                <NextElement />
                <PrevElement />
            </Swiper>
        </div>
    )
}

export default SubcategoriesSlider

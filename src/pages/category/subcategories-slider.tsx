import { NextElement, PrevElement } from '@/components/swiper-navigation'
import { SubcategoryProps } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {
    subcategories: SubcategoryProps[]
}

const SubcategoriesSlider: React.FC<Props> = ({ subcategories }) => {
    if (!subcategories.length) return null
    return (
        <div className="mt-7">
            <Swiper
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    680: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                centerInsufficientSlides
            >
                {subcategories.map((sub) => (
                    <SwiperSlide key={sub._id}>
                        <div className="w-full">
                            <Link
                                to={`/shop?subcategoryId=${sub._id}`}
                                className="aspect-w-2 aspect-h-3 overflow-hidden rounded-xl"
                            >
                                <img
                                    src={sub.image?.secure_url}
                                    alt={sub.name}
                                    className="object-cover mx-auto border shadow transition-all duration-500 hover:scale-105"
                                    loading="lazy"
                                />
                            </Link>
                            <Link
                                to={`/shop?subcategoryId=${sub._id}`}
                                className="text-center mt-4 text-lg capitalize font-medium hover:underline text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {sub.name}
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}

                <NextElement />
                <PrevElement />
            </Swiper>
        </div>
    )
}

export default SubcategoriesSlider

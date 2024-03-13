import Container from '@/components/my/container'
import { useGetActiveCategories } from '@/hooks/use-categories'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { motion } from 'framer-motion'
import Category from './category'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import Swiper core and required modules
import { Navigation } from 'swiper/modules'
// Import Swiper styles
import { NextElement, PrevElement } from '@/components/swiper-navigation'
import 'swiper/css'
import 'swiper/css/navigation'
import CategoriesLoading from './categories-loading'

const HomepageCategories = () => {
    // get active categories
    const { data, isLoading, error } = useGetActiveCategories({
        page: 1,
        limit: 100,
        select: 'name, image, slug',
        sort: '-createdAt',
    })
    const handleErrors = useHandleErrors()
    if (error) handleErrors(error)

    return (
        <Container className="my-12">
            {/* title */}
            <motion.h3
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-center uppercase text-foreground"
            >
                I am looking for
            </motion.h3>
            {/* categories */}
            {isLoading ? (
                <CategoriesLoading />
            ) : (
                <Swiper
                    className="mt-8 w-full"
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    spaceBetween={30}
                    centerInsufficientSlides
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        disabledClass: 'pointer-events-auto opacity-50',
                    }}
                >
                    {data?.categories.map((category, index) => (
                        <SwiperSlide key={category._id} className="w-full">
                            <Category category={category} index={index} />
                        </SwiperSlide>
                    ))}
                    <NextElement />
                    <PrevElement />
                </Swiper>
            )}
        </Container>
    )
}

export default HomepageCategories

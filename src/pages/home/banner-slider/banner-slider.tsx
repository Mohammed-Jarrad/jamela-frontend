import { NextElement, PrevElement } from '@/components/swiper-navigation'
import { Box } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
const BannerSlider = () => {
    // TODO: Banner Slider
    const bannerSlider = [
        {
            secure_url: '/test/banner1.jpg',
            public_id: 1,
            link: '/',
        },
        {
            secure_url: '/test/banner2.jpg',
            public_id: 2,
            link: '/',
        },
    ]
    return (
        <Box>
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
            >
                {bannerSlider.map((banner) => (
                    <SwiperSlide key={banner.public_id} className="h-full max-h-[80vh]">
                        <Link to={banner.link} className="flex items-center justify-center">
                            <img
                                src={banner.secure_url}
                                alt="banner slider image"
                                loading="lazy"
                                className="aspect-video max-h-full max-w-full object-cover"
                            />
                        </Link>
                    </SwiperSlide>
                ))}
                <NextElement />
                <PrevElement />
            </Swiper>
        </Box>
    )
}

export default BannerSlider

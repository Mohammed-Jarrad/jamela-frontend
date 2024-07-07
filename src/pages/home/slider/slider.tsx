import { NextElement, PrevElement } from '@/components/swiper-navigation'
import { useGetImages } from '@/hooks/api/use-images'
import { cn } from '@/lib/utils'
import { ConstantImages } from '@/types'
import { useHandleErrors } from '@/hooks/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
    imageType: ConstantImages['imageType']
}

const Slider: React.FC<Props> = ({ imageType }) => {
    const navigate = useNavigate()
    const { data, isLoading, error } = useGetImages({ imageType })
    const handleErrors = useHandleErrors()

    if (error) handleErrors(error)
    if (isLoading) return <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
    if (data?.images.length === 0) return null
    if (data) {
        const { images } = data
        return (
            <Box className="mx-auto w-full max-w-[1700px]">
                <Swiper
                    modules={[Navigation, Autoplay, Pagination, EffectFade]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        disabledClass: 'pointer-events-auto opacity-50',
                    }}
                    autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                    pagination={{ clickable: true }}
                    className="w-full aspect-[2.5/1]"
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                >
                    {images.map((image) => (
                        <SwiperSlide key={image._id}>
                            <img
                                src={image.secure_url}
                                alt="image slider image"
                                loading="lazy"
                                className={cn(
                                    'size-full object-cover',
                                    image.link && 'cursor-pointer'
                                )}
                                onClick={() => image.link && navigate(image.link)}
                            />
                        </SwiperSlide>
                    ))}
                    <NextElement />
                    <PrevElement />
                </Swiper>
            </Box>
        )
    }
}

export default Slider

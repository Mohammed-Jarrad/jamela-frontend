import { NextElement, PrevElement } from '@/components/swiper-navigation'
import { useGetImages } from '@/hooks/use-images'
import { ConstantImages } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
    imageType: ConstantImages['imageType']
}

const Slider: React.FC<Props> = ({ imageType }) => {
    const { data, isLoading, error } = useGetImages({ imageType })
    const handleErrors = useHandleErrors()

    if (error) handleErrors(error)
    if (isLoading) return <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
    if (data) {
        const { images } = data
        return (
            <Box className="mx-auto w-full max-w-[1536px]">
                <Swiper
                    modules={[Navigation, Autoplay, Pagination, EffectFade]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        disabledClass: 'pointer-events-auto opacity-50',
                    }}
                    autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                    pagination={{ clickable: true }}
                    className="h-full w-full"
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                >
                    {images.map((image) => (
                        <SwiperSlide key={image._id}>
                            {image.link ? (
                                <Link
                                    to={image.link}
                                    className="aspect-h-9 aspect-w-16 lg:aspect-w-[25]"
                                >
                                    <img
                                        src={image.secure_url}
                                        alt="image slider image"
                                        loading="lazy"
                                        className="object-cover"
                                    />
                                </Link>
                            ) : (
                                <div className="aspect-h-9 aspect-w-16 lg:aspect-w-[25]">
                                    <img
                                        src={image.secure_url}
                                        alt="image slider image"
                                        loading="lazy"
                                        className="object-cover"
                                    />
                                </div>
                            )}
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

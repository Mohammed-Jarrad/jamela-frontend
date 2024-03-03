import Grid from '@/components/my/grid'
import { NextElement, PrevElement } from '@/components/swiper-navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetActiveProducts } from '@/hooks/use-products'
import ProductCard from '@/pages/home/product-card/product-card'
import { ProductProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {
    product: ProductProps
}

const RelatedProducts: React.FC<Props> = ({ product }) => {
    const { data, error, isLoading } = useGetActiveProducts({
        limit: 20,
        categoryId: product?.categoryId?._id,
    })
    const handleErros = useHandleErrors()
    if (error) handleErros(error)

    return (
        <Box className="my-9">
            <h4 className="mb-5 text-center font-semibold uppercase text-foreground">Related Products</h4>

            {!isLoading ? (
                <Swiper
                    breakpoints={{
                        0: { slidesPerView: 'auto' },
                        520: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    spaceBetween={30}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                centerInsufficientSlides
                >
                    {data?.products?.filter((p) => p._id !== product._id).length ? (
                        data?.products
                            .filter((p) => p._id !== product._id)
                            .map((pro) => (
                                <SwiperSlide key={pro._id} className="max-[520px]:w-[260px]">
                                    <ProductCard product={pro} />
                                </SwiperSlide>
                            ))
                    ) : (
                        <p className="text-center text-foreground">No related products found</p>
                    )}
                    <NextElement />
                    <PrevElement />
                </Swiper>
            ) : (
                <Grid>
                    <Skeleton className="h-[400px] w-full" />
                    <Skeleton className="h-[400px] w-full" />
                    <Skeleton className="h-[400px] w-full" />
                    <Skeleton className="h-[400px] w-full" />
                </Grid>
            )}
        </Box>
    )
}

export default RelatedProducts

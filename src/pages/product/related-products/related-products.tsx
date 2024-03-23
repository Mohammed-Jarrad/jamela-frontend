import Grid from '@/components/my/grid'
import NoDataMessage from '@/components/not-data'
import { NextElement, PrevElement } from '@/components/swiper-navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetActiveProducts } from '@/hooks/use-products'
import NewArrivals from '@/pages/home/new-arrivals/new-arrivals'
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
    if (!data) return null
    const productsWithoutCurrentProduct = data.products.filter((p) => p._id !== product._id)
    if (productsWithoutCurrentProduct.length === 0) return <NewArrivals />
    return (
        <Box className="my-9">
            <h4 className="mb-5 text-center font-semibold uppercase text-foreground">
                Related Products
            </h4>

            {!isLoading ? (
                <Swiper
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        480: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                    spaceBetween={30}
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    centerInsufficientSlides
                >
                    {productsWithoutCurrentProduct.length ? (
                        data?.products
                            .filter((p) => p._id !== product._id)
                            .map((pro) => (
                                <SwiperSlide key={pro._id} className="max-[520px]:w-[260px]">
                                    <ProductCard product={pro} />
                                </SwiperSlide>
                            ))
                    ) : (
                        <NoDataMessage message="No related products found" />
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
                    <Skeleton className="h-[400px] w-full" />
                </Grid>
            )}
        </Box>
    )
}

export default RelatedProducts

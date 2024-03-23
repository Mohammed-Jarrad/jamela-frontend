import Container from '@/components/my/container'
import Grid from '@/components/my/grid'
import NoDataMessage from '@/components/not-data'
import { Button } from '@/components/ui/button'
import { useGetActiveProducts } from '@/hooks/use-products'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from '../product-card/product-card'
import NewArrivalsLoading from './new-arrivals-loading'
const NewArrivals = () => {
    const limit = 10
    const { data, isLoading, error } = useGetActiveProducts({
        limit,
        sort: '-createdAt',
        select: 'name, price, discount, finalPrice, mainImage, subImages, slug, stock, sizes, colors, isNewArrival',
        isNewArrival: {
            eq: true,
        },
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
                new arrivals
            </motion.h3>
            {/* products */}
            {isLoading ? (
                <NewArrivalsLoading />
            ) : (
                <>
                    {data?.products.length ? (
                        <>
                            <Grid
                                gap={'xl'}
                                className="mt-8 grid-cols-2 max-md:gap-4 xl:grid-cols-5 place-items-center"
                            >
                                {data?.products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </Grid>
                            {data.products.length === limit && (
                                <Button className="mt-6">
                                    <Link to={'/shop?sort=-createdAt&isNewArrival=true'}>
                                        View All
                                    </Link>
                                </Button>
                            )}
                        </>
                    ) : (
                        <NoDataMessage />
                    )}
                </>
            )}
        </Container>
    )
}

export default NewArrivals

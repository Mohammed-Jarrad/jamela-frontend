import Container from '@/components/my/container'
import Grid from '@/components/my/grid'
import NoDataMessage from '@/components/not-data'
import { Button } from '@/components/ui/button'
import { useGetActiveProducts } from '@/hooks/api/use-products'
import { useHandleErrors } from '@/hooks/use-handle-errors'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NewArrivalsLoading from '../new-arrivals/new-arrivals-loading'
import ProductCard from '../product-card/product-card'
const BestSellers = () => {
    const limit = 10
    const { data, isLoading, error } = useGetActiveProducts({
        limit,
        sort: '-number_sellers',
    })
    const handleErrors = useHandleErrors()
    if (error) handleErrors(error)
    if (data)
        return (
            <Container className="my-12">
                {/* title */}
                <motion.h3
                    initial={{ opacity: 0, x: -70 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-center uppercase text-foreground"
                >
                    best sellers
                </motion.h3>
                {/* products */}
                {isLoading ? (
                    <NewArrivalsLoading />
                ) : (
                    <>
                        {data.products.length ? (
                            <>
                                <Grid
                                    gap={'xl'}
                                    className="mt-8 grid-cols-2 max-md:gap-2 xl:grid-cols-5"
                                >
                                    {data?.products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </Grid>
                                {data.products.length === limit && (
                                    <Button className="mt-6">
                                        <Link to={'/shop?sort=-number_sellers'}>View All</Link>
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

export default BestSellers

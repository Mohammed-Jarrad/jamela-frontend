import Container from '@/components/my/container'
import Grid from '@/components/my/grid'
import { Button } from '@/components/ui/button'
import { useGetActiveProducts } from '@/hooks/use-products'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from '../product-card/product-card'
import NewArrivalsLoading from './new-arrivals-loading'
const NewArrivals = () => {
    const { data, isLoading, error } = useGetActiveProducts({
        limit: 15,
        sort: '-createdAt',
        select: 'name, price, discount, finalPrice, mainImage, subImages, slug, stock, sizes, colors',
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
                <Grid gap={'xl'} className="mt-8 grid-cols-2 max-md:gap-4 xl:grid-cols-5">
                    {data?.products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </Grid>
            )}
            <Button className="mt-6">
                <Link to={'/shop?sort=-createdAt'}>View All</Link>
            </Button>
        </Container>
    )
}

export default NewArrivals

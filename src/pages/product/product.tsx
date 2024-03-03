import Container from '@/components/my/container'
import Flex from '@/components/my/flex'
import { useGetProduct } from '@/hooks/use-products'
import Transition from '@/utils/transition'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import ProductContent from './product-content/product-content'
import ProductDescription from './product-description/product-description'
import ProductImages from './product-images/product-images'
import RelatedProducts from './related-products/related-products'

const Product = () => {
    const { slug } = useParams()
    const { data, isLoading, error } = useGetProduct({ slug })
    const handleErrors = useHandleErrors()

    if (error) handleErrors(error)

    if (isLoading)
        return (
            <div>
                <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
            </div>
        )

    return (
        <Transition>
            {data !== undefined && (
                <Container className="relative my-12">
                    <Flex className="min-h-[60vh] max-md:flex-col" gap="lg">
                        <ProductImages product={data?.product} />
                        <ProductContent product={data?.product} />
                    </Flex>
                    <ProductDescription product={data?.product} />
                    <RelatedProducts product={data?.product} />
                </Container>
            )}
        </Transition>
    )
}

export default Product

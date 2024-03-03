import { Flex, mq } from '@/styles/styles'
import { ProductProps } from '@/types'
import { Box } from '@radix-ui/themes'
import styled from 'styled-components'
import ProductCardContent from './product-card-content'
import ProductCardImages from './product-card-images'
import ProductOptions from './product-options'

const ProductContainer = styled(Flex)`
    --img-height: 220px;
    position: relative;
    width: 100%;
    ${mq.xs`
        --img-height: 320px;
    `}
    ${mq.xl`
        --img-height: 400px;
    `}
`

type Props = {
    product: ProductProps
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <ProductContainer $direction="column" className="group">
            
            <Box className="h-[--img-height] w-full">
                <ProductCardImages product={product} />
                <ProductOptions product={product} />
            </Box>

            <ProductCardContent product={product} />
        </ProductContainer>
    )
}

export default ProductCard

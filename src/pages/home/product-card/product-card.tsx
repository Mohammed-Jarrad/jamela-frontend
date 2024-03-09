import { Flex } from '@/styles/styles'
import { ProductProps } from '@/types'
import { Box } from '@radix-ui/themes'
import styled from 'styled-components'
import ProductCardContent from './product-card-content'
import ProductCardImages from './product-card-images'
import ProductOptions from './product-options'

const ProductContainer = styled(Flex)`
    position: relative;
    width: 100%;
`

type Props = {
    product: ProductProps
}

const ProductCard: React.FC<Props> = ({ product }) => {
    return (
        <ProductContainer $direction="column" className="group">
            <Box className="w-full">
                <ProductCardImages product={product} />
                <ProductOptions product={product} />
            </Box>

            <ProductCardContent product={product} />
        </ProductContainer>
    )
}

export default ProductCard

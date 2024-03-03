import { ProductProps } from '@/types'
import { Box } from '@radix-ui/themes'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = { product: ProductProps }
const ProductCardContent: React.FC<Props> = ({ product }) => {
    return (
        <Box className="flex flex-col items-center gap-2 py-3 md:py-0">
            <Link
                to={`/product/${product.slug}`}
                className="w-full cursor-pointer overflow-hidden truncate text-ellipsis text-center text-lg font-medium capitalize text-foreground transition-all hover:underline xs:text-xl"
            >
                {product.name}
            </Link>
            <p className="space-x-2 text-center text-sm text-muted-foreground xs:text-lg">
                {product.discount! > 0 && (
                    <>
                        <span className="line-through">₪{product.price}</span>
                        <span className="absolute -left-1 top-1 z-20 rounded-[9px] bg-red-500 px-3 py-1 text-xs text-white shadow-sm drop-shadow-2xl">
                            {product.discount} %
                        </span>
                    </>
                )}
                <span className="text-foreground">₪{product.finalPrice}</span>
            </p>
        </Box>
    )
}

export default ProductCardContent

import Rating from '@/components/review/rating'
import { cn } from '@/lib/utils'
import { ProductProps } from '@/types'
import { Box } from '@radix-ui/themes'
import React from 'react'
import { BiShekel } from 'react-icons/bi'
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
            <Rating value={product.averageRating || 0} />
            <p className="space-x-2 text-center text-sm text-muted-foreground xs:text-lg">
                {product.discount! > 0 && (
                    <>
                        <span className="inline-flex items-center line-through">
                            <BiShekel />
                            {product.price}
                        </span>
                    </>
                )}
                <span className="inline-flex items-center text-foreground">
                    <BiShekel />
                    {product.finalPrice}
                </span>
            </p>

            <div
                className={cn(
                    'absolute top-1 left-1 z-30 rounded-[9px] px-3 py-1 text-xs text-white shadow-2xl bg-gradient-to-r select-none',
                    product.isNewArrival && product.discount! > 0
                        ? 'from-pink-500 to-violet-500 space-x-3'
                        : product.discount! > 0
                        ? 'from-pink-500 to-rose-500'
                        : product.isNewArrival && 'from-violet-500 to-indigo-500'
                )}
            >
                {product.discount! > 0 && <span>{product.discount} %</span>}
                {product.isNewArrival && <span>New</span>}
            </div>
        </Box>
    )
}

export default ProductCardContent

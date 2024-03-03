import Flex from '@/components/my/flex'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContextProvider'
import { useAddToCart } from '@/hooks/use-cart'
import { useAddOrRemoveProductToWishList } from '@/hooks/use-user'
import { cn } from '@/lib/utils'
import { ProductProps, ProductSizesProps } from '@/types'
import { Box } from '@radix-ui/themes'
import { Minus, Plus } from 'lucide-react'
import React, { useEffect } from 'react'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { BeatLoader } from 'react-spinners'

type Props = {
    product: ProductProps
}

const ProductContent: React.FC<Props> = ({ product }) => {
    const { currentUser } = useUserContext()
    const { mutate: addOrRemoveToWishList, isPending: isPendingWishList } = useAddOrRemoveProductToWishList()
    const { mutate: addToCart, isPending: isPendingCart } = useAddToCart()
    const [size, setSize] = React.useState<ProductSizesProps>()
    const [color, setColor] = React.useState<string>()
    const [quantity, setQuantity] = React.useState(1)
    function toggleWishList() {
        addOrRemoveToWishList(product._id)
    }
    function handleAddToCart() {
        addToCart({ productId: product._id, quantity, ...(size && { size }), ...(color && { color }) })
    }
    useEffect(() => {
        if (product.sizes && product.sizes?.length > 0) {
            setSize(product.sizes[0])
        }
        if (product.colors && product.colors?.length > 0) {
            setColor(product.colors[0])
        }
    }, [product])

    return (
        <Box className="flex-1">
            <div className="sticky top-[calc(var(--header-height)_+_0.5rem)]">
                {/* Product Name */}
                <p className="text-xl font-medium lg:text-2xl" title={product.name}>
                    {product.name}
                </p>
                {/* Product Price */}
                <p className="mt-2 space-x-2 text-base md:text-xl">
                    {product.discount! > 0 && (
                        <span className="text-muted-foreground line-through">₪{product.price}</span>
                    )}
                    <span className="font-medium text-foreground">₪{product.finalPrice}</span>
                </p>
                {/* Product Stock */}
                <p className="mt-2 space-x-2 text-base">
                    {product.stock! > 0 ? (
                        <span className="text-foreground">
                            Left <strong>{product.stock}</strong> in stock
                        </span>
                    ) : (
                        <span className="text-red-500">Out of Stock</span>
                    )}
                </p>
                {/* Product Sizes */}
                {product.sizes && product.sizes?.length > 0 && (
                    <Box className="mt-4 space-y-2 md:mt-6  ">
                        <p className="font-semibold text-muted-foreground">Sizes:</p>
                        <Flex className="flex-wrap">
                            {product.sizes.map((s) => (
                                <Button
                                    key={s}
                                    variant={'ghost'}
                                    className={cn(
                                        'h-10 w-10 cursor-pointer rounded-xl border transition-all',
                                        s === size && 'ring-2 ring-primary'
                                    )}
                                    onClick={() => setSize(s)}
                                    children={s}
                                />
                            ))}
                        </Flex>
                    </Box>
                )}
                {/* Product Colors */}
                {product.colors && product.colors?.length > 0 && (
                    <Box className="mt-4 space-y-2 md:mt-6  ">
                        <p className="font-semibold text-muted-foreground">Colors:</p>
                        <Flex className="flex-wrap">
                            {product.colors.map((c) => (
                                <div
                                    key={c}
                                    className={cn(
                                        'h-10 w-10 cursor-pointer rounded-xl transition-all',
                                        c == color && 'ring-2 ring-primary'
                                    )}
                                    style={{
                                        backgroundColor: c,
                                    }}
                                    onClick={() => setColor(c)}
                                />
                            ))}
                        </Flex>
                    </Box>
                )}
                {/* Quantity Controller */}
                <Box className="mt-4 space-y-2 md:mt-6">
                    <p className="font-semibold text-muted-foreground">Quantity:</p>
                    <Flex
                        align="center"
                        className="h-12 w-40 gap-0 rounded-2xl border transition-all focus-within:ring-2 focus-within:ring-primary"
                    >
                        <button
                            onClick={() => setQuantity((prev) => prev - 1)}
                            className="flex h-full flex-1 items-center justify-center p-1.5 disabled:cursor-not-allowed disabled:text-muted-foreground"
                            disabled={quantity === 1}
                        >
                            <Minus size={20} />
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-[50px] !appearance-none bg-background text-center outline-none"
                            min={1}
                            max={product.stock}
                        />
                        <button
                            onClick={() => setQuantity((prev) => prev + 1)}
                            className="flex h-full flex-1 items-center justify-center p-1.5 disabled:cursor-not-allowed disabled:text-muted-foreground"
                            disabled={quantity === product.stock}
                        >
                            <Plus size={20} />
                        </button>
                    </Flex>
                </Box>
                {/* Sub total */}
                <p className="mt-2 space-x-2 text-lg font-medium">
                    Subtotal: <span>₪{((product.finalPrice || 0) * quantity).toFixed(2)}</span>
                </p>

                {/* Add to cart & Add to wishlist & By now buttons */}
                <Box className="mt-5 space-y-3">
                    <Flex>
                        <Button
                            className="h-12 flex-1 text-base uppercase disabled:!cursor-not-allowed"
                            onClick={handleAddToCart}
                            disabled={isPendingCart || product.stock === 0}
                        >
                            Add to cart
                        </Button>
                        <Button
                            variant="outline"
                            className="h-12 w-12 rounded-full p-0"
                            disabled={isPendingWishList}
                            onClick={toggleWishList}
                        >
                            {currentUser.wishList?.find((p) => p._id === product._id) ? (
                                <RiHeartFill size={24} className="text-red-500" />
                            ) : (
                                <RiHeartLine size={24} className="text-muted-foreground" />
                            )}
                        </Button>
                    </Flex>
                    <Button
                        className="h-12 w-full border text-base uppercase hover:bg-primary hover:text-white"
                        variant="ghost"
                        disabled={product.stock === 0}
                    >
                        Buy now
                    </Button>
                </Box>
                {/* Loading States */}
                {(isPendingCart || isPendingWishList) && (
                    <BeatLoader className="my-2 text-center" color="hsl(var(--primary))" />
                )}
            </div>
        </Box>
    )
}

export default ProductContent

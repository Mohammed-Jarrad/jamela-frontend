import Flex from '@/components/my/flex'
import { Button } from '@/components/ui/button'
import { useRemoveFromCart, useUpdateQuantity } from '@/hooks/use-cart'
import { CartProps } from '@/types'
import { Box } from '@radix-ui/themes'
import { Check, Edit2, Minus, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import CartItemDialog from './cart-item-dialog'

type Props = { cartItem: CartProps['products'][number] }

const CartItem: React.FC<Props> = ({ cartItem: product }) => {
    const { mutate: removeItem, isPending: isRemoving } = useRemoveFromCart()
    const { mutate: updateQuantity, isPending: isUpdatingQuantity } = useUpdateQuantity()

    const [open, setOpen] = useState(false)
    const [quantity, setQuantity] = useState(product.quantity)
    const [showSaveBtn, setShowSaveBtn] = useState(false)
    function handleUpdateItemVariants() {
        setOpen(true)
    }
    function handleChangeQuantity(amount: number) {
        // TODO: update quantity
        setQuantity((prev) => {
            if (prev + amount !== product.quantity) setShowSaveBtn(true)
            else setShowSaveBtn(false)
            return prev + amount
        })
    }
    function handleRemove() {
        removeItem({ itemId: product._id })
    }
    function handleUpdateQuantity() {
        updateQuantity(
            {
                itemId: product._id,
                quantity,
            },
            {
                onSuccess: () => setShowSaveBtn(false),
            }
        )
    }

    return (
        <>
            {(isRemoving || isUpdatingQuantity) && (
                <BeatLoader color="hsl(var(--primary))" className="mx-auto text-center" />
            )}
            <Flex gap="sm" className="relative overflow-hidden rounded-2xl border p-1 shadow max-sm:flex-wrap sm:p-2">
                {/* Image & Details Box */}
                <Box className="flex-[3]">
                    <Flex className="items-stretch" gap="md">
                        <Link to={`/product/${product.productId.slug}`}>
                            <img
                                src={product.productId.mainImage?.secure_url}
                                alt={product.productId.name}
                                loading="lazy"
                                className="h-full max-h-32 w-24 rounded-xl object-cover max-sm:w-16"
                            />
                        </Link>

                        <Box className="flex-1 space-y-1">
                            <p
                                className="w-[130px] truncate text-base capitalize sm:text-lg md:w-[200px]"
                                title={product.productId.name}
                            >
                                {product.productId.name}
                            </p>
                            <p className="text-base capitalize text-muted-foreground max-sm:text-sm">
                                {product.productId?.categoryId?.name}
                            </p>
                            <Flex align="center" gap="sm">
                                {product.size && (
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full border text-xs font-medium shadow sm:h-6 sm:w-6 sm:text-sm">
                                        {product.size}
                                    </span>
                                )}
                                {product.color && (
                                    <span
                                        className="block h-4 w-4 rounded-full sm:h-6 sm:w-6"
                                        style={{ backgroundColor: product.color }}
                                    />
                                )}
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                {/* Price & Quantity Box */}
                <Box className="flex flex-[3] flex-col items-center justify-center gap-3 text-center">
                    <Flex align="center" gap="sm">
                        {product.productId?.discount && product.productId?.discount > 0 ? (
                            <p className="text-xs text-muted-foreground line-through sm:text-sm">
                                ₪{product.productId.price}
                            </p>
                        ) : null}
                        <p className="text-base sm:text-lg">₪{product.productId.finalPrice}</p>
                    </Flex>
                    <Flex align="center">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-xl !border p-1 max-sm:h-6"
                            title="decrease"
                            onClick={() => handleChangeQuantity(-1)}
                            disabled={quantity === 1}
                        >
                            <Minus size={17} className="max-sm:w-4" />
                        </Button>
                        <p className="w-10 text-center">{quantity}</p>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-xl !border p-1 max-sm:h-6"
                            title="increase"
                            onClick={() => handleChangeQuantity(1)}
                            disabled={product.productId?.stock !== undefined && quantity >= product.productId?.stock}
                        >
                            <Plus size={17} className="max-sm:w-4" />
                        </Button>
                    </Flex>
                </Box>
                {/* Final Price * Quantity Box */}
                <Box className="flex flex-1 items-center gap-1.5 text-center max-sm:hidden">
                    <p className="text-lg">
                        ₪
                        {product.productId?.finalPrice !== undefined
                            ? (product.productId.finalPrice * product.quantity).toFixed(2)
                            : 'N/A'}
                    </p>
                </Box>
                {/* Remove Item Button */}
                <Button
                    size="sm"
                    className="absolute -right-2 -top-2 rounded-xl p-[2px] pr-2.5 pt-2.5"
                    variant="destructive"
                    onClick={handleRemove}
                    title="remove from cart"
                >
                    <X size={17} />
                </Button>
                {/* Open Dialog Button */}
                <Edit2
                    size={20}
                    className="absolute bottom-2 right-2 cursor-pointer text-muted-foreground hover:text-foreground max-sm:w-3.5 "
                    onClick={handleUpdateItemVariants}
                />
                <CartItemDialog item={product} open={open} setOpen={setOpen} />
            </Flex>

            <Box className="flex items-center gap-2">
                {showSaveBtn && (
                    <>
                        <Button size="sm" onClick={handleUpdateQuantity}>
                            <Check />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                                setQuantity(product.quantity)
                                setShowSaveBtn(false)
                            }}
                        >
                            <X />
                        </Button>
                    </>
                )}
            </Box>
        </>
    )
}

export default CartItem

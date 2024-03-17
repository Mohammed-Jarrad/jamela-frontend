import ToolTip from '@/components/my/tooltip'
import { Button } from '@/components/ui/button'
import { useRemoveFromCart, useUpdateQuantity } from '@/hooks/use-cart'
import { Flex } from '@/styles/styles'
import { CartProps } from '@/types'
import { Box } from '@radix-ui/themes'
import { Check, Edit2, Minus, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { BiShekel } from 'react-icons/bi'
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
            <Flex className="relative overflow-hidden rounded-2xl border p-1 shadow max-sm:flex-wrap sm:p-2">
                {/* Image & Details Box */}
                <Box className="flex-[3]">
                    <Flex $items="stretch">
                        <Link to={`/product/${product.productId.slug}`} className="w-16 sm:w-24">
                            <img
                                src={product.productId.mainImage?.secure_url}
                                alt={product.productId.name}
                                loading="lazy"
                                className="h-full max-h-32  w-full rounded-xl object-cover"
                            />
                        </Link>

                        <Box className="w-full flex-1 space-y-1">
                            <p
                                className="w-[130px] truncate text-base capitalize sm:text-lg md:w-[200px]"
                                title={product.productId.name}
                            >
                                {product.productId.name}
                            </p>
                            <p className="text-base capitalize text-muted-foreground max-sm:text-sm">
                                {product.productId?.categoryId?.name}
                            </p>
                            <Flex $items="center">
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
                <Flex as={Box} $center={true} $direction="column" className="flex-[3] text-center">
                    <Flex $items="center">
                        {product.productId?.discount && product.productId?.discount > 0 ? (
                            <p className="flex items-center text-xs text-muted-foreground line-through sm:text-sm">
                                <BiShekel />
                                {product.productId.price}
                            </p>
                        ) : null}
                        <p className="flex items-center text-base sm:text-lg">
                            <BiShekel />
                            {product.productId.finalPrice}
                        </p>
                    </Flex>
                    <Flex $items="center">
                        <ToolTip content="Decrease">
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
                        </ToolTip>
                        <p className="w-10 text-center">{quantity}</p>
                        <ToolTip content="Increase">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-xl !border p-1 max-sm:h-6"
                                title="increase"
                                onClick={() => handleChangeQuantity(1)}
                                disabled={
                                    product.productId?.stock !== undefined &&
                                    quantity >= product.productId?.stock
                                }
                            >
                                <Plus size={17} className="max-sm:w-4" />
                            </Button>
                        </ToolTip>
                    </Flex>
                </Flex>
                {/* Final Price * Quantity Box */}
                <Box className="flex flex-1 items-center gap-1.5 text-center max-sm:hidden">
                    <p className=" flex items-center text-lg">
                        <BiShekel />
                        {product.productId?.finalPrice !== undefined
                            ? (product.productId.finalPrice * quantity).toFixed(2)
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
                {((product.productId?.sizes && product.productId?.sizes.length > 0) ||
                    (product.productId?.colors && product.productId?.colors.length > 0)) && (
                    <ToolTip content="Edit Item Variants">
                        <Edit2
                            size={20}
                            className="absolute bottom-2 right-2 cursor-pointer text-muted-foreground hover:text-foreground max-sm:w-3.5 "
                            onClick={handleUpdateItemVariants}
                        />
                    </ToolTip>
                )}
                <CartItemDialog item={product} open={open} setOpen={setOpen} />
            </Flex>

            {/* Save Buttons */}
            <Flex $items="center">
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
            </Flex>
        </>
    )
}

export default CartItem

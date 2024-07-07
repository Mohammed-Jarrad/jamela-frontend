import ToolTip from '@/components/my/tooltip'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useRemoveFromCart, useUpdateQuantity } from '@/hooks/api/use-cart'
import { cn } from '@/lib/utils'
import { Flex } from '@/styles/styles'
import { CartProps } from '@/types'
import { Box } from '@radix-ui/themes'
import { Check, Edit2, Minus, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { BiShekel } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import CartItemDialog from './cart-item-dialog'

type Props = {
    cartItem: CartProps['products'][number]
}

const CartItemRow: React.FC<Props> = ({ cartItem: item }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [quantity, setQuantity] = useState(item.quantity)
    const [showSaveBtn, setShowSaveBtn] = useState(false)

    const hasVariants =
        (item.productId?.sizes && item.productId?.sizes.length > 0) ||
        (item.productId?.colors && item.productId?.colors.length > 0)

    const { mutate: removeItem, isPending: isRemoving } = useRemoveFromCart()
    const { mutate: updateQuantity, isPending: isUpdatingQuantity } = useUpdateQuantity()

    function handleRemove() {
        removeItem({ itemId: item._id })
    }
    function handleUpdateQuantity() {
        updateQuantity(
            {
                itemId: item._id,
                quantity,
            },
            {
                onSuccess: () => setShowSaveBtn(false),
            }
        )
    }
    function handleChangeQuantity(amount: number) {
        setQuantity((prev) => {
            if (prev + amount !== item.quantity) setShowSaveBtn(true)
            else setShowSaveBtn(false)
            return prev + amount
        })
    }

    return (
        <TableRow className="relative">
            {/* Item Info */}
            <TableCell>
                <Flex className="w-fit" $items="center">
                    <Link
                        to={`/product/${item.productId.slug}`}
                        className="w-16 sm:w-24 h-24 sm:h-32"
                    >
                        <img
                            src={item.productId.mainImage?.secure_url}
                            alt={item.productId.name}
                            loading="lazy"
                            className="rounded-xl object-cover size-full"
                        />
                    </Link>

                    <Box className="space-y-1">
                        <p
                            className="truncate text-base capitalize sm:text-lg max-w-[140px] sm:max-w-[240px] max-sm:text-sm"
                            title={item.productId.name}
                        >
                            {item.productId.name}
                        </p>
                        <p className="text-base capitalize text-muted-foreground max-sm:text-sm">
                            {item.productId?.categoryId?.name}
                        </p>
                        <Flex $items="center">
                            {item.size && (
                                <span className="flex items-center justify-center rounded-xl border text-xs font-medium shadow sm:text-sm py-0.5 px-2 select-none">
                                    {item.size}
                                </span>
                            )}
                            {item.color && (
                                <span
                                    className=" px-2 py-1block h-4 w-4 rounded-full sm:h-6 sm:w-6"
                                    style={{ backgroundColor: item.color }}
                                />
                            )}
                        </Flex>
                    </Box>
                </Flex>
            </TableCell>

            {/* Price & Quantity */}
            <TableCell>
                <Flex as={Box} $center={true} $direction="column" className="flex-[3] text-center">
                    <Flex $items="center">
                        {item.productId?.discount && item.productId?.discount > 0 ? (
                            <p className="flex items-center text-xs text-muted-foreground line-through sm:text-sm">
                                <BiShekel />
                                {item.productId.price}
                            </p>
                        ) : null}
                        <p className="flex items-center text-base sm:text-lg">
                            <BiShekel />
                            {item.productId.finalPrice}
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
                        <p className="w-10 text-center">
                            {isUpdatingQuantity ? (
                                <BeatLoader size={6} color="hsl(var(--primary))" />
                            ) : (
                                quantity
                            )}
                        </p>
                        <ToolTip content="Increase">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-xl !border p-1 max-sm:h-6"
                                title="increase"
                                onClick={() => handleChangeQuantity(1)}
                                disabled={
                                    item.productId?.stock !== undefined &&
                                    quantity >= item.productId?.stock
                                }
                            >
                                <Plus size={17} className="max-sm:w-4" />
                            </Button>
                        </ToolTip>
                    </Flex>
                    {showSaveBtn && (
                        <Flex $items="center">
                            <Button size="icon" className="size-6" onClick={handleUpdateQuantity}>
                                <Check size={14} />
                            </Button>
                            <Button
                                size="icon"
                                className="size-6"
                                variant="ghost"
                                onClick={() => {
                                    setQuantity(item.quantity)
                                    setShowSaveBtn(false)
                                }}
                            >
                                <X size={14} />
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </TableCell>

            {/* Final price */}
            <TableCell className="max-sm:hidden">
                <Box className="flex items-center justify-center gap-1.5 text-center">
                    <p className=" flex items-center text-base sm:text-lg">
                        <BiShekel />
                        {item.productId?.finalPrice !== undefined
                            ? (item.productId.finalPrice * quantity).toFixed(2)
                            : 'N/A'}
                    </p>
                </Box>
            </TableCell>

            {/* Actions */}
            <TableCell className="text-center w-[70px]">
                <Flex $justify="center" $items="center">
                    <ToolTip content="Edit variants">
                        <Edit2
                            size={18}
                            className={cn(
                                'pointer text-muted-foreground hover:text-green-400 transition-colors hover:scale-105 hidden',
                                hasVariants && 'block'
                            )}
                            onClick={() => setOpen(true)}
                        />
                    </ToolTip>
                    {!isRemoving ? (
                        <ToolTip content="Remove">
                            <Trash2
                                size={18}
                                className="pointer text-muted-foreground hover:text-destructive transition-colors hover:scale-105"
                                onClick={handleRemove}
                            />
                        </ToolTip>
                    ) : (
                        <BeatLoader color="hsl(var(--primary))" size={4} />
                    )}

                    <CartItemDialog item={item} open={open} setOpen={setOpen} />
                </Flex>
            </TableCell>
        </TableRow>
    )
}

export default CartItemRow

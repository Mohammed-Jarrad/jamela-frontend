import Flex from '@/components/my/flex'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useAddToCart } from '@/hooks/api/use-cart'
import { cn } from '@/lib/utils'
import { ProductProps, ProductSizesProps } from '@/types'
import { Box } from '@radix-ui/themes'
import React from 'react'
import { BeatLoader } from 'react-spinners'
type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    product: ProductProps
}
const ProductCardDialog: React.FC<Props> = ({ open, setOpen, product }) => {
    const { mutate: addToCart, isPending: cartLoading } = useAddToCart()

    const [size, setSize] = React.useState<ProductSizesProps | undefined>(
        () => product.sizes?.[0] || undefined
    )
    const [color, setColor] = React.useState<string | undefined>(
        () => product.colors?.[0] || undefined
    )
    function handleAddToCart() {
        addToCart(
            { productId: product._id, ...(size && { size }), ...(color && { color }) },
            {
                onSuccess: () => setOpen(false),
            }
        )
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Here in this dialog we need to allow user to choose size or color */}
            <DialogContent className="text-left">
                <DialogHeader>
                    <DialogTitle className="text-2xl capitalize">{product.name}</DialogTitle>
                    <DialogDescription>Please choose your size or color</DialogDescription>
                </DialogHeader>
                <Box className="my-5 space-y-3">
                    {/* sizes options */}
                    <Flex gap="sm" align={'center'} className="flex-wrap max-md:flex-col">
                        {product.sizes?.length ? (
                            <p className="text-base font-medium">Sizes:</p>
                        ) : null}
                        <Flex gap="sm" align="center" className="flex-wrap">
                            {product.sizes?.map((s) => (
                                <Box
                                    key={s}
                                    onClick={() => {
                                        setSize(s)
                                    }}
                                    className={cn(
                                        'flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border shadow hover:bg-accent',
                                        s == size && 'border-primary'
                                    )}
                                >
                                    {s}
                                </Box>
                            ))}
                        </Flex>
                    </Flex>
                    {/* colors options */}
                    <Flex gap="sm" align={'center'} className=" max-md:flex-col">
                        {product.colors?.length ? (
                            <p className="text-base font-medium">Colors:</p>
                        ) : null}
                        <Flex gap="sm" align="center" className="flex-wrap">
                            {product.colors?.map((c) => (
                                <Box
                                    key={c}
                                    onClick={() => {
                                        setColor(c)
                                    }}
                                    className={cn(
                                        'h-10 w-10 cursor-pointer rounded-xl',
                                        c == color && '!outline '
                                    )}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </Flex>
                    </Flex>
                </Box>
                <DialogFooter className="">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button className="uppercase" onClick={handleAddToCart}>
                        {cartLoading ? <BeatLoader color="white" /> : 'Add to cart'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProductCardDialog

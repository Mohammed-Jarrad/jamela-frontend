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
import { useUpdateSizeOrColor } from '@/hooks/api/use-cart'
import { cn } from '@/lib/utils'
import { CartProps, ProductSizesProps } from '@/types'
import { Box } from '@radix-ui/themes'
import React, { useEffect } from 'react'
import { BeatLoader } from 'react-spinners'
type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    item: CartProps['products'][number]
}

const CartItemDialog: React.FC<Props> = ({ open, setOpen, item }) => {
    const [size, setSize] = React.useState<ProductSizesProps>()
    const [color, setColor] = React.useState<string>()
    const { mutate: updateSizeOrColor, isPending } = useUpdateSizeOrColor()

    useEffect(() => {
        setSize(item?.size)
        setColor(item?.color)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    function handleUpdateSizeOrColor() {
        updateSizeOrColor(
            {
                itemId: item._id,
                productId: item.productId._id,
                ...(size && { size }),
                ...(color && { color }),
            },
            {
                onSuccess: () => setOpen(false),
            }
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="text-left">
                <DialogHeader>
                    <DialogTitle className="text-2xl capitalize">{item.productId.name}</DialogTitle>
                    <DialogDescription>Please choose your size or color</DialogDescription>
                </DialogHeader>
                <Box className="my-5 space-y-3">
                    {/* sizes options */}
                    <Flex gap="sm" align={'center'} className="flex-wrap max-md:flex-col">
                        {item.productId.sizes?.length ? (
                            <p className="text-base font-medium">Sizes:</p>
                        ) : null}
                        <Flex gap="sm" align="center" className="flex-wrap">
                            {item.productId.sizes?.map((s) => (
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
                        {item.productId.colors?.length ? (
                            <p className="text-base font-medium">Colors:</p>
                        ) : null}
                        <Flex gap="sm" align="center" className="flex-wrap">
                            {item.productId.colors?.map((c) => (
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
                <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        className="capitalize"
                        onClick={handleUpdateSizeOrColor}
                        disabled={isPending}
                    >
                        {isPending ? <BeatLoader color="white" /> : 'Update'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CartItemDialog

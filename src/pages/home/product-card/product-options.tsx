import ToolTip from '@/components/my/tooltip'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContextProvider'
import { useAddToCart } from '@/hooks/api/use-cart'
import { useAddOrRemoveProductToWishList } from '@/hooks/api/use-user'
import { ProductProps } from '@/types'
import { motion } from 'framer-motion'
import React from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { BeatLoader } from 'react-spinners'
import { toast } from 'sonner'
import ProductCardDialog from './product-card-dialog'

type Props = { product: ProductProps }
const ProductOptions = ({ product }: Props) => {
    const { mutate: addToWishList, isPending: wishListLoading } = useAddOrRemoveProductToWishList()
    const { mutate: addToCart, isPending: cartLoading } = useAddToCart()
    const { currentUser, token } = useUserContext()
    const [open, setOpen] = React.useState<boolean>(false)
    function handleAddToWishList() {
        if (!token) return toast.warning('Please login first', { position: 'bottom-center' })
        addToWishList(product._id)
    }
    function handleAddToCart() {
        if (!token) return toast.warning('Please login first', { position: 'bottom-center' })
        else if (product.colors?.length || product.sizes?.length) setOpen(true)
        else addToCart({ productId: product._id })
    }
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 30 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } }}
            className="absolute top-[30%] z-30 hidden w-full flex-col items-center justify-center gap-2 group-hover:flex"
        >
            <Button
                className="block rounded-none uppercase"
                variant={product.stock! > 0 ? 'default' : 'outline'}
                onClick={product.stock! > 0 ? handleAddToCart : undefined}
                size={'sm'}
            >
                {product.stock! > 0 ? 'Add to cart' : 'Out of stock'}
            </Button>
            <ToolTip content="Add to wish list">
                <div
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow"
                    onClick={handleAddToWishList}
                >
                    {currentUser?.wishList?.find((p) => p._id === product._id) ? (
                        <IoHeart className="h-6 w-6 text-red-500" />
                    ) : (
                        <IoHeartOutline className="h-6 w-6 text-muted-foreground hover:text-red-500" />
                    )}
                </div>
            </ToolTip>
            {(wishListLoading || cartLoading) && <BeatLoader color="white" />}
            <ProductCardDialog open={open} setOpen={setOpen} product={product} />
        </motion.div>
    )
}

export default ProductOptions

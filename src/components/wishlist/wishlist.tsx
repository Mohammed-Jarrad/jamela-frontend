import { useUserContext } from '@/context/UserContextProvider'
import { useAddToCart } from '@/hooks/use-cart'
import { useAddOrRemoveProductToWishList } from '@/hooks/use-user'
import { Flex, mq } from '@/styles/styles'
import { ProductProps } from '@/types'
import useClickOutside from '@/utils/use-click-outside'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import { GoHeartFill } from 'react-icons/go'
import { IoBagAdd } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { toast } from 'sonner'
import styled from 'styled-components'
import ToolTip from '../my/tooltip'

const Container = styled.div`
    position: relative;
    display: grid;
`
const WishButton = styled(GoHeartFill)`
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        scale: 1.1;
    }
`

const WishListWrapper = styled(motion.div)<{ 'data-show': boolean }>`
    position: absolute;
    top: 140%;
    right: 0;
    z-index: 9999;
    max-height: calc(100vh - var(--header-height) - 1rem);
    overflow-y: auto;
    width: 400px;
    ${mq.mdMax`
        position: fixed;
        width: 100%;
        top: var(--header-height);
        right: 0;
    `}
`

const Wishlist = () => {
    const { mutate: removeFromWishList, isPending } = useAddOrRemoveProductToWishList()
    const { mutate: addToCart, isPending: addToCartPending } = useAddToCart()
    const [show, setShow] = useState(false)
    const toggleShow = () => setShow((prev) => !prev)
    const ref = useClickOutside(() => setShow(false))
    const {
        currentUser: { wishList },
    } = useUserContext()

    function handleRemove(productId: ProductProps['_id']) {
        removeFromWishList(productId)
    }
    function handleAddToCart(product: ProductProps) {
        if (product.stock === 0) return toast.warning('Out of stock', { position: 'bottom-center' })
        addToCart({
            productId: product._id,
            quantity: 1,
            ...(product.sizes?.length && { size: product.sizes[0] }),
            ...(product.colors?.length && { color: product.colors[0] }),
        })
    }
    return (
        <Container ref={ref}>
            <div className="relative">
                <ToolTip content="Wish list">
                    <span>
                        <WishButton size={24} onClick={toggleShow} className="text-red-500" />
                    </span>
                </ToolTip>

                <WishListWrapper
                    variants={{
                        close: { opacity: 0, y: -10, pointerEvents: 'none' },
                        open: { opacity: 1, y: 0, pointerEvents: 'all' },
                    }}
                    initial="close"
                    animate={show ? 'open' : 'close'}
                    data-show={show}
                    className="rounded-s-xl border bg-card px-5 py-3 shadow"
                >
                    {(isPending || addToCartPending) && (
                        <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
                    )}
                    <Flex $direction="column">
                        {wishList?.length ? (
                            wishList?.map((pro) => (
                                <Flex key={pro._id} className="rounded-xl bg-muted p-2">
                                    <Link to={`/product/${pro.slug}`} onClick={toggleShow}>
                                        <img
                                            src={pro.mainImage?.secure_url}
                                            alt={pro.name}
                                            className="h-32 w-20 rounded-lg object-cover"
                                        />
                                    </Link>
                                    <Flex $direction="column" className="flex-1">
                                        <Flex $justify="space-between" className="w-full">
                                            <p className="truncate">{pro.name}</p>
                                            <X
                                                className="cursor-pointer transition-all hover:rotate-[360deg]"
                                                size={14}
                                                onClick={() => handleRemove(pro._id)}
                                            />
                                        </Flex>
                                        <Flex as="p" className="text-sm text-muted-foreground">
                                            Price:{' '}
                                            <span className="text-foreground">₪{pro.price}</span>
                                        </Flex>
                                        <p className="text-sm text-muted-foreground">
                                            {pro.stock! > 0 ? 'In stock' : 'Out of stock'}
                                        </p>
                                        <Flex $justify="space-between" $items="center" $wrap="wrap">
                                            <p className="text-sm text-muted-foreground">
                                                {pro?.categoryId!.name}
                                            </p>
                                            <IoBagAdd
                                                className="size-8 cursor-pointer text-primary hover:text-primary/80"
                                                onClick={() => handleAddToCart(pro)}
                                            />
                                        </Flex>
                                    </Flex>
                                </Flex>
                            ))
                        ) : (
                            <p className="text-center">No products in wishlist</p>
                        )}
                    </Flex>
                </WishListWrapper>
            </div>
        </Container>
    )
}

export default Wishlist

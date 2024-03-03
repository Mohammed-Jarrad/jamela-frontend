import { useUserContext } from '@/context/UserContextProvider'
import { useAddOrRemoveProductToWishList } from '@/hooks/use-user'
import { Flex } from '@/styles/styles'
import { ProductProps } from '@/types'
import useClickOutside from '@/utils/use-click-outside'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import { GoHeartFill } from 'react-icons/go'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
    position: fixed;
    top: calc(var(--header-height) + 0.5rem);
    right: 0.5rem;
    z-index: 9999;
    width: 400px;
    max-height: calc(100vh - var(--header-height) - 1rem);
    overflow-y: auto;
`

const Wishlist = () => {
    const { mutate: removeFromWishList, isPending } = useAddOrRemoveProductToWishList()

    const [show, setShow] = useState(false)
    const toggleShow = () => setShow((prev) => !prev)
    const ref = useClickOutside(() => setShow(false))
    const {
        currentUser: { wishList },
    } = useUserContext()

    function handleRemove(productId: ProductProps['_id']) {
        removeFromWishList(productId)
    }

    return (
        <Container ref={ref}>
            <WishButton size={24} onClick={toggleShow} className="text-red-500" />

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
                <Flex $direction="column">
                    {wishList?.map((pro) => (
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
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </WishListWrapper>
        </Container>
    )
}

export default Wishlist

import Container from '@/components/my/container'
import Flex from '@/components/my/flex'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContextProvider'
import { useUserContext } from '@/context/UserContextProvider'
import { useClearCart } from '@/hooks/api/use-cart'
import Transition from '@/components/transition'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import NewArrivals from '../home/new-arrivals/new-arrivals'
import CartContent from './components/cart-content'
import CartSummary from './components/cart-summary'

export type NewOrderProps = {
    address: string
    phoneNumber: string
    couponName?: string
    note?: string
}

const Cart = () => {
    const { currentUser } = useUserContext()

    const [newOrderData, setNewOrderData] = useState<NewOrderProps>({
        phoneNumber: currentUser.phone ?? '',
        address: currentUser.address ?? '',
    })

    const {
        cart,
        cartQuery: { isLoading },
    } = useCart()

    const isCartFounded = cart && cart?.products && cart?.products.length > 0
    const { mutate: clearCart, isPending: isClearing } = useClearCart()

    if (isLoading) {
        return (
            <div>
                <BeatLoader color="hsl(var(--primary))" className="my-20 text-center" />
            </div>
        )
    }
    return (
        <Container>
            <Helmet>
                <title>Cart</title>
            </Helmet>

            <Transition className="my-3">
                <h2 className="my-8 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-center font-bold text-transparent max-md:text-xl">
                    {isCartFounded ? 'Cart' : 'Cart is empty'}
                    {isCartFounded && (
                        <Button
                            variant="link"
                            size="sm"
                            className="underline"
                            onClick={() => clearCart()}
                            disabled={isClearing}
                        >
                            {isClearing ? (
                                <BeatLoader color="hsl(var(--primary))" size={8} />
                            ) : (
                                'Clear'
                            )}
                        </Button>
                    )}
                </h2>
                {isCartFounded ? (
                    <>
                        <Flex gap="md" className="max-lg:flex-col">
                            {/* Cart Content */}
                            <CartContent
                                newOrderData={newOrderData}
                                setNewOrderData={setNewOrderData}
                            />
                            {/* Cart Summary */}
                            <CartSummary
                                newOrderData={newOrderData}
                                setNewOrderData={setNewOrderData}
                            />
                        </Flex>

                        <NewArrivals />
                    </>
                ) : (
                    <Flex className="my-24 flex-col items-center justify-center gap-6">
                        <img
                            src="/assets/empty-cart.svg"
                            alt="empty cart"
                            className="mx-auto mt-12 w-4/5 sm:w-96"
                        />
                        <Button>
                            <Link to={'/shop'}>
                                <span>Continue Shopping</span>
                            </Link>
                        </Button>
                    </Flex>
                )}
            </Transition>
        </Container>
    )
}

export default Cart

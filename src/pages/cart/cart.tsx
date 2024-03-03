import Container from '@/components/my/container'
import Flex from '@/components/my/flex'
import { useUserContext } from '@/context/UserContextProvider'
import Transition from '@/utils/transition'
import { Box } from '@radix-ui/themes'
import CartItem from './cart-item'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const Cart = () => {
    const { currentUser } = useUserContext()
    const { cart } = currentUser

    return (
        <Container>
            <Transition className="my-3">
                <h2 className="my-8 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-center font-bold text-transparent max-md:text-xl">
                    {cart?.products.length != undefined && cart?.products.length > 0 ? 'Your Cart' : 'Cart is empty'}
                </h2>
                {cart?.products.length != undefined && cart?.products.length > 0 ? (
                    <Flex gap="md" className="max-lg:flex-col">
                        {/* Cart Content */}
                        <Box className="flex-1 space-y-5">
                            <Flex gap="sm">
                                <span className="flex-[3] text-lg font-medium uppercase">Product</span>
                                <span className="flex-1 text-lg font-medium uppercase">price</span>
                                {/* <span className="flex-1 text-lg font-medium uppercase max-sm:hidden">Quantity</span> */}
                                <span className="flex-1 text-lg font-medium uppercase max-sm:hidden">Total</span>
                            </Flex>
                            {/* Cart Items */}
                            <div className="space-y-3">
                                {cart?.products.map((product) => <CartItem cartItem={product} key={product._id} />)}
                            </div>
                        </Box>
                        {/* Cart Summary */}
                        <Box className="h-fit w-full border px-3 py-1 lg:w-[300px]">
                            <h6 className="border-b border-foreground pb-1">Order Summary</h6>
                            <h6 className="border-b border-foreground pb-1">Order Summary</h6>
                            <h6 className="border-b border-foreground pb-1">Order Summary</h6>
                            <h6 className="border-b border-foreground pb-1">Order Summary</h6>
                            <h6 className="border-b border-foreground pb-1">Order Summary</h6>
                            <h6 className="border-b border-foreground pb-1">Order Summary</h6>
                            <h6 className="border-b border-foreground pb-1">Order Summary</h6>
                        </Box>
                    </Flex>
                ) : (
                    <Flex className="flex-col items-center justify-center gap-6">
                        <img src="/assets/empty-cart.svg" alt="empty cart" className="mx-auto mt-12 w-4/5 sm:w-96" />
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

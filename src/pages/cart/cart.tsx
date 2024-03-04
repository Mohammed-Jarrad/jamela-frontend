import Container from '@/components/my/container'
import Flex from '@/components/my/flex'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUserContext } from '@/context/UserContextProvider'
import Transition from '@/utils/transition'
import { Box } from '@radix-ui/themes'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CartItem from './cart-item'
import CartSummary from './cart-summary'

const Cart = () => {
    const [note, setNote] = useState('')
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
                        <CartItemsWrapper className="flex-1">
                            {/* Cart Content */}
                            <Box className="w-full space-y-5">
                                <Flex gap="sm">
                                    <span className="flex-[3] text-lg font-medium uppercase">Product</span>
                                    <span className="flex-1 text-lg font-medium uppercase">price</span>
                                    <span className="flex-1 text-lg font-medium uppercase max-sm:hidden">Total</span>
                                </Flex>
                                {/* Cart Items */}
                                <div className="space-y-3">
                                    {cart?.products.map((product) => <CartItem cartItem={product} key={product._id} />)}
                                </div>
                            </Box>

                            {/* Addtional Note */}
                            <AdditionalNote>
                                <span className="text-base font-medium uppercase">Additional Note</span>
                                <Textarea
                                    placeholder="Additional Note"
                                    className="w-full"
                                    rows={5}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </AdditionalNote>
                        </CartItemsWrapper>

                        {/* Cart Summary */}
                        <CartSummary note={note} setNote={setNote} />
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

const CartItemsWrapper = styled(Flex)`
    flex-direction: column;
`
const AdditionalNote = styled(Flex)`
    flex-direction: column;
`

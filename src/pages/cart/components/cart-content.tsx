import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { useCart } from '@/context/CartContextProvider'
import { Flex } from '@/styles/styles'
import React from 'react'
import styled from 'styled-components'
import CartItemRow from './cart-item-row'

type Props = {
    note: string
    setNote: React.Dispatch<React.SetStateAction<string>>
}

const CartContent: React.FC<Props> = ({ note, setNote }) => {
    const { cart } = useCart()

    return (
        <CartItemsWrapper className="flex-1">
            {/* Cart table */}
            <Table>
                <TableHeader>
                    <TableRow className="text-base capitalize font-poppins">
                        <TableHead className="py-4 px-2 text-left">Product</TableHead>
                        <TableHead className="py-4 px-2 text-center">Price</TableHead>
                        <TableHead className="py-4 px-2 text-center max-sm:hidden">Total</TableHead>
                        <TableHead className="py-4 px-2 text-center w-[70px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cart?.products.map((item) => (
                        <CartItemRow cartItem={item} key={item._id} />
                    ))}
                </TableBody>
            </Table>

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
    )
}

export default CartContent

const CartItemsWrapper = styled(Flex)`
    flex-direction: column;
`
const AdditionalNote = styled(Flex)`
    flex-direction: column;
`

import { OptionalSpan } from '@/components/required-star'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { useCart } from '@/context/CartContextProvider'
import { Flex } from '@/styles/styles'
import React from 'react'
import styled from 'styled-components'
import { NewOrderProps } from '../cart'
import CartItemRow from './cart-item-row'

type Props = {
    newOrderData: NewOrderProps
    setNewOrderData: React.Dispatch<React.SetStateAction<NewOrderProps>>
}

const CartContent: React.FC<Props> = ({ newOrderData, setNewOrderData }) => {
    const { cart } = useCart()

    return (
        <CartItemsWrapper className="flex-1 space-y-5">
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
                <Label htmlFor="note" className="text-base font-medium uppercase">
                    Additional Note <OptionalSpan />
                </Label>
                <Textarea
                    placeholder="Additional Note"
                    className="w-full"
                    id="note"
                    rows={5}
                    value={newOrderData.note || ''}
                    onChange={({ target: { value } }) =>
                        setNewOrderData((pre) => ({ ...pre, note: value }))
                    }
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

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserContext } from '@/context/UserContextProvider'
import { Flex, mq } from '@/styles/styles'
import { useState } from 'react'
import styled, { css } from 'styled-components'

type Props = {
    note: string
    setNote: React.Dispatch<React.SetStateAction<string>>
}

const CartSummary: React.FC<Props> = () => {
    const { currentUser } = useUserContext()
    const { cart } = currentUser

    const [address, setAddress] = useState<string>(currentUser.address || '')
    const [phoneNumber, setPhoneNumber] = useState<string>(currentUser.phone || '')
    const [couponName, setCouponName] = useState<string>('')

    return (
        <Wrapper>
            <Title>Order Summary</Title>
            <Flex $items="center" $justify="space-between">
                <p className="truncate text-muted-foreground">Sub Total</p>
                <p>
                    ₪
                    {cart?.products
                        .reduce((acc, curr) => acc + (curr?.productId?.finalPrice || 0) * curr.quantity, 0)
                        .toFixed(2)}
                </p>
            </Flex>
            <HR />
            <Flex $direction="column">
                <p className="mb-3 truncate text-muted-foreground">Shipping Address</p>
                <Flex $direction="column" $gap="lg">
                    <InputBox>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </InputBox>
                    <InputBox>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </InputBox>
                </Flex>
            </Flex>
            <HR />
            <InputBox>
                <Label htmlFor="couponName" className="text-base font-semibold">
                    Coupon Code
                </Label>
                <span className="text-sm text-muted-foreground">Coupon code will be applied on the checkout page</span>
                <Input
                    id="couponName"
                    value={couponName}
                    onChange={(e) => setCouponName(e.target.value)}
                    placeholder="XXX"
                />
            </InputBox>
            {/* Buttons */}
            <Flex $direction="column" className="mt-4">
                <CustomButtom $main={true} size="lg" variant="outline">
                    Checkout
                </CustomButtom>
                <CustomButtom size="lg" variant="outline">
                    Continue Shopping
                </CustomButtom>
            </Flex>
        </Wrapper>
    )
}

export default CartSummary

const Wrapper = styled.div`
    position: sticky;
    top: var(--header-height);
    height: fit-content;
    padding: 5px 20px;
    width: 300px;
    ${mq.lgMax`
        width: 100%;
    `};
`

const Title = styled.p`
    font-weight: 600;
    font-size: 15px;
    padding-bottom: 4px;
    border-bottom: 1px solid hsl(var(--foreground) / 50%);
    margin-bottom: 16px;
`
const InputBox = styled(Flex).attrs({ $direction: 'column' })``

const HR = styled.hr`
    border: 1px solid hsl(var(--border));
    margin: 10px 0;
    width: 100%;
`
const CustomButtom = styled(Button)<{ $main?: boolean }>`
    width: 100%;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 14px;
    ${({ $main }) => css`
        background: ${$main ? 'hsl(var(--primary))' : 'hsl(var(--background))'};
        color: ${$main ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))'};
        &:hover {
            background: ${$main ? 'hsl(var(--background))' : 'hsl(var(--primary))'};
            color: ${$main ? 'hsl(var(--foreground))' : 'hsl(var(--primary-foreground))'};
        }
    `}
`

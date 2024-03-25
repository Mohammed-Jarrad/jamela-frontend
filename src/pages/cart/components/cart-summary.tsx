import RequiredStar, { OptionalSpan } from '@/components/required-star'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/context/CartContextProvider'
import { useCheckCoupon } from '@/hooks/use-coupons'
import { cn } from '@/lib/utils'
import { yupValidateForm } from '@/lib/yup-validate-form'
import { Flex, mq } from '@/styles/styles'
import { useState } from 'react'
import { BiShekel } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import styled, { css } from 'styled-components'
import * as Yup from 'yup'
import { NewOrderProps } from '../cart'

type Props = {
    newOrderData: NewOrderProps
    setNewOrderData: React.Dispatch<React.SetStateAction<NewOrderProps>>
}

const CartSummary: React.FC<Props> = ({ newOrderData, setNewOrderData }) => {
    const { cart } = useCart()

    const subTotal: number = Number(
        cart?.products
            .reduce((acc, item) => acc + (item?.productId?.finalPrice || 0) * item.quantity, 0)
            .toFixed(2)
    )

    const [finalPrice, setFinalPrice] = useState<number>(subTotal)
    const { data: validCoupon, mutate: checkCoupon, isPending: isCheckingCoupon } = useCheckCoupon()

    function handleChangeNewOrderData(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setNewOrderData((pre) => ({ ...pre, [name]: value }))
    }
    function handleCheckCoupon(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const schema = Yup.object().shape({
            couponName: Yup.string()
                .required('Coupon name is required')
                .max(10)
                .min(3)
                .label('Coupon Name'),
        })

        if (!yupValidateForm(schema, { couponName: newOrderData.couponName })) return

        checkCoupon(
            { couponName: newOrderData.couponName },
            {
                onSuccess: ({ coupon: { amount } }) => {
                    if (amount) {
                        setFinalPrice((prev) =>
                            parseFloat((prev - prev * (amount / 100)).toFixed(2))
                        )
                    }
                },
                onError: () => {
                    setFinalPrice(subTotal)
                    setNewOrderData((pre) => ({ ...pre, couponName: '' }))
                },
            }
        )
    }
    function handleCreateOrder() {
        const schema = Yup.object().shape({
            address: Yup.string().required('Address is required'),
            phoneNumber: Yup.string().required('Phone number is required'),
            note: Yup.string(),
            couponName: Yup.string().min(3).max(10),
        })
        if (!yupValidateForm(schema, newOrderData)) return

        // TODO: create order
    }

    return (
        <Wrapper>
            <Title>Order Summary</Title>
            <Flex $items="center" $justify="space-between">
                <p className="truncate text-muted-foreground">
                    Subtotal ({cart?.products.length} items)
                </p>
                <p className="flex items-center">
                    <BiShekel />
                    {subTotal}
                </p>
            </Flex>

            <HR />
            <Flex $direction="column">
                <p className="mb-3 truncate text-base font-semibold">Shipping Address</p>
                <Flex $direction="column" $gap="lg">
                    <InputBox>
                        <Label htmlFor="address" className="text-muted-foreground">
                            Address <RequiredStar />
                        </Label>
                        <Input
                            id="address"
                            placeholder="Address"
                            value={newOrderData.address}
                            name="address"
                            onChange={handleChangeNewOrderData}
                        />
                    </InputBox>
                    <InputBox>
                        <Label htmlFor="phoneNumber" className="text-muted-foreground">
                            Phone Number <RequiredStar />
                        </Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={newOrderData.phoneNumber}
                            onChange={handleChangeNewOrderData}
                        />
                    </InputBox>
                </Flex>
            </Flex>
            <HR />
            <InputBox as="form" onSubmit={handleCheckCoupon}>
                <Label htmlFor="couponName" className="text-base font-semibold">
                    Coupon Code <OptionalSpan />
                </Label>
                <span className="text-sm text-muted-foreground">
                    Coupon code will be applied on the checkout page
                </span>
                <Flex>
                    <Input
                        id="couponName"
                        name="couponName"
                        value={newOrderData.couponName}
                        onChange={handleChangeNewOrderData}
                        placeholder="XXXXXXXX"
                        className="flex-1"
                    />
                    <Button variant="link" disabled={isCheckingCoupon} size={'sm'} type="submit">
                        {isCheckingCoupon ? (
                            <BeatLoader size={10} color="hsl(var(--primary)" />
                        ) : (
                            'Check Coupon'
                        )}
                    </Button>
                </Flex>
                {/* Coupon info */}
                {finalPrice < subTotal && (
                    <div className="text-sm text-muted-foreground">
                        {isCheckingCoupon ? (
                            <BeatLoader size={10} color="hsl(var(--primary)" />
                        ) : (
                            <>
                                <p>
                                    You will get <strong>{validCoupon?.coupon?.amount}%</strong> off
                                </p>
                                <p>on your next order with this coupon code</p>
                                <div className="flex items-center justify-between">
                                    <b className="text-primary">{validCoupon?.coupon.name}</b>
                                    <Button
                                        onClick={() => {
                                            setNewOrderData((pre) => ({ ...pre, couponName: '' }))
                                            setFinalPrice(subTotal)
                                        }}
                                        size={'sm'}
                                        variant={'link'}
                                        className="p-0 underline"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                )}
                <Flex
                    $items="center"
                    $justify="space-between"
                    className={cn('my-2 rounded-lg p-2', {
                        'ring-1 ring-green-500': finalPrice < subTotal,
                    })}
                >
                    <p className="truncate font-semibold">Total</p>

                    <p className="flex items-center gap-2">
                        <span className="flex items-center">
                            <BiShekel /> {finalPrice}
                        </span>
                        {finalPrice < subTotal && (
                            <span className="flex items-center line-through">
                                <BiShekel /> {subTotal}
                            </span>
                        )}
                    </p>
                </Flex>
            </InputBox>
            {/* Buttons */}
            <Flex $direction="column" className="mt-4">
                <CustomButtom $main={true} size="lg" variant="outline" onClick={handleCreateOrder}>
                    Checkout
                </CustomButtom>
                <CustomButtom size="lg" variant="outline">
                    <Link to={'/shop'}>Continue Shopping</Link>
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

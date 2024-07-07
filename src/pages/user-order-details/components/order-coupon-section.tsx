import Alert from '@/components/alert'
import CustomInput from '@/components/my/custom-input'
import ToolTip from '@/components/my/tooltip'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useUserContext } from '@/context/UserContextProvider'
import { useChangeOrderCoupon, useRemoveOrderCoupon } from '@/hooks/api/use-orders'
import { cn } from '@/lib/utils'
import { yupValidateForm } from '@/lib/yup-validate-form'
import { OrderProps } from '@/types'
import { Edit2, Trash } from 'lucide-react'
import React from 'react'
import { RiCoupon2Fill } from 'react-icons/ri'
import { BeatLoader } from 'react-spinners'
import * as Yup from 'yup'

type Props = {
    order: OrderProps
}
const OrderCouponSection: React.FC<Props> = ({ order }) => {
    const { mutate: changeOrderCoupon, isPending: isChanging } = useChangeOrderCoupon()
    const { mutate: removeOrderCoupon, isPending: isRemoving } = useRemoveOrderCoupon()
    const [newCoupon, setNewCoupon] = React.useState<string>(order.couponName!)
    const [showForm, setShowForm] = React.useState(false)
    const {
        currentUser: { role },
    } = useUserContext()

    const changeOrderCouponHandler = (e: React.FormEvent) => {
        e.preventDefault()
        const schema = Yup.object().shape({
            newCoupon: Yup.string()
                .required('Coupon name is required')
                .max(10)
                .label('Coupon Name'),
        })
        if (!yupValidateForm<{ newCoupon: string }>(schema, { newCoupon })) return

        changeOrderCoupon(
            { orderId: order._id, couponName: newCoupon },
            {
                onSuccess: ({ order: { couponName: newCouponName } }) => {
                    setNewCoupon(newCouponName as string)
                    setShowForm(false)
                },
                onError: () => {
                    setNewCoupon(order.couponName || '')
                    setShowForm(false)
                },
            }
        )
    }
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-4">
                    <b className="text-muted-foreground flex items-center gap-1">
                        <RiCoupon2Fill size={18} color="hsl(var(--primary))" /> Coupon
                    </b>
                    <div
                        className={cn(
                            'flex items-baseline gap-2',
                            order.status !== 'pending' && 'hidden',
                            role !== 'User' && 'hidden'
                        )}
                    >
                        {order.couponName && (
                            <Alert
                                description={
                                    <>
                                        This Action will remove the coupon of this order. <br />
                                        And the price will be recalculated. <br />
                                        This Action cannot be undone.
                                    </>
                                }
                                onConfirm={() =>
                                    removeOrderCoupon(
                                        { orderId: order._id },
                                        {
                                            onSuccess: () => setNewCoupon(''),
                                        }
                                    )
                                }
                            >
                                {isRemoving ? (
                                    <BeatLoader color="hsl(var(--primary))" size={8} />
                                ) : (
                                    <div>
                                        <ToolTip content="Remove Coupon">
                                            <Trash
                                                size={16}
                                                className="pointer text-red-500 hover:text-red-600"
                                            />
                                        </ToolTip>
                                    </div>
                                )}
                            </Alert>
                        )}
                        <Popover open={showForm} onOpenChange={setShowForm}>
                            <PopoverTrigger>
                                {isChanging ? (
                                    <BeatLoader color="hsl(var(--primary))" size={8} />
                                ) : (
                                    <div>
                                        <ToolTip content="Change Coupon">
                                            <Edit2
                                                size={16}
                                                className="pointer text-green-500 hover:text-green-600"
                                            />
                                        </ToolTip>
                                    </div>
                                )}
                            </PopoverTrigger>
                            <PopoverContent>
                                <form className="space-y-2">
                                    <CustomInput
                                        value={newCoupon}
                                        onChange={(e) => setNewCoupon(e.target.value)}
                                        placeholder="Enter coupon name"
                                        name="newCoupon"
                                        label="Coupon Name"
                                        isRequired
                                    />
                                    <Button
                                        type="submit"
                                        onClick={changeOrderCouponHandler}
                                        disabled={isChanging}
                                        className="w-full"
                                    >
                                        {isChanging ? (
                                            <BeatLoader color="white" size={8} />
                                        ) : (
                                            'Change'
                                        )}
                                    </Button>
                                </form>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <p
                    className={cn(
                        'font-medium',
                        order.couponName ? 'text-foreground' : 'text-destructive'
                    )}
                >
                    {order.couponName ? order.couponName : 'N/A'}
                </p>
            </div>
        </div>
    )
}

export default OrderCouponSection

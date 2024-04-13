import OrderStatus from '@/components/my/order-status'
import { OptionalSpan } from '@/components/required-star'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useChangeOrderStatus } from '@/hooks/use-orders'
import { yupValidateForm } from '@/lib/yup-validate-form'
import { Flex } from '@/styles/styles'
import { OrderProps, OrderStatus as OrderStatusEnum, OrderStatusProps } from '@/types'
import React, { useEffect, useState } from 'react'
import { BeatLoader } from "react-spinners"
import * as Yup from 'yup'

type Props = {
    order: OrderProps
}

const AdminChangeOrderStatus: React.FC<Props> = ({ order }) => {
    type Data = {
        status: OrderStatusProps
        reasonRejected?: string
    }
    const allStatus = Object.values(OrderStatusEnum)
    const [isCancelled, setIsCancelled] = useState(order.status === 'cancelled')
    const [data, setData] = useState<Data>({
        status: order.status,
        reasonRejected: order.reasonRejected
    })
    const { mutate: update, isPending } = useChangeOrderStatus()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const schema = Yup.object().shape({
            status: Yup.string().required('Status is required'),
            reasonRejected: Yup.string(),
        })
        const isValidData = yupValidateForm(schema, data)
        if (!isValidData) return
        update({
            orderId: order._id,
            status: data.status,
            ...(data.reasonRejected && { reasonRejected: data.reasonRejected }),
        })
    }

    useEffect(() => {
        setIsCancelled(data.status === 'cancelled')
    }, [data.status])

    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="status" className="flex items-center gap-2">
                        <span>Status</span>
                        <OrderStatus status={data.status} />
                    </Label>
                    <Select
                        onValueChange={(value) =>
                            setData({ ...data, status: value as OrderStatusProps })
                        }
                        value={data.status}
                        name="status"
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={data.status} />
                        </SelectTrigger>
                        <SelectContent>
                            {allStatus.map((s) => (
                                <SelectItem key={s} value={s}>
                                    {s}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {isCancelled && (
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="reasonRejected" className="flex items-center gap-2">
                            Reason for cancellation <OptionalSpan />
                        </Label>
                        <Textarea
                            name="reasonRejected"
                            id="reasonRejected"
                            onChange={(e) => setData({ ...data, reasonRejected: e.target.value })}
                            value={data.reasonRejected || ''}
                            className="w-full h-24 resize-none"
                        />
                    </div>
                )}

                <Flex $items="center" className="self-end">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="submit" className="w-40" disabled={isPending}>
                        {isPending ? <BeatLoader size={8} color="white" /> : 'Submit'}
                    </Button>
                </Flex>
            </form>
        </div>
    )
}

export default AdminChangeOrderStatus

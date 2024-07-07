import { OrderProps } from '@/types'
import React from 'react'

type Props = {
    order: OrderProps
}

const OrderReasonRejectedSection: React.FC<Props> = ({ order }) => {
    return (
        <div className="space-y-2">
            <div className="flex flex-col gap-3">
                <strong className="text-primary text-xl">Cancellation Reason</strong>

                <p className="text-sm text-muted-foreground border border-dashed border-muted-foreground p-4 bg-muted rounded">
                    {order.reasonRejected!.split('\n').map((line, index) => (
                        <span key={index}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            </div>
        </div>
    )
}

export default OrderReasonRejectedSection

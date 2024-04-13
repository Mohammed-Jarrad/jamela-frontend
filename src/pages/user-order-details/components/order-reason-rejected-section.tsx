import { OrderProps } from '@/types'
import { MessageCircle } from 'lucide-react'
import React from 'react'

type Props = {
    order: OrderProps
}

const OrderReasonRejectedSection: React.FC<Props> = ({ order }) => {
    return (
        <div className="space-y-2">
            <div className="flex flex-col gap-3">
                <b className="text-muted-foreground flex items-center gap-1">
                    <MessageCircle size={18} color="hsl(var(--primary))" /> Reason for cancellation
                </b>

                <p className="text-sm text-muted-foreground border border-dashed border-muted-foreground px-2 py-1 bg-muted rounded">
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

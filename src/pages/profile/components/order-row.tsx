import Alert from '@/components/alert'
import OrderStatus from '@/components/my/order-status'
import ToolTip from '@/components/my/tooltip'
import { Button, buttonVariants } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useCancelOrder } from '@/hooks/api/use-orders'
import { cn } from '@/lib/utils'
import { Flex } from '@/styles/styles'
import { OrderProps } from '@/types'
import { format } from 'date-fns'
import React from 'react'
import { BiShekel } from 'react-icons/bi'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

type Props = {
    order: OrderProps
    index: number
}

const OrderRow: React.FC<Props> = ({ order, index }) => {
    const { mutate: cancel, isPending: isCancelling } = useCancelOrder()

    function handleCancleOrder(orderId: string) {
        cancel(orderId, {})
    }

    return (
        <TableRow>
            <TableCell className="text-center font-bold">{index + 1}</TableCell>
            <TableCell className="text-center">
                {format(new Date(order.createdAt), 'dd-MM-yyyy')}
            </TableCell>
            <TableCell className="text-center">
                <span className="truncate">{order.address}</span>
            </TableCell>
            <TableCell className="text-center w-[120px]">
                <OrderStatus status={order.status} />
            </TableCell>
            <TableCell className="text-center w-[120px]">{order.products.length}</TableCell>
            <TableCell
                className={cn(
                    'text-center w-[120px]',
                    !order.couponName && 'text-red-500 font-medium'
                )}
            >
                {order.couponName ? order.couponName : 'N/A'}
            </TableCell>
            <TableCell className="text-left w-[130px]">
                <Flex $center={true} $gap="sm">
                    <BiShekel />
                    <span>{order.finalPrice}</span>
                </Flex>
            </TableCell>
            <TableCell className="flex items-center w-[120px]">
                <ToolTip content="Show details">
                    <Link
                        to={`/order/${order._id}`}
                        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
                    >
                        <FaEye size={18} className="text-muted-foreground hover:text-foreground" />
                    </Link>
                </ToolTip>
                {order.status == 'pending' && (
                    <Alert
                        onConfirm={() => handleCancleOrder(order._id)}
                        cancelText="No"
                        description={
                            <>
                                Are you sure you want to cancel this order? <br />
                                This action cannot be undone.
                            </>
                        }
                    >
                        <Button
                            size={'sm'}
                            variant={'link'}
                            className="text-red-500 hover:text-red-500"
                        >
                            {isCancelling ? (
                                <BeatLoader size={7} color="hsl(var(--primary))" />
                            ) : (
                                'Cancel'
                            )}
                        </Button>
                    </Alert>
                )}
            </TableCell>
        </TableRow>
    )
}

export default OrderRow

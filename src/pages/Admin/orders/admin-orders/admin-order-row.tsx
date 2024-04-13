import Dialog from '@/components/my/my-dialog'
import OrderStatus from '@/components/my/order-status'
import ToolTip from '@/components/my/tooltip'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Flex } from '@/styles/styles'
import { OrderProps } from '@/types'
import { format } from 'date-fns'
import { Edit2Icon, Trash } from 'lucide-react'
import React from 'react'
import { BiShekel } from 'react-icons/bi'
import { FaEye } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import AdminChangeOrderStatus from './admin-change-order-status'
import Alert from '@/components/alert'
import { useDeleteOrder } from '@/hooks/use-orders'
import { BeatLoader } from "react-spinners"

type Props = {
    order: OrderProps
    index: number
}

const AdminOrderRow: React.FC<Props> = ({ order, index }) => {
    const { mutate: deleteOrder, isPending } = useDeleteOrder()

    return (
        <TableRow>
            <TableCell className="text-center font-bold">{index + 1}</TableCell>
            <TableCell className="text-center">
                <div className="flex items-center gap-2 w-[220px]">
                    <img
                        src={order.userId.image?.secure_url}
                        className="size-10 circle object-cover"
                        alt={order.userId.username}
                    />
                    <p className="truncate capitalize">{order.userId.username}</p>
                </div>
            </TableCell>
            <TableCell className="text-center">
                {format(new Date(order.createdAt), 'dd-MM-yyyy')}
            </TableCell>
            <TableCell className="text-center">
                <span className="truncate">{order.address}</span>
            </TableCell>
            <TableCell className="text-center w-[120px]">
                <div className="flex items-center gap-1">
                    <OrderStatus status={order.status} />
                    {order.status !== 'delivered' && (
                        <Dialog
                            trigger={
                                <div>
                                    <ToolTip content="Edit">
                                        <Button size={'icon'} variant={'ghost'}>
                                            <Edit2Icon
                                                size={16}
                                                className="text-muted-foreground hover:text-foreground"
                                            />
                                        </Button>
                                    </ToolTip>
                                </div>
                            }
                            header="Edit Status"
                            description="Update the status of the order"
                        >
                            <AdminChangeOrderStatus order={order} />
                        </Dialog>
                    )}
                </div>
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
                <div className="flex items-center">
                    <Link to={`/dashboard/orders/${order._id}`}>
                        <ToolTip content="Show details">
                            <Button size={'icon'} variant={'ghost'}>
                                <FaEye
                                    size={18}
                                    className="text-muted-foreground hover:text-green-500"
                                />
                            </Button>
                        </ToolTip>
                    </Link>
                    <Alert onConfirm={() => deleteOrder({ orderId: order._id })}>
                        <Button size="icon" variant={'ghost'} disabled={isPending}>
                            {
                                isPending ? (
                                    <BeatLoader size={8} color="hsl(var(--primary))" />
                                ) : (
                                    <Trash size={18} className="text-muted-foreground hover:text-red-500" />
                                )
                            }
                        </Button>
                    </Alert>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default AdminOrderRow

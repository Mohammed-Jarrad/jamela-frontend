import { OrderStatusProps } from '@/types'
import React from 'react'
import { Badge } from '../ui/badge'
import { PiHourglassSimpleHighFill } from 'react-icons/pi'
import { MdDoneAll } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'
import { BsCheck2Circle } from 'react-icons/bs'
import { FaCarSide } from 'react-icons/fa6'
import { IconType } from 'react-icons/lib'

type Props = {
    status: OrderStatusProps
}

const OrderStatus: React.FC<Props> = ({ status }) => {
    function statusIcon(status: OrderStatusProps): IconType {
        switch (status) {
            case 'pending':
                return PiHourglassSimpleHighFill
            case 'delivered':
                return MdDoneAll
            case 'cancelled':
                return TiCancel
            case 'confirmed':
                return BsCheck2Circle
            case 'onWay':
                return FaCarSide
        }
    }
    function statusText(status: OrderStatusProps) {
        switch (status) {
            case 'pending':
                return 'Pending'
            case 'delivered':
                return 'Delivered'
            case 'cancelled':
                return 'Cancelled'
            case 'confirmed':
                return 'Confirmed'
            case 'onWay':
                return 'On Way'
        }
    }
    const Icon = statusIcon(status)
    return (
        <Badge
            data-status={status}
            className="bg-gradient-to-r data-[status=cancelled]:from-red-500 data-[status=delivered]:from-green-500 data-[status=pending]:from-yellow-500 data-[status=onWay]:from-blue-500 data-[status=confirmed]:from-cyan-500 data-[status=cancelled]:to-red-600 data-[status=delivered]:to-green-600 data-[status=pending]:to-yellow-600 data-[status=onWay]:to-blue-600 data-[status=confirmed]:to-cyan-600 gap-1 w-24 justify-center"
        >
            <Icon color="white" size={15}/>
            <span>{statusText(status)}</span>
        </Badge>
    )
}

export default OrderStatus

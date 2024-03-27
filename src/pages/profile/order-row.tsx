import ToolTip from "@/components/my/tooltip"
import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from "@/lib/utils"
import { Flex } from '@/styles/styles'
import { OrderProps } from '@/types'
import { format } from 'date-fns'
import React from 'react'
import { BiShekel } from 'react-icons/bi'
import { BsCheck2Circle } from 'react-icons/bs'
import { FaCarSide, FaEye } from "react-icons/fa"
import { IconType } from "react-icons/lib"
import { MdDoneAll } from "react-icons/md"
import { PiHourglassSimpleHighFill } from "react-icons/pi"
import { TiCancel } from "react-icons/ti"



type Props = {
    order: OrderProps
    index: number
}

const OrderRow: React.FC<Props> = ({ order, index }) => {
    function statusColor(status: OrderProps['status']) {
        const style: { color?: string, icon?: IconType, text?: string } = {}
        
        switch (status) {
            case 'pending':
                style.color = 'bg-gradient-to-r from-indigo-500 to-sky-500 from-30%'
                style.icon = PiHourglassSimpleHighFill
                style.text = 'Pending'
                break;
            case 'delivered':
                style.color = 'bg-gradient-to-r from-green-500 to-emerald-500'
                style.icon = MdDoneAll 
                style.text = 'Delivered'
                break;
            case 'cancelled':
                style.color = 'bg-gradient-to-r from-red-500 to-orange-500'
                style.icon = TiCancel 
                style.text = 'Cancelled'
                break;
            case 'confirmed':
                style.color = 'bg-gradient-to-r from-fuchsia-500 to-pink-500'
                style.icon = BsCheck2Circle 
                style.text = 'Confirmed'
                break;
            case 'onWay':
                style.color = 'bg-gradient-to-r from-sky-500 to-blue-500'
                style.icon = FaCarSide
                style.text = 'On way'
                break;
        }

        const { icon: Icon } = style
        return (
            <div className={cn("flex items-center rounded-lg py-0.5 px-2", style.color)}>
                <Icon className="text-white mr-2" size={18}/>
                <p className="text-white capitalize">{style.text}</p>
            </div>
        )
    }
    
    return (
        <TableRow>
            <TableCell>
                {index + 1}
            </TableCell>
            <TableCell>
                {format(new Date(order.createdAt), 'dd/MM/yyyy')}
            </TableCell>
            <TableCell className="text-center w-[120px]">
                {statusColor(order.status)}
            </TableCell>
            <TableCell className="text-center w-[130px]">
                <Flex $center={true} $gap="sm">
                    <BiShekel />
                    <span>{order.finalPrice}</span>
                </Flex>
            </TableCell>
            <TableCell className="text-center flex justify-center w-[60px]">
                <ToolTip content="Show details">
                    <Button size={'icon'} variant={'ghost'} >
                        <FaEye size={18} className="text-muted-foreground hover:text-foreground"/>
                    </Button>
                </ToolTip>
            </TableCell>
        </TableRow>
    )
}

export default OrderRow

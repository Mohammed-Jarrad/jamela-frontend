import ToolTip from '@/components/my/tooltip'
import { TableSort } from '@/components/table-filter'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { OrderStatus, OrderStatusProps } from '@/types'
import React from 'react'
import { GrClear } from 'react-icons/gr'
import { RiRefreshLine } from 'react-icons/ri'

type Props = {
    sort: string
    setSort: React.Dispatch<React.SetStateAction<string>>
    status: OrderStatusProps | null
    setStatus: React.Dispatch<React.SetStateAction<OrderStatusProps | null>>
    refetch: () => void
}

const OrdersTableFilter: React.FC<Props> = ({ sort, setSort, status, setStatus, refetch }) => {
    const orderStatuses: OrderStatusProps[] = Object.values(OrderStatus)

    return (
        <div className="inline-flex items-center gap-2">
            <Select
                value={status || ''}
                onValueChange={(value) => setStatus(value as OrderStatusProps)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                    {orderStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                            {status}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <TableSort
                setSort={setSort}
                sort={sort}
                sortItems={[
                    { value: '-createdAt', label: 'Date, newest' },
                    { value: 'createdAt', label: 'Date, oldest' },
                    { value: '-finalPrice', label: 'Total, high to low' },
                    { value: 'finalPrice', label: 'Total, low to high' },
                ]}
            />
            <div className="flex items-center gap-1">
                <ToolTip content="Refresh">
                    <Button
                        size="sm"
                        // className="p-0"
                        variant="outline"
                        onClick={() => {
                            refetch()
                        }}
                    >
                        <RiRefreshLine
                            size={20}
                            className="text-muted-foreground hover:text-foreground transition-all"
                        />
                    </Button>
                </ToolTip>
                <ToolTip content="Clear">
                    <Button
                        size="sm"
                        // className="p-0"
                        variant="outline"
                        onClick={() => {
                            setStatus(null)
                            setSort('')
                        }}
                    >
                        <GrClear
                            size={20}
                            className="text-destructive/70 hover:text-destructive transition-all"
                        />
                    </Button>
                </ToolTip>
            </div>
        </div>
    )
}

export default OrdersTableFilter

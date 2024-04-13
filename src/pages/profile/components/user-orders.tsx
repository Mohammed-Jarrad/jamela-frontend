import LimitController from '@/components/limit-controller'
import NoDataMessage from '@/components/not-data'
import TablePaginationAndDetails from '@/components/table-pagination-and-details'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useGetUserOrders } from '@/hooks/use-orders'
import { OrderStatusProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useState } from 'react'
import { Helmet } from "react-helmet"
import OrderRow from './order-row'
import OrdersTableFilter from './orders-table-filter'

const UserOrders = () => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [sort, setSort] = useState<string>('')
    const [status, setStatus] = useState<OrderStatusProps | null>(null)

    const { data, isLoading, error, refetch } = useGetUserOrders({
        page,
        limit,
        ...(sort && { sort }),
        ...(status && { status: { eq: status } }),
    })
    const handleErrors = useHandleErrors()
    if (error) handleErrors(error)

    return (
        <div id="orders" className="my-2">
            <Helmet>
                <title>{'User Orders'}</title>
            </Helmet>
            <div className="my-2 flex md:items-center justify-between flex-col md:flex-row">
                <OrdersTableFilter
                    sort={sort}
                    setSort={setSort}
                    status={status}
                    setStatus={setStatus}
                    refetch={refetch}
                />
            </div>
            {isLoading ? (
                <OrdersLoading />
            ) : (
                <>
                    {data?.orders && data?.orders.length > 0 ? (
                        <>
                            <Table className="text-xs md:text-sm">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-center">Number</TableHead>
                                        <TableHead className="text-center">Date</TableHead>
                                        <TableHead className="text-center">Address</TableHead>
                                        <TableHead className="text-center w-[120px]">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-center w-[80px]">
                                            Items
                                        </TableHead>
                                        <TableHead className="text-center">Coupon</TableHead>
                                        <TableHead className="text-center w-[130px]">
                                            Total
                                        </TableHead>
                                        <TableHead className="w-[120px]">More</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.orders.map((order, idx) => (
                                        <OrderRow key={order._id} order={order} index={idx} />
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow className="px-10">
                                        <TableCell colSpan={4}>
                                            <span className="block">Limit of records</span>
                                        </TableCell>
                                        <TableCell colSpan={4}>
                                            <LimitController
                                                limit={limit}
                                                totalResultsCounts={data.totalResultsCounts}
                                                setLimit={setLimit}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            <div className="my-5">
                                <TablePaginationAndDetails
                                    currentPage={page}
                                    itemsPerPage={limit}
                                    onChange={(page) => setPage(page)}
                                    pagesCount={Math.ceil(data.totalResultsCounts / limit)}
                                    resultCount={data.resultCount}
                                    totalCount={data.totalResultsCounts}
                                    totalResultsCounts={data.totalResultsCounts}
                                />
                            </div>
                        </>
                    ) : (
                        <NoDataMessage message="No Orders Found" />
                    )}
                </>
            )}
        </div>
    )
}

export default UserOrders

export const OrdersLoading = () => {
    return (
        <div className="w-full">
            <Skeleton className="w-full h-10 my-1 square" />
            <Skeleton className="w-full h-10 my-1 square" />
            <Skeleton className="w-full h-10 my-1 square" />
            <Skeleton className="w-full h-10 my-1 square" />
            <Skeleton className="w-full h-10 my-1 square" />
        </div>
    )
}

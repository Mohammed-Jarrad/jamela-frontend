import LimitController from '@/components/limit-controller'
import TablePaginationAndDetails from '@/components/table-pagination-and-details'
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
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import OrderRow from './order-row'

const UserOrders = () => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [sort, setSort] = useState<string>('')

    const { data, isLoading, error } = useGetUserOrders({
        page,
        limit,
        select: 'createdAt, finalPrice, status',
    })
    const handleErrors = useHandleErrors()
    if (isLoading)
        return (
            <div>
                <BeatLoader color="hsl(var(--primary))" className="my-5 text-center" />
            </div>
        )
    if (error) handleErrors(error)
    if (!data) return null

    return (
        <div id="orders" className="my-8">
            <h3 className="font-semibold font-poppins tracking-tight my-3">Your Orders</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Number</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-center w-[120px]">Status</TableHead>
                        <TableHead className="text-center w-[130px]">Total</TableHead>
                        <TableHead className="text-center w-[60px]">More</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.orders.map((order, idx) => (
                        <OrderRow key={order._id} order={order} index={idx} />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="px-10">
                        <TableCell colSpan={3}>
                            <span className="block">Limit of records</span>
                        </TableCell>
                        <TableCell colSpan={2}>
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
        </div>
    )
}

export default UserOrders

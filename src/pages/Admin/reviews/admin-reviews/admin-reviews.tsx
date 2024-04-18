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
import { useGetReviews } from '@/hooks/use-reviews'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import AdminReviewRow from '../components/admin-review-row'

const AdminReviews = () => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)

    const { data, isLoading, error } = useGetReviews({
        limit,
        page,
    })
    const handleErrors = useHandleErrors()

    if (error) handleErrors(error)

    return (
        <div className="my-2">
            <Helmet>
                <title>Admin Reviews</title>
            </Helmet>
            {isLoading ? (
                <ReviewsLoading />
            ) : (
                <>
                    {data?.reviews && data?.reviews.length > 0 ? (
                        <>
                            <Table className="text-xs md:text-sm">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Number</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Comment</TableHead>
                                        <TableHead className="text-center w-[80px]">
                                            Rating
                                        </TableHead>
                                        <TableHead className="text-center w-[120px]">
                                            More
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.reviews.map((review, idx) => (
                                        <AdminReviewRow
                                            key={review._id}
                                            review={review}
                                            index={idx}
                                        />
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
                        <NoDataMessage message="No Reviews Found" />
                    )}
                </>
            )}
        </div>
    )
}

export default AdminReviews

export const ReviewsLoading = () => {
    return (
        <div className="w-full flex flex-col gap-1">
            <Skeleton className="w-full h-10 square" />
            <Skeleton className="w-full h-10 square" />
            <Skeleton className="w-full h-10 square" />
            <Skeleton className="w-full h-10 square" />
            <Skeleton className="w-full h-10 square" />
            <Skeleton className="w-full h-10 square" />
            <Skeleton className="w-full h-10 square" />
            <Skeleton className="w-full h-10 square" />
        </div>
    )
}

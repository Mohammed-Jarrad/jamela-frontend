import LimitController from '@/components/limit-controller'
import Flex from '@/components/my/flex'
import ToolTip from '@/components/my/tooltip'
import {
    TableCreateLinkButton,
    TableCreateLinkButtonProps,
    TableRefreshData,
    TableRefreshDataProps,
    TableSearch,
    TableSearchProps,
    TableSort,
    TableSortProps,
} from '@/components/table-filter'
import TablePaginationAndDetails from '@/components/table-pagination-and-details'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    useGetCoupons,
    useHardDeleteCoupon,
    useRestoreCoupon,
    useSoftDeleteCoupon,
} from '@/hooks/use-coupons'
import { cn } from '@/lib/utils'
import Transition from '@/utils/transition'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { format } from 'date-fns'
import { Copy } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { BeatLoader } from 'react-spinners'
import { toast } from 'sonner'
import CouponsDropDownWithAlertDialog from './coupons-dropdown-with-alert-dialog'
import NoDataMessage from "@/components/not-data"

const sortItems = [
    { value: 'name', label: 'Name, A-Z' },
    { value: '-name', label: 'Name, Z-A' },
    { value: 'expireDate', label: 'Expire Date, oldest' },
    { value: '-expireDate', label: 'Expire Date, newest' },
    { value: 'createdAt', label: 'Date, oldest' },
    { value: '-createdAt', label: 'Date, newest' },
    { value: 'isDeleted', label: 'Status, A-Z' },
    { value: '-isDeleted', label: 'Status, Z-A' },
]

const AdminCoupons = () => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [search, setSearch] = useState<string>()
    const [sort, setSort] = useState<string>()

    // get all coupons query
    const { data, isLoading, error } = useGetCoupons({ page, limit, search, sort })
    // hard delete mutatuin
    const { mutate: hardDelete, isPending: isHardDeleting } = useHardDeleteCoupon()
    // soft delete mutation
    const { mutate: softDelete, isPending: isSoftDeleting } = useSoftDeleteCoupon()
    // restore coupon mutation
    const { mutate: restore, isPending: isRestoring } = useRestoreCoupon()
    const handleErrors = useHandleErrors()
    const pagesCount = data ? Math.ceil(data?.totalResultsCounts / limit) : 0

    function copy(text: string) {
        navigator.clipboard.writeText(text)
        toast.success(`Copied ${text}`)
    }

    if (error) handleErrors(error)

    return (
        <Transition>
            <Helmet>
                <title>Admin Coupons</title>
            </Helmet>
            {/* search categories and refresh and create link and sort */}
            <CouponsTableFilters
                sortItems={sortItems}
                search={search}
                sort={sort}
                setSort={setSort}
                onRefresh={() => {
                    setLimit(5)
                    setPage(1)
                    setSearch(undefined)
                    setSort(undefined)
                }}
                onSearch={(value) => {
                    setPage(1)
                    setSearch(value)
                }}
                link="/dashboard/coupons/create"
            />

            {data?.coupons.length == 0 ? (
                <NoDataMessage className="mt-12" message="No Coupons Found" />
            ) : (
                <>
                    {(isHardDeleting || isSoftDeleting || isRestoring) && (
                        <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
                    )}
                    {isLoading ? (
                        <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
                    ) : (
                        <>
                            <Table className="max-md:text-xs">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Number</TableHead>
                                        <TableHead>Coupon</TableHead>
                                        <TableHead className="whitespace-nowrap">
                                            Expire Date
                                        </TableHead>
                                        <TableHead className="whitespace-nowrap">Amount</TableHead>
                                        <TableHead className="whitespace-nowrap">
                                            Expired?
                                        </TableHead>
                                        <TableHead className="w-[70px] text-center">
                                            Status
                                        </TableHead>
                                        <TableHead className="w-[70px] text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.coupons.map((coupon, index) => (
                                        <TableRow key={coupon._id}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-20">{coupon.name}</span>
                                                    <ToolTip content="Copy">
                                                        <Button
                                                            size={'icon'}
                                                            variant={'outline'}
                                                            className="hover:ring-1 ring-primary"
                                                            onClick={() => copy(coupon.name!)}
                                                        >
                                                            <Copy
                                                                className="text-muted-foreground"
                                                                size={14}
                                                            />
                                                        </Button>
                                                    </ToolTip>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {format(coupon.expireDate!, 'dd-M-yyyy')}
                                            </TableCell>
                                            <TableCell>{coupon.amount}%</TableCell>
                                            <TableCell>
                                                {new Date(coupon.expireDate!) < new Date() ? (
                                                    <span className="text-rose-500">Expired</span>
                                                ) : (
                                                    <span className="text-green-500">
                                                        Not Expired
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="w-[70px] text-center">
                                                <div
                                                    className={cn(
                                                        'mx-auto h-3 w-3 rounded-full',
                                                        !coupon.isDeleted
                                                            ? 'bg-green-500'
                                                            : 'bg-rose-500'
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell className="w-[70px] text-center">
                                                <CouponsDropDownWithAlertDialog
                                                    editPageLink={`/dashboard/coupons/update/${coupon._id}`}
                                                    onHardDelete={() =>
                                                        hardDelete({ id: coupon._id })
                                                    }
                                                    onRestore={() => restore({ id: coupon._id })}
                                                    onSoftDelete={() =>
                                                        softDelete({ id: coupon._id })
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow className="px-10">
                                        <TableCell colSpan={4}>
                                            <span className="block">Limit of records</span>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <LimitController
                                                limit={limit}
                                                totalResultsCounts={data?.totalResultsCounts ?? 0}
                                                setLimit={setLimit}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            <TablePaginationAndDetails
                                currentPage={page}
                                itemsPerPage={limit}
                                onChange={(page) => setPage(page)}
                                pagesCount={pagesCount}
                                resultCount={data?.resultCount ?? 0}
                                totalCount={data?.totalCount ?? 0}
                                totalResultsCounts={data?.totalResultsCounts ?? 0}
                            />
                        </>
                    )}
                </>
            )}
        </Transition>
    )
}

export default AdminCoupons

type TableFiltersProps = TableSortProps &
    TableSearchProps &
    TableRefreshDataProps &
    TableCreateLinkButtonProps
const CouponsTableFilters = (props: TableFiltersProps) => {
    return (
        <Flex align="center" gap="sm" className="my-5 max-md:flex-col">
            <Flex align="center" gap="sm" className="flex-1 max-md:w-full max-md:justify-center">
                <TableRefreshData onRefresh={props.onRefresh} />
                <TableSearch search={props.search} onSearch={props.onSearch} />
            </Flex>
            <Flex gap="sm" className="max-md:w-full max-md:justify-center">
                <TableSort setSort={props.setSort} sort={props.sort} sortItems={props.sortItems} />
                <TableCreateLinkButton link={props.link} />
            </Flex>
        </Flex>
    )
}

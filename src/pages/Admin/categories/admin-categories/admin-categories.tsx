import LimitController from '@/components/limit-controller'
import Flex from '@/components/my/flex'
import NoDataMessage from '@/components/not-data'
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
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useDeleteCategory, useGetCategories } from '@/hooks/api/use-categories'
import { cn } from '@/lib/utils'
import Transition from '@/components/transition'
import { useHandleErrors } from '@/hooks/use-handle-errors'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { BeatLoader } from 'react-spinners'
import CustomDropDownWithAlertDialog from '../../custom-dropwoen-with-alert-dialog'
import DashTitle from '@/components/dash-title'
const sortItems = [
    { value: 'name', label: 'Name, A-Z' },
    { value: '-name', label: 'Name, Z-A' },
    { value: 'createdAt', label: 'Date, oldest' },
    { value: '-createdAt', label: 'Date, newest' },
    { value: 'status', label: 'Status, A-Z' },
    { value: '-status', label: 'Status, Z-A' },
]
const AdminCategories = () => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [search, setSearch] = useState<string>()
    const [sort, setSort] = useState<string>()
    const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory()
    const { data, isLoading, error } = useGetCategories({
        page,
        limit,
        search,
        select: 'name,slug,status,image',
        sort,
    })
    const pagesCount = data ? Math.ceil(data?.totalResultsCounts / limit) : 0

    const handleErrors = useHandleErrors()
    if (error) handleErrors(error)

    // if (data)
    return (
        <Transition>
            <Helmet>
                <title>Admin Categories</title>
            </Helmet>
            <DashTitle title="Categories" />
            {/* search categories and refresh and create link and sort */}
            <CategoriesTableFilters
                sortItems={sortItems}
                search={search}
                onSearch={(value) => {
                    setPage(1)
                    setSearch(value)
                }}
                sort={sort}
                setSort={setSort}
                onRefresh={() => {
                    setLimit(5)
                    setPage(1)
                    setSearch(undefined)
                    setSort(undefined)
                }}
                link="/dashboard/categories/create"
            />

            {data?.categories.length === 0 ? (
                <NoDataMessage className="mt-12" message="No Categories Found" />
            ) : (
                <>
                    {isDeleting && (
                        <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
                    )}
                    {isLoading ? (
                        <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
                    ) : (
                        <>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Number</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead className="w-[70px] text-center">
                                            Status
                                        </TableHead>
                                        <TableHead className="w-[70px] text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.categories.map((category, index) => (
                                        <TableRow key={category._id}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <Flex>
                                                    <img
                                                        src={category.image?.secure_url}
                                                        alt={category.name}
                                                        loading="lazy"
                                                        className="mr-3 h-8 w-8 rounded-full object-cover object-center"
                                                    />
                                                    <span className="block truncate">
                                                        {category.name}
                                                    </span>
                                                </Flex>
                                            </TableCell>
                                            <TableCell className="w-[70px] text-center">
                                                <div
                                                    className={cn(
                                                        'mx-auto h-3 w-3 rounded-full',
                                                        category.status == 'Active'
                                                            ? 'bg-green-500'
                                                            : 'bg-rose-500'
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell className="w-[70px] text-center">
                                                <CustomDropDownWithAlertDialog
                                                    editPageLink={`/dashboard/categories/update/${category.slug}`}
                                                    onDelete={() => deleteCategory(category._id)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow className="px-10">
                                        <TableCell colSpan={2}>
                                            <span className="block">Limit of records</span>
                                        </TableCell>
                                        <TableCell colSpan={2}>
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

export default AdminCategories

type TableFiltersProps = TableSortProps &
    TableSearchProps &
    TableRefreshDataProps &
    TableCreateLinkButtonProps

const CategoriesTableFilters = (props: TableFiltersProps) => {
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

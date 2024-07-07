import LimitController from '@/components/limit-controller'
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
// import SearchAndRefresh from '@/components/TableFilters'
import Flex from '@/components/my/flex'
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
import { useDeleteSubcategory, useGetSubcategories } from '@/hooks/api/use-subcategories'
import { cn } from '@/lib/utils'
import { CategoryProps } from '@/types'
import Transition from '@/components/transition'
import { useHandleErrors } from '@/hooks/use-handle-errors'
import { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import CustomDropDownWithAlertDialog from '../../custom-dropwoen-with-alert-dialog'
import { Helmet } from 'react-helmet'
import NoDataMessage from '@/components/not-data'
const sortItems = [
    { value: 'name', label: 'Name, A-Z' },
    { value: '-name', label: 'Name, Z-A' },
    { value: 'createdAt', label: 'Date, oldest' },
    { value: '-createdAt', label: 'Date, newest' },
    { value: 'status', label: 'Status, A-Z' },
    { value: '-status', label: 'Status, Z-A' },
]
const AdminSubcategories = () => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [search, setSearch] = useState<string>()
    const [sort, setSort] = useState<string>()
    const handleErrors = useHandleErrors()
    // get all subcategories query
    const { data, isLoading, error } = useGetSubcategories({
        page,
        limit,
        search,
        populate: true,
        subselect: 'name',
        sort,
        select: 'name, slug, status, image, categoryId',
    })
    // delete subcategory mutation
    const { mutate: deleteSubcategory, isPending: isDeleting } = useDeleteSubcategory()
    const pagesCount = data ? Math.ceil(data?.totalResultsCounts / limit) : 0

    if (error) handleErrors(error)
    // if (data)
    return (
        <Transition>
            <Helmet>
                <title>Admin Subcategories</title>
            </Helmet>
            {/* subcategories table filters and refresh */}
            <SubcategoriesTableFilter
                link="/dashboard/subcategories/create"
                onRefresh={() => {
                    setLimit(5)
                    setPage(1)
                    setSearch(undefined)
                    setSort(undefined)
                }}
                search={search}
                onSearch={(value) => {
                    setPage(1)
                    setSearch(value)
                }}
                sort={sort}
                setSort={setSort}
                sortItems={sortItems}
            />
            {data?.subcategories.length == 0 ? (
                <NoDataMessage className="mt-12" message="No Sub Categories Found" />
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
                                        <TableHead>Category</TableHead>
                                        <TableHead className="w-[70px] text-center">
                                            Status
                                        </TableHead>
                                        <TableHead className="w-[70px] text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.subcategories.map((subcategory, index) => (
                                        <TableRow key={subcategory._id}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <Flex>
                                                    <img
                                                        src={subcategory.image?.secure_url}
                                                        alt={subcategory.name}
                                                        loading="lazy"
                                                        className="mr-3 h-8 w-8 rounded-full object-cover object-center"
                                                    />
                                                    <span className="block truncate">
                                                        {subcategory.name}
                                                    </span>
                                                </Flex>
                                            </TableCell>
                                            <TableCell>
                                                {(subcategory.categoryId as CategoryProps).name}
                                            </TableCell>
                                            <TableCell className="w-[70px] text-center">
                                                <div
                                                    className={cn(
                                                        'mx-auto h-3 w-3 rounded-full',
                                                        subcategory.status == 'Active'
                                                            ? 'bg-green-500'
                                                            : 'bg-rose-500'
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell className="w-[70px] text-center">
                                                <CustomDropDownWithAlertDialog
                                                    editPageLink={`/dashboard/subcategories/update/${subcategory.slug}`}
                                                    onDelete={() => {
                                                        deleteSubcategory({ id: subcategory._id })
                                                        console.log('Deleted!')
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
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
                                                totalResultsCounts={data?.totalResultsCounts ?? 0}
                                                setLimit={setLimit}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            {/* Pagination */}
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

export default AdminSubcategories

type SubcategoriesTableFilterProps = TableSortProps &
    TableSearchProps &
    TableRefreshDataProps &
    TableCreateLinkButtonProps

const SubcategoriesTableFilter = (props: SubcategoriesTableFilterProps) => {
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

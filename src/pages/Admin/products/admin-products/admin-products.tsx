import Flex from '@/components/my/flex'
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
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import LimitController from '@/components/limit-controller'
import NoDataMessage from '@/components/not-data'
import TablePaginationAndDetails from '@/components/table-pagination-and-details'
import { Switch } from '@/components/ui/switch'
import { useDeleteProduct, useGetProducts, useUpdateProduct } from '@/hooks/api/use-products'
import { cn } from '@/lib/utils'
import { ProductProps } from '@/types'
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
    { value: 'price', label: 'Price, low to high' },
    { value: '-price', label: 'Price, high to low' },
    { value: 'stock', label: 'Stock, low to high' },
    { value: '-stock', label: 'Stock, high to low' },
]
const AdminProducts = () => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(5)
    const [search, setSearch] = useState<string>()
    const [sort, setSort] = useState<string>()

    const { data, isLoading, error } = useGetProducts({
        page,
        limit,
        search,
        sort,
        select: 'name, slug, mainImage, price, stock, number_sellers, categoryId, status, subcategoryId, isNewArrival',
    })
    const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct()
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct()
    const pagesCount = data ? Math.ceil(data?.totalResultsCounts / limit) : 0
    const handleErrors = useHandleErrors()

    function handleToggleProductNewState(id: ProductProps['_id'], value: boolean) {
        const data = new FormData()
        data.append('isNewArrival', value ? 'true' : 'false')

        updateProduct({ id, infos: data })
    }

    if (error) handleErrors(error)

    return (
        <Transition>
            <Helmet>
                <title>Admin Products</title>
            </Helmet>
            <DashTitle title="Products" />
            {/* table filter */}
            <ProductsTableFilters
                link="/dashboard/products/create"
                onRefresh={() => {
                    setPage(1)
                    setLimit(5)
                    setSearch(undefined)
                    setSort(undefined)
                }}
                onSearch={(value) => {
                    setPage(1)
                    setSearch(value)
                }}
                search={search}
                setSort={setSort}
                sort={sort}
                sortItems={sortItems}
            />

            {/* Table */}
            {data?.products.length === 0 ? (
                <NoDataMessage className="mt-12" message="No Products Found" />
            ) : (
                <>
                    {(isDeleting || isUpdating) && (
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
                                        <TableHead>Subcategory</TableHead>
                                        <TableHead>Sellers</TableHead>
                                        <TableHead>Is New?</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead className="w-[70px] text-center">
                                            Status
                                        </TableHead>
                                        <TableHead className="w-[70px] text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.products.map((product, index) => (
                                        <TableRow key={product._id}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                <Flex align={'center'} gap={'sm'}>
                                                    <img
                                                        src={product.mainImage?.secure_url}
                                                        alt={product.name}
                                                        loading="lazy"
                                                        className="h-8 w-8 rounded-full object-cover object-center"
                                                    />
                                                    <span className="truncate">{product.name}</span>
                                                </Flex>
                                            </TableCell>
                                            <TableCell className="truncate">
                                                {product.categoryId?.name}
                                            </TableCell>
                                            <TableCell className="truncate">
                                                {product.subcategoryId?.name ? (
                                                    product.subcategoryId.name
                                                ) : (
                                                    <span className="text-red-500">N/A</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="truncate font-semibold">
                                                {product.number_sellers ?? 0}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center">
                                                    <Switch
                                                        checked={product.isNewArrival}
                                                        disabled={isUpdating}
                                                        onChange={() =>
                                                            handleToggleProductNewState(
                                                                product._id,
                                                                !product.isNewArrival
                                                            )
                                                        }
                                                        onCheckedChange={(value) =>
                                                            handleToggleProductNewState(
                                                                product._id,
                                                                value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="truncate">
                                                <div
                                                    className={cn(
                                                        'w-fit rounded-lg bg-green-400 px-3 py-1 text-white',
                                                        product.stock == 0 && 'bg-red-400'
                                                    )}
                                                >
                                                    {product.stock}
                                                </div>
                                            </TableCell>
                                            <TableCell className="w-[70px] text-center">
                                                <div
                                                    className={cn(
                                                        'mx-auto h-3 w-3 rounded-full',
                                                        product.status == 'Active'
                                                            ? 'bg-green-500'
                                                            : 'bg-rose-500'
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell className="w-[70px] text-center">
                                                <CustomDropDownWithAlertDialog
                                                    editPageLink={`/dashboard/products/update/${product.slug}`}
                                                    onDelete={() => {
                                                        deleteProduct(product._id)
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow className="px-10">
                                        <TableCell colSpan={5}>
                                            <span className="block">Limit of records</span>
                                        </TableCell>
                                        <TableCell colSpan={4}>
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

export default AdminProducts

type TableFiltersProps = TableSortProps &
    TableSearchProps &
    TableRefreshDataProps &
    TableCreateLinkButtonProps

const ProductsTableFilters = (props: TableFiltersProps) => {
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

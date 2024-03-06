import TablePaginationAndDetails from '@/components/table-pagination-and-details'
import { useGetActiveProducts } from '@/hooks/use-products'
import { CategoryProps } from '@/types'
import { CSSProperties, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FilterSide from './filter-side/filter-side'
import ProductsSide from './products-side/products-side'

export const MAX_PRICE = 1000
export const MIN_PRICE = 1

const Shop = () => {
    const [showFilters, setShowFilters] = useState<boolean>(true)
    const [categoryId, setCategoryId] = useState<CategoryProps['_id'] | null>(null)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(15)
    const [sort, setSort] = useState<string | null>(null)
    const [minPrice, setMinPrice] = useState<number>(MIN_PRICE)
    const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE)
    const [search, setSearch] = useState<string>('')
    const [inStock, setInStock] = useState<boolean | null>(null)
    const [enabled, setEnabled] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (window.matchMedia('(max-width: 768px)').matches) {
            setShowFilters(false)
        }
        // in the first render just set the state from query params
        const queryParams = new URLSearchParams(window.location.search)
        setCategoryId((queryParams.get('categoryId') as CategoryProps['_id']) || null)
        setPage(Number(queryParams.get('page')) || 1)
        setLimit(Number(queryParams.get('limit')) || 15)
        setSort(queryParams.get('sort') || null)
        setMinPrice(Number(queryParams.get('minPrice')) || MIN_PRICE)
        setMaxPrice(Number(queryParams.get('maxPrice')) || MAX_PRICE)
        setSearch(queryParams.get('search') || '')
        setInStock(queryParams.get('inStock') === 'true' ? true : queryParams.get('inStock') === 'false' ? false : null)
        setEnabled(true) // start the get active products query
    }, [])

    useEffect(() => {
        // when state changes
        const newQueryParams = new URLSearchParams()
        categoryId ? newQueryParams.set('categoryId', categoryId) : newQueryParams.delete('categoryId')
        page ? newQueryParams.set('page', page.toString()) : newQueryParams.delete('page')
        limit ? newQueryParams.set('limit', limit.toString()) : newQueryParams.delete('limit')
        sort ? newQueryParams.set('sort', sort) : newQueryParams.delete('sort')
        minPrice ? newQueryParams.set('minPrice', minPrice.toString()) : newQueryParams.delete('minPrice')
        maxPrice ? newQueryParams.set('maxPrice', maxPrice.toString()) : newQueryParams.delete('maxPrice')
        search ? newQueryParams.set('search', search) : newQueryParams.delete('search')
        inStock !== null ? newQueryParams.set('inStock', inStock.toString()) : newQueryParams.delete('inStock')

        navigate(`?${newQueryParams.toString()}`)
    }, [categoryId, page, limit, sort, minPrice, maxPrice, search, inStock, navigate])

    function clearFilters() {
        setCategoryId(null)
        setPage(1)
        setLimit(15)
        setSort(null)
        setMinPrice(MIN_PRICE)
        setMaxPrice(MAX_PRICE)
        setSearch('')
        setInStock(null)
        navigate(`?${new URLSearchParams(window.location.search).toString()}`)
    }

    const activeProductsQuery = useGetActiveProducts({
        limit,
        page,
        ...(categoryId && { categoryId }),
        ...(search && { search }),
        ...(sort && { sort }),
        finalPrice: {
            ...(minPrice && { gte: minPrice }),
            ...(maxPrice && { lte: maxPrice }),
        },
        stock: {
            ...(inStock ? { gt: 0 } : inStock === false ? { eq: 0 } : {}),
        },
        enabled,
    })

    return (
        <div
            className="relative mx-auto flex w-full max-w-[1536px] items-start gap-3 px-2"
            style={{ '--filters-width': '16rem' } as CSSProperties}
        >
            <FilterSide
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                inStock={inStock}
                setInStock={setInStock}
                clearFilters={clearFilters}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
            />
            <div className="flex-1">
                <ProductsSide
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    activeProductsQuery={activeProductsQuery}
                    clearFilters={clearFilters}
                    search={search}
                    setSearch={setSearch}
                    sort={sort}
                    setSort={setSort}
                    limit={limit}
                    setLimit={setLimit}
                />
                {activeProductsQuery?.data!.products.length > 0 && (
                    <TablePaginationAndDetails
                        currentPage={page}
                        totalCount={activeProductsQuery.data?.totalCount || 0}
                        itemsPerPage={limit}
                        onChange={(pageNumber) => setPage(pageNumber)}
                        resultCount={activeProductsQuery.data?.resultCount || 0}
                        totalResultsCounts={activeProductsQuery.data?.totalResultsCounts || 0}
                        pagesCount={
                            activeProductsQuery.data
                                ? Math.ceil(activeProductsQuery.data?.totalResultsCounts / limit)
                                : 0
                        }
                    />
                )}
            </div>
        </div>
    )
}

export default Shop

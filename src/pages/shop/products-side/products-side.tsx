import ToolTip from '@/components/my/tooltip'
import NoDataMessage from '@/components/not-data'
import { TableSort } from '@/components/table-filter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { GetProductsProps } from '@/hooks/api/use-products'
import ProductCard from '@/pages/home/product-card/product-card'
import { Flex } from '@/styles/styles'
import { useHandleErrors } from '@/hooks/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { UseQueryResult } from '@tanstack/react-query'
import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FcSearch } from 'react-icons/fc'
import ProductsLoading from './products-loading'

type Props = {
    showFilters: boolean
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
    activeProductsQuery: UseQueryResult<GetProductsProps, Error>
    clearFilters: () => void
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    sort: string | null
    setSort: React.Dispatch<React.SetStateAction<string | null>>
    limit: number
    setLimit: React.Dispatch<React.SetStateAction<number>>
}

const LIMITS_OPTIONS = [5, 10, 15, 25, 50, 100]

const ProductsSide: React.FC<Props> = ({
    showFilters,
    setShowFilters,
    activeProductsQuery,
    clearFilters,
    search,
    setSearch,
    setSort,
    sort,
    limit,
    setLimit,
}) => {
    const [inputValue, setInputValue] = useState('')
    const handleErrors = useHandleErrors()
    const { data, isLoading, error } = activeProductsQuery
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSearch(inputValue)
    }

    useEffect(() => {
        setInputValue(search)
    }, [search])

    if (error) handleErrors(error)

    return (
        <Box className="mx-auto mt-8 w-full space-y-5 px-4 py-2">
            {/* Options */}
            <Flex
                $items="center"
                className="z-[50] mb-8 bg-transparent backdrop-blur-md max-lg:!flex-col"
            >
                <Flex as="form" $items="center" className="w-full flex-1" onSubmit={handleSubmit}>
                    <Input
                        placeholder="Search Products"
                        type="search"
                        className="bg-background max-xs:text-xs"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <ToolTip content="Search">
                        <Button variant="secondary" size="icon" className="border">
                            <FcSearch size={24} />
                        </Button>
                    </ToolTip>
                </Flex>
                <Flex className="w-full flex-1">
                    <TableSort
                        className="!w-full flex-1 bg-background"
                        setSort={setSort}
                        sort={sort || ''}
                        sortItems={[
                            { value: '-number_sellers', label: 'Number of Sellers' },
                            { value: '-createdAt', label: 'Date, Newest' },
                            { value: 'createdAt', label: 'Date, Oldest' },
                            { value: 'price', label: 'Price, low to high' },
                            { value: '-price', label: 'Price, high to low' },
                            { value: 'name', label: 'Alphabetically A-Z' },
                            { value: '-name', label: 'Alphabetically Z-A' },
                        ]}
                    />
                    <Select
                        value={limit.toString()}
                        onValueChange={(value) => setLimit(Number(value))}
                    >
                        <ToolTip content="Items per page">
                            <SelectTrigger className="w-28 bg-background">
                                <SelectValue placeholder="Items per page" />
                            </SelectTrigger>
                        </ToolTip>
                        <SelectContent>
                            {[
                                ...LIMITS_OPTIONS,
                                ...(LIMITS_OPTIONS.includes(limit) ? [] : [limit]),
                            ].map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.toString()}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <ToolTip content="Filters">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="border"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <SlidersHorizontal size={18} />
                        </Button>
                    </ToolTip>
                </Flex>
            </Flex>

            {/* Products */}
            {isLoading || !data ? (
                <ProductsLoading />
            ) : (
                <div className="grid grid-cols-2 place-items-center gap-4 xs:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
                    {data?.products?.length ? (
                        data?.products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full space-y-4">
                            <NoDataMessage />
                            <Button onClick={clearFilters} className="block mx-auto">
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </Box>
    )
}

export default ProductsSide

import { MultiRange } from '@/components/my/multi-range'
import Radio from '@/components/my/radio'
import { Button } from '@/components/ui/button'
import { useGetActiveCategories } from '@/hooks/use-categories'
import { cn } from '@/lib/utils'
import { Flex } from '@/styles/styles'
import { CategoryProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import React from 'react'
import { BeatLoader } from 'react-spinners'
import { MAX_PRICE, MIN_PRICE } from '../shop'
import { FilterClear, FilterTitle, Overlay } from './filters-styles'

type Props = {
    showFilters: boolean
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>
    categoryId: CategoryProps['_id'] | null
    setCategoryId: React.Dispatch<React.SetStateAction<CategoryProps['_id'] | null>>
    inStock: boolean | null
    setInStock: React.Dispatch<React.SetStateAction<boolean | null>>
    clearFilters: () => void
    minPrice: number
    setMinPrice: React.Dispatch<React.SetStateAction<number>>
    maxPrice: number
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>
}

const FilterSide: React.FC<Props> = ({
    setShowFilters,
    showFilters,
    categoryId,
    setCategoryId,
    inStock,
    setInStock,
    clearFilters,
    maxPrice,
    setMaxPrice,
    minPrice,
    setMinPrice,
}) => {
    const { data, error, isLoading: categoriesLoading } = useGetActiveCategories()
    const handleErrors = useHandleErrors()

    if (error) handleErrors(error)

    return (
        <>
            <motion.div
                variants={{
                    hidden: { x: `-100%` },
                    visible: { x: 0 },
                }}
                initial="hidden"
                animate={showFilters ? 'visible' : 'hidden'}
                transition={{ ease: 'linear' }}
                className={cn(
                    'fixed left-0 top-[--header-height] z-50 h-full-screen-header w-[--filters-width] space-y-5 overflow-y-auto border-r bg-card px-6 py-6',
                    showFilters && 'md:sticky'
                )}
            >
                {/* Categories section */}
                <Box>
                    <Flex $items="center">
                        <FilterTitle>Categories</FilterTitle>
                        <FilterClear onClick={() => setCategoryId(null)} hidden={!categoryId}>
                            clear
                        </FilterClear>
                    </Flex>
                    {categoriesLoading ? (
                        <BeatLoader color="hsl(var(--primary))" />
                    ) : (
                        <ul className="mt-2 space-y-1 text-sm">
                            {data?.categories?.map((category) => (
                                <li
                                    key={category._id}
                                    className={cn(
                                        'relative w-fit cursor-pointer px-2 text-muted-foreground hover:text-foreground',
                                        categoryId === category._id && '!text-white'
                                    )}
                                    onClick={() => setCategoryId(category._id)}
                                >
                                    <span>{category.name}</span>
                                    {categoryId === category._id && (
                                        <motion.span
                                            className="absolute inset-0 -z-[1] rounded-md bg-primary"
                                            layoutId="categories filtering"
                                            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </Box>
                {/* In Stock section */}
                <Box>
                    <Flex $items="center">
                        <FilterTitle>Availability</FilterTitle>
                        <FilterClear onClick={() => setInStock(null)} hidden={inStock == null}>
                            clear
                        </FilterClear>
                    </Flex>
                    <div className="mt-2 space-y-1 text-sm">
                        <label className="flex cursor-pointer items-center gap-2" htmlFor="in-stock">
                            <Radio
                                name="inStock"
                                id="in-stock"
                                checked={inStock === true}
                                onChange={() => setInStock(true)}
                            />
                            <span className="">In Stock</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2" htmlFor="out-of-stock">
                            <Radio
                                name="inStock"
                                id="out-of-stock"
                                checked={inStock === false}
                                onChange={() => setInStock(false)}
                            />
                            <span>Out of Stock</span>
                        </label>
                    </div>
                </Box>
                {/* Price range */}
                <Box>
                    <Flex $items="center">
                        <FilterTitle>Price Range</FilterTitle>
                        <FilterClear
                            hidden={minPrice == MIN_PRICE && maxPrice == MAX_PRICE}
                            onClick={() => {
                                setMinPrice(MIN_PRICE)
                                setMaxPrice(MAX_PRICE)
                            }}
                        >
                            clear
                        </FilterClear>
                    </Flex>
                    <div className="mt-5 space-y-1 text-sm">
                        <MultiRange
                            onAfterChange={([min, max]: any) => {
                                setMinPrice(min)
                                setMaxPrice(max)
                            }}
                            value={[minPrice, maxPrice]}
                            max={MAX_PRICE}
                            min={MIN_PRICE}
                            minDistance={10}
                            renderThumb={(props, state) => (
                                <div {...props} className="thumb relative">
                                    <span className="absolute -right-[10px] top-[120%] w-10 cursor-pointer rounded-lg border bg-muted p-1">
                                        {state.valueNow}
                                    </span>
                                </div>
                            )}
                            pearling
                        />
                        <Flex></Flex>
                    </div>
                </Box>
                {/* Clear filters */}
                <Button variant={'destructive'} className="!mt-12 w-full" onClick={clearFilters}>
                    Clear
                </Button>

                {/* Close button */}
                <X className="absolute right-3 top-0 cursor-pointer" onClick={() => setShowFilters(false)} />
            </motion.div>

            {/* overlay */}
            <Overlay $show={showFilters} onClick={() => setShowFilters(false)} />
        </>
    )
}

export default FilterSide

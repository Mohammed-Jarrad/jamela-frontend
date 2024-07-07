import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '@/components/drop-down'
import Flex from '@/components/my/flex'
import { OptionalSpan } from '@/components/required-star'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ProductSizesProps } from '@/types'
import Transition from '@/components/transition'
import { Box } from '@radix-ui/themes'
import { AnimatePresence } from 'framer-motion'
import { XCircle } from 'lucide-react'
import React from 'react'

type SizesProps = {
    sizes: ProductSizesProps[]
    setSizes: React.Dispatch<React.SetStateAction<ProductSizesProps[]>>
}

const ProductSizes: React.FC<SizesProps> = ({ sizes, setSizes }) => {
    const sizesArray: ProductSizesProps[] = [
        'XS',
        'S',
        'M',
        'L',
        'XL',
        'XXL',
        'XXXL',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '49',
        '50',
    ]

    const addSize = (size: ProductSizesProps) => {
        setSizes((prevSizes) =>
            prevSizes.includes(size) ? prevSizes.filter((s) => s !== size) : [...prevSizes, size]
        )
    }

    const removeSize = (size: ProductSizesProps) => {
        setSizes((prevSizes) => prevSizes.filter((s) => s !== size))
    }

    return (
        <Box className="flex flex-col space-y-3">
            <Label htmlFor="sizes" className="text-xs text-muted-foreground md:text-sm">
                Sizes <OptionalSpan />
            </Label>
            <Flex gap={'lg'} className="max-sm:flex-col">
                <Dropdown>
                    <DropdownTrigger className="w-40 border">Select Sizes</DropdownTrigger>
                    <DropdownContent className="bottom-full top-auto mb-2 h-60 w-40 overflow-auto">
                        {sizesArray.map((size, index) => (
                            <DropdownItem
                                key={index}
                                onClick={() => addSize(size)}
                                closeOnClick={false}
                                className={cn(
                                    sizes.includes(size) ? 'border !bg-secondary' : 'bg-transparent'
                                )}
                            >
                                <span>{size}</span>
                            </DropdownItem>
                        ))}
                    </DropdownContent>
                </Dropdown>

                <Box className="flex flex-wrap items-center gap-2 text-sm">
                    <AnimatePresence mode="popLayout">
                        {sizes.map((size) => (
                            <Transition
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 2 }}
                                key={size}
                                className="relative rounded border bg-card px-3 py-1 font-medium shadow"
                            >
                                <span>{size}</span>
                                <XCircle
                                    size={13}
                                    className="absolute -right-1 -top-1 cursor-pointer text-muted-foreground/75 transition-all hover:text-foreground/80"
                                    onClick={() => removeSize(size)}
                                />
                            </Transition>
                        ))}
                        {sizes.length === 0 && (
                            <span className="text-muted-foreground">No sizes selected</span>
                        )}
                    </AnimatePresence>
                </Box>
            </Flex>
        </Box>
    )
}

export default ProductSizes

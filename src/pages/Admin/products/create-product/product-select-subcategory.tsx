import Flex from '@/components/my/flex'
import NoDataMessage from '@/components/not-data'
import { OptionalSpan } from '@/components/required-star'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useGetSubcategories } from '@/hooks/api/use-subcategories'
import { SubcategoryProps } from '@/types'
import { useHandleErrors } from '@/hooks/use-handle-errors'
import { Box } from '@radix-ui/themes'
import React from 'react'
import { BeatLoader } from 'react-spinners'
import { ProductForm } from './create-product'
type Props = {
    infos: ProductForm
    setInfos: React.Dispatch<React.SetStateAction<ProductForm>>
}
const ProductSelectSubcategory: React.FC<Props> = ({ infos, setInfos }) => {
    const { subcategoryId, categoryId } = infos

    function changeSubcategory(subcategoryId: SubcategoryProps['_id']) {
        setInfos((preInfos) => ({ ...preInfos, subcategoryId }))
    }

    const { data, isLoading, error } = useGetSubcategories({
        limit: 10000,
        categoryId: categoryId,
        enabled: !!categoryId,
    })
    const handleErrors = useHandleErrors()
    if (error) handleErrors(error)

    return (
        <Box className="flex flex-col space-y-3">
            <Label htmlFor="categories" className="text-xs text-muted-foreground md:text-sm">
                Subcategory <OptionalSpan />
                {subcategoryId && (
                    <span
                        className="ml-2 text-primary hover:underline pointer"
                        onClick={() => changeSubcategory('')}
                    >
                        remove
                    </span>
                )}
            </Label>
            {isLoading ? (
                <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
            ) : data ? (
                <>
                    {data.subcategories.length ? (
                        <Select
                            onValueChange={(value) => changeSubcategory(value)}
                            value={subcategoryId ?? undefined}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Subcategory" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                                {data.subcategories.map((subcategory) => (
                                    <SelectItem
                                        key={subcategory._id}
                                        value={subcategory._id!}
                                        className="cursor-pointer"
                                    >
                                        <Flex gap="sm" align="center">
                                            <img
                                                src={subcategory.image?.secure_url}
                                                alt={subcategory.name}
                                                loading="lazy"
                                                className="h-8 w-8 rounded-sm object-cover"
                                            />
                                            <span>{subcategory.name}</span>
                                        </Flex>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <NoDataMessage
                            message="No subcategories with category selected"
                            className="justify-start text-sm items-center h-full"
                        />
                    )}
                </>
            ) : (
                <p className="rounded border px-3  py-2 text-sm text-muted-foreground">
                    You need to select a category first
                </p>
            )}
        </Box>
    )
}

export default ProductSelectSubcategory

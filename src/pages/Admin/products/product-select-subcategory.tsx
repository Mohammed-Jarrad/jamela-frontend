import Flex from '@/components/my/flex'
import RequiredStar from '@/components/required-star'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetSubcategories } from '@/hooks/use-subcategories'
import { CategoryProps, SubcategoryProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import React, { useEffect } from 'react'
import { BeatLoader } from 'react-spinners'
type Props = {
    categoryId: CategoryProps['_id']
    setSubcategoryId: React.Dispatch<React.SetStateAction<SubcategoryProps['_id']>>
}
const ProductSelectSubcategory: React.FC<Props> = ({ categoryId, setSubcategoryId }) => {
    // const { data, isLoading, error, isSuccess } = useGetSucategoriesForCategory(categoryId || '')
    const { data, isLoading, error, isSuccess } = useGetSubcategories({
        limit: 10000,
        categoryId,
        checking: !!categoryId,
    })
    const handleErrors = useHandleErrors()
    if (error) handleErrors(error)

    useEffect(() => {
        if (isSuccess) {
            if (data?.subcategories.length) {
                setSubcategoryId(data.subcategories[0]._id)
            }
        }
    }, [data, isSuccess, setSubcategoryId])

    return (
        <Box className="flex flex-col space-y-3">
            <Label htmlFor="categories" className="text-xs text-muted-foreground md:text-sm">
                Subcategory <RequiredStar />
            </Label>
            {isLoading ? (
                <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
            ) : data ? (
                <>
                    {data.subcategories.length ? (
                        <Select
                            value={data.subcategories[0]._id || ''}
                            onValueChange={(value) => setSubcategoryId(value)}
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
                        <p className="rounded border px-3  py-2 text-sm text-muted-foreground">
                            No subcategories found please create one
                        </p>
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

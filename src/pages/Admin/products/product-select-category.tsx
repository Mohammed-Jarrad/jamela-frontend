import Flex from '@/components/my/flex'
import RequiredStar from '@/components/required-star'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetCategories } from '@/hooks/use-categories'
import { CategoryProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { BeatLoader } from 'react-spinners'

type Props = {
    categoryId: CategoryProps['_id']
    setCategoryId: React.Dispatch<React.SetStateAction<CategoryProps['_id']>>
}

const ProductSelectCategory: React.FC<Props> = ({ categoryId, setCategoryId }) => {
    const { data, isLoading, error } = useGetCategories({ limit: 1000, select: 'name,image', sort: '-createdAt' })
    const handleErrors = useHandleErrors()

    if (error) handleErrors(error)

    return (
        <Box className="flex flex-col space-y-3">
            <Label htmlFor="categories" className="text-xs text-muted-foreground md:text-sm">
                Category <RequiredStar />
            </Label>
            {isLoading ? (
                <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
            ) : (
                data && (
                    <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                            {data.categories.map((category) => (
                                <SelectItem key={category._id} value={category._id!} className="cursor-pointer">
                                    <Flex gap="sm" align="center">
                                        <img
                                            src={category.image?.secure_url}
                                            alt={category.name}
                                            loading="lazy"
                                            className="h-8 w-8 rounded-sm object-cover"
                                        />
                                        <span>{category.name}</span>
                                    </Flex>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )
            )}
        </Box>
    )
}

export default ProductSelectCategory

import Flex from '@/components/my/flex'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetCategories } from '@/hooks/use-categories'
import { useGetSubcategory, useUpdateSubcategory } from '@/hooks/use-subcategories'
import { cn } from '@/lib/utils'
import { CategoryProps, StatusType, SubcategoryProps } from '@/types'
import Transition from '@/utils/transition'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { Image } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

const UpdateSubcategory = () => {
    const { slug } = useParams()
    // Get the current subcategory
    const {
        data: currentSubcategory,
        isLoading,
        error,
        isSuccess,
    } = useGetSubcategory({ slug }, { select: 'name, image, status, categoryId' })
    // update subcategory mutation
    const { mutate: updateSubcategory, isPending: isUpdating } = useUpdateSubcategory()
    // input states
    const [name, setName] = useState<string | null>(null)
    const [status, setStatus] = useState<StatusType | null>(null)
    const [categorySelectId, setCategorySelectId] = useState<CategoryProps['_id']>()
    const [file, setFile] = useState<File | null>(null)
    const handleErrors = useHandleErrors()
    // handleUpdateSubcategory
    function handleUpdateSubcategory() {
        const formData = new FormData()
        // append the name if founded
        if (name) formData.append('name', name)
        // append the status if founded
        if (status) formData.append('status', status)
        // append the category if founded
        if (
            categorySelectId !== (currentSubcategory?.subcategory.categoryId as CategoryProps)._id &&
            categorySelectId !== undefined
        )
            formData.append('categoryId', categorySelectId)

        // append the file if founded
        if (file) formData.append('image', file)
        updateSubcategory({ id: currentSubcategory?.subcategory._id, infos: formData })
    }
    // set category select id when get the current subcategory
    useEffect(() => {
        if (isSuccess) {
            setCategorySelectId((currentSubcategory.subcategory.categoryId as CategoryProps)._id)
            setName(currentSubcategory.subcategory.name as string)
            setStatus(currentSubcategory.subcategory.status as StatusType)
        }
    }, [isSuccess, currentSubcategory])

    if (isLoading) return <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
    if (error) handleErrors(error)
    if (!currentSubcategory) return null

    const {
        subcategory: { image },
    } = currentSubcategory

    return (
        <Transition>
            <Helmet>
                <title>Update {slug}</title>
            </Helmet>
            <Card>
                <CardHeader>
                    <h1 className="my-5 text-2xl font-medium text-muted-foreground ">Update Subcategory</h1>
                </CardHeader>
                <CardContent className="space-y-4 py-2">
                    {/* Name */}
                    <Box className="flex flex-col space-y-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            placeholder="Name..."
                            id="name"
                            className="lg:w-1/2"
                            defaultValue={name as string}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>
                    {/* status */}
                    <Box className="flex flex-col space-y-3">
                        <Label>Status</Label>
                        <Select
                            value={status as string}
                            onValueChange={(value) => {
                                setStatus(value as StatusType)
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </Box>
                    {/* categories select */}
                    <CategoriesSelect
                        subcategory={currentSubcategory.subcategory}
                        setCategorySelectId={setCategorySelectId}
                        categorySelectId={categorySelectId}
                    />
                    {/* image */}
                    <Box className="flex flex-col space-y-3">
                        <Label>Image</Label>
                        <img
                            src={file ? URL.createObjectURL(file as any) : image?.secure_url}
                            alt="sub category image"
                            loading="lazy"
                            className="h-64 w-64 rounded border object-cover shadow"
                        />
                        <Label
                            className={cn(
                                buttonVariants({ variant: 'ghost' }),
                                'w-fit cursor-pointer space-x-2 border'
                            )}
                            htmlFor="file"
                        >
                            <Image size={18} /> <span>Change</span>
                        </Label>
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            onChange={(e) => {
                                setFile(e.target?.files ? e.target.files[0] : null)
                            }}
                            className="hidden"
                        />
                    </Box>
                </CardContent>
                <Button
                    onClick={handleUpdateSubcategory}
                    disabled={isUpdating}
                    className="!sticky bottom-2 !my-2 mx-auto block w-[96%]"
                >
                    {isUpdating ? <BeatLoader color="white" size={13} /> : 'Save Changes'}
                </Button>
            </Card>
        </Transition>
    )
}

export default UpdateSubcategory

type CategoriesSelectProps = {
    subcategory: SubcategoryProps
    setCategorySelectId: (id: CategoryProps['_id']) => void
    categorySelectId: CategoryProps['_id']
}
const CategoriesSelect = ({ setCategorySelectId, categorySelectId }: CategoriesSelectProps) => {
    const {
        data: allCategories,
        isLoading,
        error,
        isSuccess,
    } = useGetCategories({ page: 1, limit: 100, select: 'name, image', sort: '-createdAt' })
    const handleErrors = useHandleErrors()
    if (isLoading) return <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
    if (error) handleErrors(error)
    if (isSuccess)
        return (
            <>
                <Box className="flex flex-col space-y-3">
                    <Label>Category</Label>
                    <Select value={categorySelectId} onValueChange={(value) => setCategorySelectId(value)}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Category" className="" />
                        </SelectTrigger>
                        <SelectContent>
                            {allCategories.categories.map((category) => (
                                <SelectItem value={category._id as string} key={category._id}>
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
                </Box>
            </>
        )
}

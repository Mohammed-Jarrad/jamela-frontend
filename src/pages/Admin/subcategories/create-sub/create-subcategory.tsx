import Flex from '@/components/my/flex'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGetCategories } from '@/hooks/use-categories'
import { useCreateSubcategory } from '@/hooks/use-subcategories'
import { cn } from '@/lib/utils'
import Transition from '@/utils/transition'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { Image } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from "react-helmet"
import { BeatLoader } from 'react-spinners'
const CreateSubcategory = () => {
    // input states
    const [name, setName] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const [categorySelectId, setCategorySelectId] = useState<string>()
    // create subcategory mutation
    const { mutate: createSubcategory, isPending } = useCreateSubcategory()
    const handleErrors = useHandleErrors()
    function handleCreateSubcategory() {
        // check if the name, file or category not found and return error
        if (!name || !file || !categorySelectId) {
            let errorMessage: string = ''
            if (!name) errorMessage += 'Name is required.'
            if (!file) errorMessage += '\nImage is required.'
            if (!categorySelectId) errorMessage += '\nCategory is required.'
            return handleErrors(new Error(errorMessage))
        }
        const formData = new FormData()
        formData.append('name', name)
        formData.append('image', file)
        formData.append('categoryId', categorySelectId)
        createSubcategory(formData)
    }

    return (
        <Transition>
            <Helmet>
                <title>Create Subcategory</title>
            </Helmet>
            
            <div className="p-2">
                <Card>
                    <CardHeader>
                        <h1 className="mb-6 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-base font-bold text-transparent md:text-center md:text-3xl">
                            Add New Subcategory
                        </h1>
                    </CardHeader>
                    <CardContent className="space-y-4 py-2">
                        {/* Name */}
                        <Box className="flex flex-col space-y-3">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                placeholder="Name..."
                                id="name"
                                className="lg:w-1/2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Box>
                        {/* category select dropdown */}
                        <CategoriesSelect
                            categorySelectId={categorySelectId}
                            setCategorySelectId={setCategorySelectId}
                        />
                        {/* image */}
                        <Box className="flex flex-col space-y-3">
                            <Label>Image</Label>
                            {file ? (
                                <img
                                    src={URL.createObjectURL(file as any)}
                                    alt="cateogry image"
                                    className="h-64 w-64 rounded border object-cover shadow"
                                />
                            ) : (
                                <div className="flex h-64 w-64 items-center justify-center rounded border shadow">
                                    <Image size={30} />
                                </div>
                            )}
                            <Label
                                className={cn(
                                    buttonVariants({ variant: 'ghost' }),
                                    'w-fit cursor-pointer space-x-2 border'
                                )}
                                htmlFor="file"
                            >
                                <Image size={18} /> <span>Select Image</span>
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
                    <CardFooter className="mt-5">
                        <Button onClick={handleCreateSubcategory} disabled={isPending}>
                            {isPending ? <BeatLoader color="white" size={13} /> : 'Create Category'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </Transition>
    )
}

export default CreateSubcategory

type CategoriesSelectProps = {
    setCategorySelectId: (id: string) => void
    categorySelectId: string | undefined
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
        )
}

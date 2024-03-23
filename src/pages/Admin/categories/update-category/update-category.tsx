import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useGetCategory, useUpdateCategory } from '@/hooks/use-categories'
import { cn } from '@/lib/utils'
import { CategoryProps, StatusType } from '@/types'
import Transition from '@/utils/transition'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { Image } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

const UpdateCategory = () => {
    const { slug } = useParams()
    // Get the current category
    const { data: currentCategory, isLoading, error, isSuccess } = useGetCategory({ slug })
    // update category mutation
    const { mutate: updateCategory, isPending } = useUpdateCategory()
    function handleUpdateCategory(categoryId: CategoryProps['_id']) {
        const formData = new FormData()
        // append the name if founded
        if (name) formData.append('name', name)
        // append the status if founded
        if (status) formData.append('status', status)
        // append the file if founded
        if (file) formData.append('image', file)
        updateCategory({ id: categoryId, infos: formData })
    }
    // input states
    const [name, setName] = useState<string | null>(null)
    const [status, setStatus] = useState<StatusType | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const handleErrors = useHandleErrors()

    useEffect(() => {
        if (isSuccess) {
            setName(currentCategory?.category.name as string)
            setStatus(currentCategory?.category.status as StatusType)
        }
    }, [isSuccess, currentCategory])

    if (isLoading) return <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />
    if (error) handleErrors(error)
    if (!currentCategory) return null

    const {
        category: { image },
    } = currentCategory

    return (
        <Transition>
            <Helmet>
                <title>Update {slug}</title>
            </Helmet>
            <Card>
                <CardHeader>
                    <h1 className="my-5 text-2xl font-medium text-muted-foreground ">
                        Update Category
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
                    {/* image */}
                    <Box className="flex flex-col space-y-3">
                        <Label>Image</Label>
                        <img
                            src={file ? URL.createObjectURL(file as any) : image?.secure_url}
                            alt={currentCategory.category.name}
                            loading="lazy"
                            className="w-64 rounded border object-cover shadow"
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
                    className="!sticky bottom-2 !my-2 mx-auto block w-[96%]"
                    onClick={() => handleUpdateCategory(currentCategory.category._id)}
                    disabled={isPending}
                >
                    {isPending ? <BeatLoader color="white" size={13} /> : 'Save Changes'}
                </Button>
            </Card>
        </Transition>
    )
}

export default UpdateCategory

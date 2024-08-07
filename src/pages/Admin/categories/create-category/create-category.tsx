import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateCategory } from '@/hooks/api/use-categories'
import { cn } from '@/lib/utils'
import Transition from '@/components/transition'
import { Box } from '@radix-ui/themes'
import { Image } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { BeatLoader } from 'react-spinners'

const CreateCategory = () => {
    // input states
    const [name, setName] = useState<string>('')
    const [file, setFile] = useState<File | null>(null)
    const { mutate: createCategory, isPending } = useCreateCategory()
    function handleCreateCategory() {
        const formData = new FormData()
        name && formData.append('name', name)
        file && formData.append('image', file)
        createCategory(formData)
    }

    return (
        <Transition>
            <Helmet>
                <title>Create Category</title>
            </Helmet>
            <div className="p-2">
                <Card>
                    <CardHeader className="mb-6 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-base font-bold text-transparent md:text-center md:text-3xl">
                        Add New Category
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
                        {/* image */}
                        <Box className="flex flex-col space-y-3">
                            <Label>Image</Label>
                            <Label
                                className={cn(
                                    buttonVariants({ variant: 'ghost' }),
                                    'w-fit cursor-pointer space-x-2 border'
                                )}
                                htmlFor="file"
                            >
                                <Image size={18} /> <span>Select Image</span>
                            </Label>
                            {file ? (
                                <img
                                    src={URL.createObjectURL(file as any)}
                                    alt="cateogry image"
                                    className="w-64 rounded border object-cover shadow"
                                />
                            ) : (
                                <div className="flex h-64 w-64 items-center justify-center rounded border shadow">
                                    <Image size={30} />
                                </div>
                            )}
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
                        <Button onClick={handleCreateCategory} disabled={isPending}>
                            {isPending ? <BeatLoader color="white" size={13} /> : 'Create Category'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </Transition>
    )
}

export default CreateCategory

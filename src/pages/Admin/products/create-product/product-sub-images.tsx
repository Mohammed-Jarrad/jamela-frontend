import RequiredStar from '@/components/required-star'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Box } from '@radix-ui/themes'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    subImages: File[]
    setSubImages: React.Dispatch<React.SetStateAction<File[]>>
}

const ProductSubImages: React.FC<Props> = ({ subImages, setSubImages }) => {
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const files = Array.from(event.dataTransfer.files)
        if (subImages.length >= 4) return toast.error('You can only upload up to 4 images')
        handleFiles(files)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        if (subImages.length >= 4) return toast.error('You can only upload up to 4 images')
        handleFiles(files)
    }
    function handleFiles(files: File[]) {
        const hasNoImageFile = files.find((file) => !file.type.startsWith('image/'))
        if (hasNoImageFile) {
            toast.error('Only image files are allowed')
            return
        }
        const remainingSpace = 4 - subImages.length
        if (remainingSpace === 0) return toast.error('You can only upload up to 4 images')
        setSubImages((prev) => [...prev, ...files.slice(0, remainingSpace)])
    }
    const handleRemoveImage = (index: number) => {
        setSubImages((prevSubImages) => prevSubImages.filter((_, i) => i !== index))
    }

    return (
        <Box className="flex flex-col space-y-3 lg:col-span-2">
            <Label className="text-xs text-muted-foreground md:text-sm">
                Sub Images <RequiredStar />
            </Label>
            {/* Draggable box for sub-images */}
            <Box
                className="space-y-4 rounded-md border-2 border-dashed p-6"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <AnimatePresence mode="sync">
                    {/* Sub image preview */}
                    {subImages.length > 0 && (
                        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                            {subImages.map((subImage, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: index * 0.2, duration: 0.2 }}
                                    key={index}
                                    className="flex flex-row items-center justify-between gap-2 rounded-md bg-secondary p-2 transition-all max-sm:flex-wrap sm:flex-col sm:p-1"
                                >
                                    <img
                                        src={URL.createObjectURL(subImage)}
                                        alt={`Sub Image ${index + 1}`}
                                        loading="lazy"
                                        className="h-20 w-20 max-w-full rounded border object-cover shadow sm:mx-auto sm:h-40 sm:w-40"
                                    />
                                    <p className="w-fit flex-1 text-xs max-sm:self-end">
                                        {subImages[index].name.length > 15
                                            ? subImages[index].name.slice(0, 15) + '...'
                                            : subImages[index].name}
                                    </p>
                                    <Button
                                        type="button"
                                        variant={'destructive'}
                                        size={'sm'}
                                        className="max-sm:self-end"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        remove
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
                {subImages.length < 4 && (
                    <>
                        <p className="text-center text-muted-foreground">
                            Drag images here or click to upload (max {4 - subImages.length} images)
                        </p>
                        <Label
                            htmlFor="subImageInput"
                            className={cn(
                                buttonVariants({ size: 'lg', variant: 'secondary' }),
                                'mx-auto flex w-fit border'
                            )}
                        >
                            Browse Files
                        </Label>
                        <Input
                            type="file"
                            id="subImageInput"
                            className="hidden"
                            multiple
                            onChange={handleInputChange}
                        />
                    </>
                )}
            </Box>
        </Box>
    )
}

export default ProductSubImages

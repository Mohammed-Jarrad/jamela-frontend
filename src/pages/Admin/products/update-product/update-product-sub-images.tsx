import RequiredStar from '@/components/required-star'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ImageProps } from '@/types'
import { Box } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
    existingSubImages: ImageProps[]
    removedPublicIds: ImageProps['public_id'][]
    setRemovedPublicIds: React.Dispatch<React.SetStateAction<ImageProps['public_id'][]>>
    newSubImages: File[]
    setNewSubImages: React.Dispatch<React.SetStateAction<File[]>>
}

const UpdateProductSubImages: React.FC<Props> = ({
    existingSubImages,
    removedPublicIds,
    setRemovedPublicIds,
    newSubImages,
    setNewSubImages,
}) => {
    const [subImages, setSubImages] = useState<ImageProps[]>([])

    
    useEffect(() => {
        setSubImages(existingSubImages)// set all existing sub images in state when component mounts
    }, [existingSubImages])

    useEffect(() => {
        setNewSubImages((prev) => prev.slice(0, 4 - subImages.length)) // slice the new sub images to complete 4 with existing sub images
    }, [setNewSubImages, subImages])

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const files = Array.from(event.dataTransfer.files)
        handleFiles(files)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        handleFiles(files)
    }

    const handleFiles = (files: File[]) => {
        const hasNoImageFile = files.some((file) => !file.type.startsWith('image/'))
        if (hasNoImageFile) {
            toast.error('Only image files are allowed')
            return
        }
        const remainingSpace = 4 - subImages.length - newSubImages.length
        if (remainingSpace === 0) return toast.error('You can only upload up to 4 images')
        setNewSubImages((prev) => [...prev, ...files.slice(0, remainingSpace)])
    }

    const handleRemoveImage = (publicId: ImageProps['public_id']) => {
        setRemovedPublicIds((prevIds) => {
            if (prevIds.includes(publicId as string)) {
                return prevIds
            } else {
                setSubImages((pre) => pre.filter((img) => img.public_id !== publicId)) // remove image from state
                return [...prevIds, publicId as string] // add image to removedPublicIds
            }
        })
    }
    const restoreImage = (publicId: ImageProps['public_id']) => {
        setRemovedPublicIds((prevIds) => prevIds.filter((id) => id !== publicId)) // remove image from removedPublicIds
        setSubImages((prev) => [...prev, existingSubImages.find((img) => img.public_id === publicId)!]) // add image to state
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
                {/* Display existing sub-images */}
                {existingSubImages.map((subImage, index) => (
                    <div
                        key={index}
                        className={cn(
                            `flex flex-row items-center justify-between gap-2 rounded-md bg-secondary p-2 transition-all`,
                            removedPublicIds.includes(subImage.public_id as string) && 'grayscale'
                        )}
                    >
                        <img
                            src={subImage.secure_url}
                            alt={`Sub Image ${index + 1}`}
                            loading="lazy"
                            className="h-20 w-20 max-w-full rounded border object-cover shadow"
                        />
                        {removedPublicIds.includes(subImage.public_id as string) && (
                            <Button
                                onClick={() => restoreImage(subImage.public_id)}
                                type="button"
                                size="sm"
                                variant="link"
                                className="flex-1 justify-end self-end"
                            >
                                cancel
                            </Button>
                        )}
                        <Button
                            type="button"
                            variant={'destructive'}
                            size={'sm'}
                            className="self-end"
                            onClick={() => handleRemoveImage(subImage.public_id)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
                {/* Display newly uploaded sub-images */}
                {newSubImages.slice(0, 4 - subImages.length).map((file, index) => (
                    <div
                        key={index}
                        className="flex flex-row items-center justify-between gap-2 rounded-md border border-red-300 bg-secondary p-2 transition-all"
                    >
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`New Sub Image ${index + 1}`}
                            className="h-20 w-20 max-w-full rounded border object-cover shadow"
                        />
                        <Button
                            type="button"
                            variant={'destructive'}
                            size={'sm'}
                            className="self-end"
                            onClick={() => setNewSubImages((prev) => prev.filter((_, i) => i !== index))}
                        >
                            Remove
                        </Button>
                    </div>
                ))}

                {/* File input for uploading new sub-images */}
                {subImages.length + newSubImages.length < 4 && (
                    <>
                        <p className="text-center text-muted-foreground">
                            Drag images here or click to upload (max {4 - subImages.length - newSubImages.length}{' '}
                            images)
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

export default UpdateProductSubImages

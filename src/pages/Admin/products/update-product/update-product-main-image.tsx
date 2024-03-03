import RequiredStar from '@/components/required-star'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ProductProps } from '@/types'
import { Box } from '@radix-ui/themes'
import React from 'react'
import { toast } from 'sonner'

type Props = {
    mainImage: File | null
    setMainImage: React.Dispatch<React.SetStateAction<File | null>>
    product: ProductProps
}

const UpdateProductMainImage: React.FC<Props> = ({ mainImage, setMainImage, product }) => {
    function handleOnDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        file && handleFile(file)
    }
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0]
        file && handleFile(file)
    }
    function handleFile(file: File) {
        if (file.type.startsWith('image/')) {
            setMainImage(file)
        } else {
            toast.error('Only image files are allowed')
        }
    }

    return (
        <Box className="flex flex-col space-y-3 lg:col-span-2">
            <Label className="text-xs text-muted-foreground md:text-sm">
                Main Image <RequiredStar />
            </Label>
            {/* Draggable box for image */}
            <Box
                className="space-y-4 rounded-md border-2 border-dashed p-6"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleOnDrop}
            >
                {mainImage || product ? (
                    <img
                        src={mainImage ? URL.createObjectURL(mainImage) : product.mainImage?.secure_url}
                        alt="Product Main Image"
                        loading="lazy"
                        className="mx-auto max-h-40 max-w-full rounded-md object-cover"
                    />
                ) : (
                    <p className="text-center text-muted-foreground">Drag image here or click to upload one</p>
                )}
                <Label
                    htmlFor="file"
                    className={cn(buttonVariants({ size: 'lg', variant: 'secondary' }), 'mx-auto flex w-fit border')}
                >
                    Browse Files
                </Label>
                <Input type="file" id="file" className="hidden" onChange={handleInputChange} />
            </Box>
        </Box>
    )
}

export default UpdateProductMainImage

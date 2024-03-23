import RequiredStar from '@/components/required-star'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Box } from '@radix-ui/themes'
import React from 'react'
import { toast } from 'sonner'
import { ProductForm } from './create-product'

type Props = {
    infos: ProductForm
    setInfos: React.Dispatch<React.SetStateAction<ProductForm>>
}

const ProductMainImage: React.FC<Props> = ({ infos, setInfos }) => {
    const { mainImage } = infos

    function changeMainImage(file: File) {
        setInfos((preInfos) => ({
            ...preInfos,
            mainImage: file,
        }))
    }

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
            changeMainImage(file)
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
                {mainImage ? (
                    <img
                        src={URL.createObjectURL(mainImage)}
                        alt="product image"
                        loading="lazy"
                        className="mx-auto max-h-40 max-w-full rounded-md object-cover"
                    />
                ) : (
                    <p className="text-center text-muted-foreground">
                        Drag image here or click to upload one
                    </p>
                )}
                <Label
                    htmlFor="file"
                    className={cn(
                        buttonVariants({ size: 'lg', variant: 'secondary' }),
                        'mx-auto flex w-fit border'
                    )}
                >
                    Browse Files
                </Label>
                <Input type="file" id="file" className="hidden" onChange={handleInputChange} />
            </Box>
        </Box>
    )
}

export default ProductMainImage

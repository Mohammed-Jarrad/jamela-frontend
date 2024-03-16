import CustomInput from '@/components/my/custom-input'
import Flex from '@/components/my/flex'
import ToolTip from '@/components/my/tooltip'
import { OptionalSpan } from '@/components/required-star'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useGetProduct, useUpdateProduct } from '@/hooks/use-products'
import { froalaConfig } from '@/lib/froala'
import {
    CategoryProps,
    ImageProps,
    ProductSizesProps,
    StatusType,
    SubcategoryProps,
    UserProps,
} from '@/types'
import Transition from '@/utils/transition'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { Box } from '@radix-ui/themes'
import { format } from 'date-fns'
import { Info } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import ProductColors from '../product-colors'
import ProductSelectCategory from '../product-select-category'
import ProductSelectSubcategory from '../product-select-subcategory'
import ProductSizes from '../product-sizes'
import UpdateProductMainImage from './update-product-main-image'
import UpdateproductSubImages from './update-product-sub-images'
const UpdateProduct = () => {
    // params
    const { slug } = useParams()
    // states
    const [name, setName] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [price, setPrice] = useState<number>()
    const [discount, setDiscount] = useState<number>()
    const [status, setStatus] = useState<StatusType>()
    const [stock, setStock] = useState<number>()
    const [categoryId, setCategoryId] = useState<CategoryProps['_id']>()
    const [subcategoryId, setSubcategoryId] = useState<SubcategoryProps['_id']>()
    const [sizes, setSizes] = useState<ProductSizesProps[]>([])
    const [colors, setColors] = useState<string[]>([])
    const [mainImage, setMainImage] = useState<File | null>(null)
    const [existingSubImages, setExistingSubImages] = useState<ImageProps[]>([])
    const [newSubImages, setNewSubImages] = useState<File[]>([])
    const [removedPublicIds, setRemovedPublicIds] = useState<ImageProps['public_id'][]>([])

    // queries and mutations
    const { data, isLoading, error, isSuccess } = useGetProduct({ slug })
    const { mutate: updateProduct, isPending } = useUpdateProduct()
    const handleErrors = useHandleErrors()

    function handleUpdateProduct(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData()
        if (name) formData.append('name', name)
        if (description && description !== data?.product.description)
            formData.append('description', description)
        if (price || price === 0) formData.append('price', price.toString())
        if (discount || discount === 0) formData.append('discount', discount.toString())
        if (stock || stock === 0) formData.append('stock', stock.toString())
        if (status && status !== data?.product.status) formData.append('status', status)
        if (categoryId && categoryId !== data?.product.categoryId?._id)
            formData.append('categoryId', categoryId)
        if (subcategoryId && subcategoryId != data?.product.subcategoryId?._id)
            formData.append('subcategoryId', subcategoryId)
        if (sizes.length && sizes !== data?.product.sizes)
            sizes.forEach((size, index) => formData.append(`sizes[${index}]`, size as string))
        if (colors.length && colors !== data?.product.colors)
            colors.forEach((color, index) => formData.append(`colors[${index}]`, color))
        if (mainImage) formData.append('mainImage', mainImage)
        if (newSubImages.length)
            newSubImages.forEach((image) => formData.append('newSubImages', image))
        if (removedPublicIds.length)
            removedPublicIds.forEach((publicId, index) =>
                formData.append(`removedPublicIds[${index}]`, publicId as string)
            )
        updateProduct(
            { id: data?.product._id, infos: formData },
            {
                onSuccess: () => {
                    setNewSubImages([]) // reset new sub images
                    setRemovedPublicIds([]) // reset removed public ids
                    setMainImage(null) // reset main image
                },
            }
        )
    }

    useEffect(() => {
        if (isSuccess) {
            setDescription(data?.product.description)
            setSizes(data?.product.sizes || [])
            setColors(data?.product.colors || [])
            setStatus(data?.product.status)
            setCategoryId(data?.product.categoryId?._id)
            setSubcategoryId(data?.product.subcategoryId?._id)
            setExistingSubImages(data?.product.subImages || [])
        }
    }, [isSuccess, data])

    if (error) handleErrors(error)
    if (isLoading) return <BeatLoader className="my-5 text-center" color="hsl(var(--primary))" />

    return (
        <Transition>
            <Helmet>
                <title>Update {slug}</title>
            </Helmet>

            <Card>
                <CardHeader>
                    <CardTitle className="mb-6 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-base font-bold text-transparent md:text-center md:text-3xl    ">
                        <Flex align="center" justify="center" gap="md">
                            <span>Update {data?.product.name}</span>
                            <ToolTip content={status}>
                                <span>
                                    <Switch
                                        checked={status === 'Active' ? true : false}
                                        onCheckedChange={(e) =>
                                            setStatus(e ? 'Active' : 'Inactive')
                                        }
                                    />
                                </span>
                            </ToolTip>
                            <ToolTip
                                disableHoverableContent={false}
                                content={
                                    <div className="text-left text-xs">
                                        <p>
                                            created at:{' '}
                                            {format(data!.product.createdAt as Date, 'Pp')}
                                        </p>
                                        <p>
                                            updated at:{' '}
                                            {format(data!.product.updatedAt as Date, 'Pp')}
                                        </p>
                                        <p>
                                            updated by:{' '}
                                            {(data!.product.updatedBy as UserProps).username}
                                        </p>
                                        <p>
                                            created by:{' '}
                                            {(data!.product.createdBy as UserProps).username}
                                        </p>
                                    </div>
                                }
                            >
                                <Info className="cursor-pointer text-muted-foreground" size={20} />
                            </ToolTip>
                        </Flex>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        className="grid grid-cols-1 gap-3 lg:grid-cols-2"
                        onSubmit={handleUpdateProduct}
                    >
                        <CustomInput
                            defaultValue={data?.product.name}
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            placeholder="Name"
                            type="text"
                        />
                        <CustomInput
                            defaultValue={data?.product.price}
                            type="number"
                            label="Price"
                            onChange={(e) => setPrice(Number(e.target.value))}
                            name="price"
                        />
                        <CustomInput
                            defaultValue={data?.product.discount}
                            type="number"
                            label="Discount"
                            onChange={(e) => setDiscount(Number(e.target.value))}
                            name="discount"
                        />
                        <CustomInput
                            defaultValue={data?.product.stock}
                            type="number"
                            label="Stock"
                            onChange={(e) => setStock(Number(e.target.value))}
                            name="stock"
                        />
                        <Box className="flex flex-col space-y-3 lg:col-span-2">
                            <Label htmlFor="description" className="w-fit text-muted-foreground">
                                Description <OptionalSpan />
                            </Label>
                            <FroalaEditor
                                config={{
                                    ...froalaConfig(),
                                }}
                                model={description || ''}
                                onModelChange={setDescription}
                            />
                        </Box>
                        <ProductSizes setSizes={setSizes} sizes={sizes} />
                        <ProductColors colors={colors} setColors={setColors} />
                        <ProductSelectCategory
                            categoryId={categoryId}
                            setCategoryId={setCategoryId}
                        />
                        <ProductSelectSubcategory
                            categoryId={categoryId}
                            setSubcategoryId={setSubcategoryId}
                        />
                        <UpdateProductMainImage
                            mainImage={mainImage}
                            setMainImage={setMainImage}
                            product={data?.product || {}}
                        />
                        <UpdateproductSubImages
                            removedPublicIds={removedPublicIds}
                            setRemovedPublicIds={setRemovedPublicIds}
                            existingSubImages={existingSubImages}
                            newSubImages={newSubImages}
                            setNewSubImages={setNewSubImages}
                        />

                        <Button
                            type="submit"
                            className="sticky bottom-2 z-20 w-full bg-opacity-90 backdrop-blur-sm lg:col-span-2"
                            size={'lg'}
                            disabled={isPending}
                        >
                            {isPending ? <BeatLoader color="white" size={13} /> : 'Save Changes'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Transition>
    )
}

export default UpdateProduct

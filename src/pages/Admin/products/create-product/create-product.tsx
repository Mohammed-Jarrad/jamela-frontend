import CustomInput from '@/components/my/custom-input'
import RequiredStar from '@/components/required-star'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useCreateProduct } from '@/hooks/use-products'
import { froalaConfig } from '@/lib/froala'
import { CategoryProps, ProductSizesProps, SubcategoryProps } from '@/types'
import Transition from '@/utils/transition'
import { Box } from '@radix-ui/themes'
import { ChangeEvent, FormEvent, useState } from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import { BeatLoader } from 'react-spinners'
import ProductColors from '../product-colors'
import ProductSelectCategory from '../product-select-category'
import ProductSelectSubcategory from '../product-select-subcategory'
import ProductSizes from '../product-sizes'
import ProductMainImage from './product-main-image'
import ProductSubImages from './product-sub-images'
import { Helmet } from "react-helmet"

const CreateProduct = () => {
    const [inputs, setInputs] = useState<{ [key: string]: string }>({})
    const [description, setDescription] = useState<string>()
    const [categoryId, setCategoryId] = useState<CategoryProps['_id']>()
    const [subcategoryId, setSubcategoryId] = useState<SubcategoryProps['_id']>()
    const [sizes, setSizes] = useState<ProductSizesProps[]>([])
    const [colors, setColors] = useState<string[]>([])
    const [mainImage, setMainImage] = useState<File | null>(null)
    const [subImages, setSubImages] = useState<File[]>([])
    const { mutate: createProduct, isPending } = useCreateProduct()
    function handleCreateProduct(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData()
        for (const key in inputs) {
            formData.append(key, inputs[key])
        }
        formData.append('description', description || '')
        formData.append('categoryId', categoryId || '')
        formData.append('subcategoryId', subcategoryId || '')
        sizes.length && sizes.forEach((size, index) => formData.append(`sizes[${index}]`, size as string))
        colors.length && colors.forEach((color, index) => formData.append(`colors[${index}]`, color))
        formData.append('mainImage', mainImage as File)
        subImages.length && subImages.forEach((image) => formData.append('subImages', image))
        createProduct(formData)
    }

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }))
    }

    return (
        <Transition>
            <Helmet>
                <title>Create Product</title>
            </Helmet>
            
            <Card>
                <CardHeader>
                    <CardTitle className="mb-6 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-base font-bold text-transparent md:text-center md:text-3xl    ">
                        Create Product
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 gap-3 lg:grid-cols-2" onSubmit={handleCreateProduct}>
                        <CustomInput
                            name="name"
                            placeholder="Product Name"
                            label="Name"
                            required
                            type="text"
                            onChange={handleChange}
                        />
                        <CustomInput
                            name="price"
                            placeholder="Product Price"
                            label="Price"
                            required
                            type="number"
                            onChange={handleChange}
                        />
                        <CustomInput
                            label="Discount"
                            name="discount"
                            type="number"
                            onChange={handleChange}
                            placeholder="Product Discount"
                            defaultValue={0}
                        />
                        <CustomInput
                            name="stock"
                            placeholder="Product Stock"
                            label="Stock"
                            type="number"
                            onChange={handleChange}
                            defaultValue={1}
                        />
                        <Box className="flex flex-col space-y-3 lg:col-span-2">
                            <Label htmlFor="description" className="w-fit text-muted-foreground">
                                Description <RequiredStar />
                            </Label>
                            <FroalaEditor
                                config={{
                                    ...froalaConfig(),
                                }}
                                model={description}
                                onModelChange={setDescription}
                            />
                        </Box>

                        <ProductSizes setSizes={setSizes} sizes={sizes} />
                        <ProductColors colors={colors} setColors={setColors} />
                        <ProductSelectCategory categoryId={categoryId} setCategoryId={setCategoryId} />
                        <ProductSelectSubcategory categoryId={categoryId} setSubcategoryId={setSubcategoryId} />
                        <ProductMainImage mainImage={mainImage} setMainImage={setMainImage} />
                        <ProductSubImages subImages={subImages} setSubImages={setSubImages} />

                        <Button type="submit" className="w-40" size={'lg'} disabled={isPending}>
                            {isPending ? <BeatLoader color="white" size={13} /> : 'Create'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Transition>
    )
}

export default CreateProduct

import CustomInput from '@/components/my/custom-input'
import RequiredStar from '@/components/required-star'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useCreateProduct } from '@/hooks/use-products'
import { froalaConfig } from '@/lib/froala'
import { yupValidateForm } from '@/lib/yup-validate-form'
import { CategoryProps, ProductSizesProps, SubcategoryProps } from '@/types'
import Transition from '@/utils/transition'
import { Box } from '@radix-ui/themes'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import FroalaEditor from 'react-froala-wysiwyg'
import { Helmet } from 'react-helmet'
import { BeatLoader } from 'react-spinners'
import * as Yup from 'yup'
import ProductColors from './product-colors'
import ProductMainImage from './product-main-image'
import ProductSelectCategory from './product-select-category'
import ProductSelectSubcategory from './product-select-subcategory'
import ProductSizes from './product-sizes'
import ProductSubImages from './product-sub-images'

export type ProductForm = {
    name: string
    price: number
    discount?: number
    stock?: number
    description: string
    sizes: ProductSizesProps[]
    colors: string[]
    categoryId: CategoryProps['_id'] | null
    subcategoryId?: SubcategoryProps['_id'] | null
    mainImage: File | null
    subImages: File[]
}

const CreateProduct = () => {
    const [infos, setInfos] = useState<ProductForm>({
        name: '',
        price: 0,
        description: '',
        sizes: [],
        colors: [],
        categoryId: null,
        mainImage: null,
        subImages: [],
    })
    const schema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters'),
        price: Yup.number().required('Price is required').min(1, 'Price must be at least 1'),
        discount: Yup.number().min(0, 'Discount must be at least 0').optional(),
        stock: Yup.number().min(1, 'Stock must be at least 1').optional(),
        description: Yup.string().required('Description is required'),
        categoryId: Yup.string().required('Category is required'),
        mainImage: Yup.mixed().required('Main image is required'),
        subImages: Yup.array()
            .min(1, 'Sub images are required')
            .required('Sub images are required')
            .of(Yup.mixed().required('Sub image is required')),
    })

    function handleChangeInputs(
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) {
        const { name, value } = e.target
        setInfos((pre) => ({
            ...pre,
            [name]: typeof pre[name as keyof ProductForm] === 'number' ? Number(value) : value,
        }))
    }

    useEffect(() => {
        console.log('infos', infos)
    }, [infos])

    const { mutate: createProduct, isPending } = useCreateProduct()

    function handleCreateProduct(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!yupValidateForm(schema, infos)) return

        const data = new FormData()

        data.append('name', infos.name)
        data.append('price', infos.price.toString())
        infos.discount && data.append('discount', infos.discount?.toString())
        infos.stock && data.append('stock', infos.stock?.toString())
        data.append('description', infos.description)
        infos.categoryId && data.append('categoryId', infos.categoryId)
        infos.subcategoryId && data.append('subcategoryId', infos.subcategoryId)
        infos.sizes.length &&
            infos.sizes.forEach((size, index) => data.append(`sizes[${index}]`, size))
        infos.colors.length &&
            infos.colors.forEach((color, index) => data.append(`colors[${index}]`, color))
        infos.mainImage && data.append('mainImage', infos.mainImage)
        infos.subImages.length &&
            infos.subImages.forEach((image) => data.append('subImages', image))

        createProduct(data)
    }

    return (
        <Transition>
            <Helmet>
                <title>Create Product Copy</title>
            </Helmet>

            <Card>
                <CardHeader>
                    <CardTitle className="custom-gradient mb-6 text-base font-bold md:text-center md:text-3xl font-poppins">
                        Create Product
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        className="grid grid-cols-1 gap-3 lg:grid-cols-2"
                        onSubmit={handleCreateProduct}
                    >
                        <CustomInput
                            name="name"
                            placeholder="Product Name"
                            label="Name"
                            type="text"
                            isRequired
                            onChange={handleChangeInputs}
                            value={infos.name || ''}
                        />
                        <CustomInput
                            name="price"
                            placeholder="Product Price"
                            label="Price"
                            type="number"
                            isRequired
                            onChange={handleChangeInputs}
                            value={infos.price || ''}
                        />
                        <CustomInput
                            label="Discount"
                            name="discount"
                            type="number"
                            onChange={handleChangeInputs}
                            value={infos.discount || ''}
                            placeholder="Product Discount"
                        />
                        <CustomInput
                            name="stock"
                            placeholder="Product Stock"
                            label="Stock"
                            type="number"
                            onChange={handleChangeInputs}
                            value={infos.stock || ''}
                        />

                        <Box className="flex flex-col space-y-3 lg:col-span-2">
                            <Label htmlFor="description" className="w-fit text-muted-foreground">
                                Description <RequiredStar />
                            </Label>
                            <FroalaEditor
                                config={{
                                    ...froalaConfig({}),
                                }}
                                model={infos.description || ''}
                                onModelChange={(value: string) => {
                                    setInfos((pre) => ({ ...pre, description: value }))
                                }}
                            />
                        </Box>

                        <ProductSizes infos={infos} setInfos={setInfos} />

                        <ProductColors infos={infos} setInfos={setInfos} />

                        <ProductSelectCategory infos={infos} setInfos={setInfos} />

                        <ProductSelectSubcategory infos={infos} setInfos={setInfos} />

                        <ProductMainImage infos={infos} setInfos={setInfos} />

                        <ProductSubImages infos={infos} setInfos={setInfos} />

                        <Button
                            type="submit"
                            className="w-full sticky bottom-1 col-span-full"
                            size={'lg'}
                            disabled={isPending}
                        >
                            {isPending ? <BeatLoader color="white" size={13} /> : 'Create'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Transition>
    )
}

export default CreateProduct

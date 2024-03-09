export interface LoginInputsProps {
    email?: string
    password?: string
}
export interface LoginData {
    token: string
    message: string
    role: 'User' | 'Admin'
}

export type Gender = 'Male' | 'Female'

export interface SignupInputsProps {
    username?: string
    email?: string
    password?: string
    phone?: string
    address?: string
    gender?: Gender
}
export interface SignupData {
    message: string
}
export type Roles = 'User' | 'Admin'
export type StatusType = 'Active' | 'Inactive'
export type ImageProps = {
    secure_url: string
    public_id: string | null
}
export type UserProps = {
    username?: string
    email?: string
    phone?: string
    address?: string
    gender?: Gender
    image?: ImageProps
    status?: StatusType
    _id?: string
    role?: Roles
    confirmEmail?: boolean
    createdAt?: Date
    updatedAt?: Date
    wishList?: ProductProps[]
    cart?: CartProps
}
export type CartProps = {
    userId: string
    products: {
        productId: string & ProductProps
        quantity: number
        size?: ProductSizesProps
        color?: string
        _id: string
    }[]
}
export type CategoryProps = {
    name?: string
    slug?: string
    _id?: string
    createdAt?: Date
    updatedAt?: Date
    createdBy?: string | UserProps
    updatedBy?: string | UserProps
    status?: StatusType
    image?: ImageProps
    subcategories?: SubcategoryProps[]
}

export type SubcategoryProps = {
    name?: string
    slug?: string
    _id?: string
    createdAt?: Date
    updatedAt?: Date
    status?: StatusType
    image?: ImageProps
    categoryId?: string | CategoryProps
    products?: ProductProps[]
}

export type ProductProps = {
    name?: string
    slug?: string
    description?: string
    stock?: number
    price?: number
    discount?: number
    finalPrice?: number
    mainImage?: ImageProps
    subImages?: ImageProps[]
    number_sellers?: number
    categoryId?: string & CategoryProps
    subcategoryId?: string & SubcategoryProps
    isDeleted?: boolean
    status?: StatusType
    createdBy?: string | UserProps
    updatedBy?: string | UserProps
    _id?: string
    createdAt?: Date
    updatedAt?: Date
    sizes?: ProductSizesProps[]
    colors?: string[]
}

export type CouponProps = {
    name?: string
    amount?: number
    usedBy: UserProps[]
    _id?: string
    expireDate?: Date
    createdBy?: UserProps & string
    updatedBy?: UserProps & string
    isDeleted?: boolean
    status?: StatusType
    createdAt?: Date
    updatedAt?: Date
}

export type HomepageProps = {
    _id: string
    mainImages: ImageProps[]
    bannerImages: ImageProps[]
    to?: string
}
export type ConstantImages = {
    _id: string
    secure_url: string
    public_id: string
    link?: string
    imageType: 'main' | 'banner'
}

export type OrderProductProps = {
    productId?: string | ProductProps
    quantity?: number
    unitPrice?: number
    finalPrice?: number
    name?: string
}
export type PaymentProps = 'cart' | 'cash'
export type OrderStatusProps = 'pending' | 'confirmed' | 'onWay' | 'delivered' | 'cancelled'
export type OrderProps = {
    userId?: string | UserProps
    products: OrderProductProps[]
    couponName?: string
    finalPrice?: number
    address?: string
    phoneNumber?: string
    paymentType?: PaymentProps
    status?: OrderStatusProps
    reasonRejected?: string
    note?: string
    updatedBy?: string | UserProps
}
export type PaginationProps = {
    limit: number
    page: number
}
export type ProductSizesProps =
    | 'XS'
    | 'S'
    | 'M'
    | 'L'
    | 'XL'
    | 'XXL'
    | 'XXXL'
    | '36'
    | '37'
    | '38'
    | '39'
    | '40'
    | '41'
    | '42'
    | '43'
    | '44'
    | '45'
    | '46'
    | '47'
    | '48'
    | '49'
    | '50'

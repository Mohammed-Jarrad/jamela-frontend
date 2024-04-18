export interface LoginData {
    token: string
    message: string
    role: 'User' | 'Admin'
}

export type Gender = 'Male' | 'Female'

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
    isNewArrival?: boolean
    createdBy?: string | UserProps
    updatedBy?: string | UserProps
    _id?: string
    createdAt?: Date
    updatedAt?: Date
    sizes?: ProductSizesProps[]
    colors?: string[]
    averageRating?: number
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

export type OrderItemProps = {
    productId: string & ProductProps
    quantity: number
    unitPrice: number
    finalPrice: number
    color?: string
    size?: ProductSizesProps
    name: string
    _id: string
}
export type PaymentProps = 'cart' | 'cash'
export enum OrderStatus {
    pending = 'pending',
    confirmed = 'confirmed',
    onWay = 'onWay',
    delivered = 'delivered',
    cancelled = 'cancelled',
}
export type OrderStatusProps = keyof typeof OrderStatus

export type OrderProps = {
    _id: string
    userId: string & UserProps
    products: OrderItemProps[]
    couponName?: string
    finalPrice: number
    address: string
    phoneNumber: string
    paymentType?: PaymentProps
    status: OrderStatusProps
    reasonRejected?: string
    note?: string
    updatedBy?: string | UserProps
    createdAt: Date
    updatedAt: Date
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

export interface ReviewProps {
    _id: string
    userId: string & Pick<UserProps, '_id' | 'username' | 'email' | 'image'>
    comment: string
    rating: number
    productId: string & Pick<ProductProps, '_id' | 'name' | 'mainImage'>
    createdAt: Date
    updatedAt: Date
}

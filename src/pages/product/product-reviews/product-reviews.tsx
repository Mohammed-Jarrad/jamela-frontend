import { useUserContext } from '@/context/UserContextProvider'
import React from 'react'
import ProductAddReview from './product-add-review'
import PorudctCustomerReviews from './product-customer-reviews'

interface Props {
    productId: string
}

const ProductReviews: React.FC<Props> = ({ productId }) => {
    const { token } = useUserContext()

    return (
        <div className="w-full my-12">
            <h4 className="mb-5 text-center font-semibold uppercase text-foreground">
                Customer Reviews
            </h4>

            <div className="flex flex-col lg:flex-row-reverse items-start gap-5 ">
                {token && <ProductAddReview productId={productId} />}
                <PorudctCustomerReviews productId={productId} />
            </div>
        </div>
    )
}

export default ProductReviews

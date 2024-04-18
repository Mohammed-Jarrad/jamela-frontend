import NoDataMessage from "@/components/not-data"
import Review from '@/components/review/review'
import { Button } from '@/components/ui/button'
import { useGetReviews } from '@/hooks/use-reviews'
import { useHandleErrors } from '@/utils/use-handle-errors'
import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'

interface Props {
    productId: string
}

const PorudctCustomerReviews: React.FC<Props> = ({ productId }) => {
    const [page, setPage] = useState<number>(1)
    const limit = 5
    const handleErrors = useHandleErrors()
    const { data, isLoading, error } = useGetReviews({
        page,
        limit,
        productId,
    })
    const pagesCount = Math.ceil(data?.totalResultsCounts ?? 0 / limit)
    if (error) handleErrors(error)
    if (isLoading) {
        return (
            <div>
                <BeatLoader color="hsl(var(--primary))" className="my-5 text-center" />
            </div>
        )
    }

    if (data && data.reviews.length === 0) {
        return (
            <NoDataMessage message="No reviews yet" className="lg:flex-1 w-full"/>
        )
    }

    if (data && data.reviews.length) {
        return (
            <div className="lg:flex-1 w-full">
                <div className="flex flex-col gap-2 w-full">
                    {data.reviews.map((review) => (
                        <Review key={review._id} review={review} />
                    ))}
                </div>

                {/* pagination */}
                <div className="flex justify-start items-center gap-2 mt-3">
                    <Button
                        onClick={() => setPage((pre) => pre - 1)}
                        disabled={page === 1}
                        variant={'outline'}
                        size={'sm'}
                        className="disabled:text-muted-foreground"
                    >
                        Prev
                    </Button>
                    <Button
                        onClick={() => setPage((pre) => pre + 1)}
                        disabled={page === pagesCount}
                        variant={'outline'}
                        size={'sm'}
                        className="disabled:text-muted-foreground"
                    >
                        Next
                    </Button>
                    {/* details */}
                    <div className="flex gap-2">
                        <p className="text-sm">{page}</p>
                        <p className="text-sm">/</p>
                        <p className="text-sm">{pagesCount}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PorudctCustomerReviews

import { useUserContext } from '@/context/UserContextProvider'
import { ReviewProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export const useGetReviews = (params: { productId?: string; page?: number; limit?: number }) => {
    const { productId, page = 1, limit = 5 } = params
    return useQuery({
        queryKey: ['reviews', productId, page, limit],
        queryFn: async () => {
            type dataProps = {
                message: string
                reviews: ReviewProps[]
                resultCount: number
                totalResultsCounts: number
            }
            const { data } = await axios.get<dataProps>(`/reviews`, {
                params: {
                    page,
                    limit,
                    ...(productId && { productId }),
                },
            })
            return data
        },
    })
}

export const useAddReview = () => {
    const { token } = useUserContext()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async (infos: { comment?: string; rating: number; productId: string }) => {
            type dataProps = {
                message: string
                review: ReviewProps
            }
            const { data } = await axios.post<dataProps>(`/reviews`, infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data
        },
        onSuccess: () => {
            toast.success('Review added successfully')
        },
        onError: handleErrors,
    })
}

export const useEditReview = () => {
    const { token } = useUserContext()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({
            reviewId,
            infos,
        }: {
            reviewId: string
            infos: { comment?: string; rating?: number }
        }) => {
            type dataProps = {
                message: string
                review: ReviewProps
            }
            const { data } = await axios.put<dataProps>(`/reviews/${reviewId}`, infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data
        },
        onSuccess: () => {
            toast.success('Review edited successfully')
        },
        onError: handleErrors,
    })
}

export const useDeleteReview = () => {
    const { token } = useUserContext()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ reviewId }: { reviewId: string }) => {
            const { data } = await axios.delete(`/reviews/${reviewId}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data
        },
        onSuccess: () => {
            toast.success('Review deleted successfully')
        },
        onError: handleErrors,
    })
}

import { useUserContext } from '@/context/UserContextProvider'
import { CouponProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

type getCouponsProps = {
    page?: number
    limit?: number
    search?: string
    sort?: string
    select?: string
}
export const useGetCoupons = ({ page = 1, limit = 5, search, sort, select }: getCouponsProps) => {
    const { token } = useUserContext()
    return useQuery({
        queryKey: ['all-coupons', page, limit, search, sort],
        queryFn: async () => {
            type dataProps = {
                message: string
                coupons: CouponProps[]
                totalCount: number
                resultCount: number
                totalResultsCounts: number
            }
            const { data } = await axios.get('/coupons', {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
                params: { page, limit, search, sort, select },
            })
            return data as dataProps
        },
    })
}

export const useCreateCoupon = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationKey: ['create-coupon'],
        mutationFn: async (infos: { name: string; amount: number; expireDate: Date }) => {
            type dataProps = { message: string; coupon: CouponProps }
            const { data } = await axios.post('/coupons', infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data as dataProps
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-coupons'] })
            toast.success('Coupon created successfully')
        },
        onError: handleErrors,
    })
}

export const useGetCoupon = (id: CouponProps['_id']) => {
    const { token } = useUserContext()
    return useQuery({
        queryKey: ['get-coupon', id],
        queryFn: async () => {
            type dataProps = { message: string; coupon: CouponProps }
            const { data } = await axios.get(`/coupons/${id}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data as dataProps
        },
    })
}

export const useUpdateCoupon = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({
            id,
            infos,
        }: {
            id: CouponProps['_id']
            infos: { name?: string; amount?: number; expireDate?: Date }
        }) => {
            type dataProps = { message?: string; coupon?: CouponProps }
            const { data } = await axios.put(`/coupons/${id}`, infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data as dataProps
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['all-coupons'] })
            queryClient.invalidateQueries({ queryKey: ['get-coupon', id] })
            toast.success('Coupon updated successfully')
        },
        onError: handleErrors,
    })
}

export const useHardDeleteCoupon = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ id }: { id: CouponProps['_id'] }) => {
            type dataProps = { message: string; couponId: CouponProps['_id'] }
            const { data } = await axios.delete(`/coupons/hardDelete/${id}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data as dataProps
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-coupons'] })
            toast.success('Coupon deleted permenantly successfully')
        },
        onError: handleErrors,
    })
}

export const useSoftDeleteCoupon = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ id }: { id: CouponProps['_id'] }) => {
            type dataProps = { message: string; coupon: CouponProps }
            const { data } = await axios.patch(
                `/coupons/softDelete/${id}`,
                {},
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data as dataProps
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['all-coupons'] })
            queryClient.invalidateQueries({ queryKey: ['get-coupon', id] })
            toast.success('Coupon inactived successfully')
        },
        onError: handleErrors,
    })
}

export const useRestoreCoupon = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ id }: { id: CouponProps['_id'] }) => {
            type dataProps = { message: string; coupon: CouponProps }
            const { data } = await axios.patch(
                `/coupons/restore/${id}`,
                {},
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data as dataProps
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['all-coupons'] })
            queryClient.invalidateQueries({ queryKey: ['get-coupon', id] })
            toast.success('Coupon actived successfully')
        },
        onError: handleErrors,
    })
}

export const useCheckCoupon = () => {
    const { token } = useUserContext()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ couponName }: { couponName: string }) => {
            type dataProps = { message: string; coupon: CouponProps }
            const { data } = await axios.post(
                `/coupons/checkCoupon`,
                {
                    couponName,
                },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data as dataProps
        },
        onSuccess: (_, { couponName }) => {
            toast.success(
                <>
                    Coupon <b className="text-teal-500 font-poppins">{couponName}</b> is valid
                </>
            )
        },
        onError: handleErrors,
    })
}

export const useClearCoupon = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ id }: { id: CouponProps['_id'] }) => {
            type dataProps = { message: string }
            const { data } = await axios.patch(
                `/coupons/clearCoupon/${id}`,
                {},
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data as dataProps
        },
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['all-coupons'] })
            queryClient.invalidateQueries({ queryKey: ['get-coupon', id] })
            toast.success('Coupon cleared successfully')
        },
        onError: handleErrors,
    })    
}
import { useCart } from '@/context/CartContextProvider'
import { useUserContext } from '@/context/UserContextProvider'
import { formatQueryParams } from '@/lib/format-query-params'
import { NewOrderProps } from '@/pages/cart/cart'
import { OrderProps, OrderStatusProps } from '@/types'
import { useHandleErrors } from '@/hooks/use-handle-errors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useCreateOrder = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const { setCart } = useCart()
    const handleErrors = useHandleErrors()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (infos: NewOrderProps) => {
            type dataProps = { message: string; order: OrderProps }
            const { data } = await axios.post<dataProps>('/orders', infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data
        },
        onSuccess: () => {
            // reset cart
            setCart((pre) => pre && { ...pre, products: [] })
            queryClient.invalidateQueries({ queryKey: ['user-orders'] })
            toast.success('Order created successfully', {
                description: 'Thank you for your order!',
                duration: 5000,
                position: 'top-center',
                action: {
                    label: 'Go to orders',
                    onClick: () => {
                        navigate('/profile?tab=orders')
                    },
                },
            })
        },
        onError: handleErrors,
    })
}

export const useGetUserOrders = (params: {
    page?: number
    limit?: number
    sort?: string
    select?: string
    enabled?: boolean
    [key: string]: any
}) => {
    const { limit = 6, page = 1, sort, select, enabled, ...rest } = params
    const { token } = useUserContext()
    return useQuery({
        queryKey: ['user-orders', page, limit, sort, select, rest],
        queryFn: async () => {
            const formattedparams = formatQueryParams({ limit, page, sort, select, ...rest })
            type dataProps = {
                message: string
                orders: OrderProps[]
                totalCount: number
                resultCount: number
                totalResultsCounts: number
            }
            const { data } = await axios.get<dataProps>('/orders/user', {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
                params: formattedparams,
            })
            return data
        },
    })
}
export const useGetAdminOrders = (params: {
    page?: number
    limit?: number
    sort?: string
    select?: string
    enabled?: boolean
    [key: string]: any
}) => {
    const { limit = 6, page = 1, sort, select, enabled, ...rest } = params
    const { token } = useUserContext()
    return useQuery({
        queryKey: ['admin-orders', page, limit, sort, select, rest],
        queryFn: async () => {
            const formattedparams = formatQueryParams({ limit, page, sort, select, ...rest })
            type dataProps = {
                message: string
                orders: OrderProps[]
                totalCount: number
                resultCount: number
                totalResultsCounts: number
            }
            const { data } = await axios.get<dataProps>('/orders', {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
                params: formattedparams,
            })
            return data
        },
    })
}

export const useCancelOrder = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async (orderId: string) => {
            type dataProps = { message: string; order: OrderProps }
            const { data } = await axios.patch<dataProps>(
                `/orders/cancel/${orderId}`,
                {},
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: (_, orderId) => {
            queryClient.invalidateQueries({ queryKey: ['user-orders'] })
            queryClient.invalidateQueries({ queryKey: ['order', orderId] })
            toast.success('Order cancelled successfully')
        },
        onError: handleErrors,
    })
}

export const useGetOrder = (params: { orderId: string; enabled?: boolean }) => {
    const { orderId, enabled = true } = params
    const { token } = useUserContext()
    return useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => {
            type dataProps = { message: string; order: OrderProps }
            const { data } = await axios.get<dataProps>(`/orders/${orderId}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data
        },
        enabled: !!enabled,
    })
}

export const useChangeOrderStatus = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({
            orderId,
            status,
            reasonRejected,
        }: {
            orderId: string
            status: OrderStatusProps
            reasonRejected?: string
        }) => {
            type dataProps = { message: string; order: OrderProps }
            const { data } = await axios.patch<dataProps>(
                `/orders/change-status/${orderId}`,
                { status, ...(reasonRejected && { reasonRejected }) },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: (_, { orderId }) => {
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
            queryClient.invalidateQueries({ queryKey: ['order', orderId] })
            toast.success('Order status changed successfully')
        },
        onError: handleErrors,
    })
}

export const useChangeOrderCoupon = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ orderId, couponName }: { orderId: string; couponName: string }) => {
            type dataProps = { message: string; order: OrderProps }
            const { data } = await axios.patch<dataProps>(
                `/orders/change-coupon/${orderId}`,
                { couponName },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: (_, { orderId, couponName }) => {
            queryClient.invalidateQueries({ queryKey: ['user-orders'] })
            queryClient.invalidateQueries({ queryKey: ['order', orderId] })
            toast.success(`Order coupon changed successfully to ${couponName}`)
        },
        onError: handleErrors,
    })
}

export const useRemoveOrderCoupon = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ orderId }: { orderId: string }) => {
            type dataProps = { message: string; order: OrderProps }
            const { data } = await axios.patch<dataProps>(
                `/orders/remove-coupon/${orderId}`,
                {},
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: (_, { orderId }) => {
            queryClient.invalidateQueries({ queryKey: ['user-orders'] })
            queryClient.invalidateQueries({ queryKey: ['order', orderId] })
            toast.success('Order coupon removed successfully')
        },
        onError: handleErrors,
    })
}

export const useEditOrderNote = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ orderId, note }: { orderId: string; note: string }) => {
            type dataProps = { message: string; order: OrderProps }
            const { data } = await axios.patch<dataProps>(
                `/orders/edit-note/${orderId}`,
                { note },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: (_, { orderId }) => {
            queryClient.invalidateQueries({ queryKey: ['user-orders'] })
            queryClient.invalidateQueries({ queryKey: ['order', orderId] })
            toast.success('Order note updated successfully')
        },
        onError: handleErrors,
    })
}

export const useDeleteOrder = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ orderId }: { orderId: string }) => {
            type dataProps = { message: string; orderId: string }
            const { data } = await axios.delete<dataProps>(`/orders/${orderId}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
            toast.success('Order deleted successfully')
        },
        onError: handleErrors,
    })
}

export const useAcceptAllOrders = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async () => {
            type dataProps = { message: string; orders: OrderProps[] }
            const { data } = await axios.patch<dataProps>(
                '/orders/accept-all',
                {},
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
            toast.success('All orders accepted successfully')
        },
        onError: handleErrors,
    })
}

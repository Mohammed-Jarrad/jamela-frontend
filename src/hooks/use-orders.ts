import { useCart } from '@/context/CartContextProvider'
import { useUserContext } from '@/context/UserContextProvider'
import { formatQueryParams } from '@/lib/format-query-params'
import { NewOrderProps } from '@/pages/cart/cart'
import { OrderProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useCreateOrder = () => {
    const { token } = useUserContext()
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
            toast.success('Order created successfully', {
                description: 'Thank you for your order!',
                duration: 5000,
                position: 'top-center',
                action: {
                    label: 'Go to orders',
                    onClick: () => {
                        navigate('/profile#orders')
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

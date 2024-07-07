import { useUserContext } from '@/context/UserContextProvider'
import { CartProps, ProductProps, ProductSizesProps } from '@/types'
import { useHandleErrors } from '@/hooks/use-handle-errors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export const useAddToCart = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    type VariableProps = {
        productId: ProductProps['_id']
        quantity?: number
        size?: ProductSizesProps
        color?: string
    }
    return useMutation({
        mutationFn: async ({ productId, quantity = 1, size, color }: VariableProps) => {
            type dataProps = { message: string; cart: CartProps }
            const { data } = await axios.post<dataProps>(
                `/carts`,
                { quantity, productId, size, color },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-cart'] })
            toast.success('Product added to cart successfully')
        },
        onError: handleErrors,
    })
}

export const useRemoveFromCart = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ itemId }: { itemId: CartProps['products'][number]['_id'] }) => {
            const { data } = await axios.patch(
                '/carts/removeItem',
                { itemId },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-cart'] })
            toast.success('Done')
        },
        onError: handleErrors,
    })
}

export const useUpdateQuantity = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({
            itemId,
            quantity,
        }: {
            quantity: number
            itemId: CartProps['products'][number]['_id']
        }) => {
            const { data } = await axios.patch(
                '/carts/updateQuantity',
                { quantity, itemId },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-cart'] })
            toast.success('Done')
        },
        onError: handleErrors,
    })
}

export const useUpdateSizeOrColor = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({
            itemId,
            productId,
            size,
            color,
        }: {
            itemId: CartProps['products'][number]['_id']
            productId: ProductProps['_id']
            size?: ProductSizesProps
            color?: string
        }) => {
            const { data } = await axios.patch(
                '/carts/updateSizeOrColor',
                {
                    productId,
                    itemId,
                    ...(size && { size }),
                    ...(color && { color }),
                },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current-cart'] })
            toast.success('Done')
        },
        onError: handleErrors,
    })
}

export const useGetCurrentCart = ({ enabled = true }: { enabled: boolean }) => {
    const { token } = useUserContext()
    return useQuery({
        queryKey: ['current-cart'],
        queryFn: async () => {
            type dataProps = { message: string; cart: CartProps }
            const { data } = await axios.get<dataProps>(`/carts`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data.cart
        },
        enabled,
    })
}

export const useClearCart = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async () => {
            const { data } = await axios.patch(
                '/carts/clearCart',
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
            queryClient.invalidateQueries({ queryKey: ['current-cart'] })
            toast.success('Cart cleared successfully')
        },
        onError: handleErrors,
    })
}

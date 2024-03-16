import { useUserContext } from '@/context/UserContextProvider'
import { formatQueryParams } from '@/lib/format-query-params'
import { ProductProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

type getProductsProps = {
    page?: number
    limit?: number
    search?: string
    sort?: string
    select?: string
    enabled?: boolean
    [key: string]: any
}
export type GetProductsProps = {
    message: string
    totalCount: number
    resultCount: number
    totalResultsCounts: number
    products: ProductProps[]
}
export const useGetProducts = ({
    page = 1,
    limit = 6,
    search,
    sort,
    select,
    enabled = true,
    ...rest
}: getProductsProps) => {
    const { token } = useUserContext()
    return useQuery({
        queryKey: ['all-products', page, limit, search, sort, rest],
        queryFn: async () => {
            const formattedparams = formatQueryParams({
                page,
                limit,
                search,
                sort,
                select,
                ...rest,
            })
            const { data } = await axios.get('/products', {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
                params: formattedparams,
            })
            return data as GetProductsProps
        },
        enabled: !!enabled,
    })
}
export const useGetActiveProducts = ({
    page = 1,
    limit = 6,
    search,
    sort,
    select,
    enabled = true,
    ...rest
}: getProductsProps = {}) => {
    return useQuery({
        queryKey: ['all-products', page, limit, search, sort, rest],
        queryFn: async () => {
            const formattedparams = formatQueryParams({
                page,
                limit,
                search,
                sort,
                select,
                ...rest,
            })
            const { data } = await axios.get('/products/active', {
                params: formattedparams,
            })
            return data as GetProductsProps
        },
        enabled: !!enabled,
    })
}

export const useCreateProduct = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async (infos: FormData) => {
            type dataProps = { message: string; product: ProductProps }
            const { data } = await axios.post('/products', infos, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data as dataProps
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-products'] })
            toast.success('Product created successfully')
        },
        onError: (e) => {
            handleErrors(e)
        },
    })
}

export const useGetProduct = (params: {
    id?: ProductProps['_id']
    slug?: ProductProps['slug']
}) => {
    const { id, slug } = params
    return useQuery({
        queryKey: ['get-product', id, slug],
        queryFn: async () => {
            type dataProps = { message: string; product: ProductProps }
            const { data } = await axios.get(`/products/getSingle`, {
                params: {
                    ...(id ? { _id: id } : { slug: slug }),
                },
            })
            return data as dataProps
        },
    })
}

export const useUpdateProduct = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ id, infos }: { id: ProductProps['_id']; infos: FormData }) => {
            type dataProps = { message: string; product: ProductProps }
            const { data } = await axios.put(`/products/${id}`, infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            return data as dataProps
        },
        onSuccess: ({ product: { slug, _id: id } }) => {
            queryClient.invalidateQueries({ queryKey: ['all-products'] })
            queryClient.refetchQueries({ queryKey: ['get-product', slug, id] })
            toast.success('Product updated successfully')
        },
        onError: handleErrors,
    })
}

export const useDeleteProduct = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()

    return useMutation({
        mutationFn: async (id: ProductProps['_id']) => {
            type dataProps = { message: string; productId: ProductProps['_id'] }
            const { data } = await axios.delete(`/products/${id}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data as dataProps
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-products'] })
            toast.success('Product deleted successfully.')
        },
        onError: handleErrors,
    })
}

import { useUserContext } from '@/context/UserContextProvider'
import { formatQueryParams } from '@/lib/format-query-params'
import { CategoryProps, SubcategoryProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

type getCategoriesProps = {
    page?: number
    limit?: number
    search?: string
    sort?: string
    populate?: boolean
    select?: string
    subselect?: string
    [key: string]: any
}
export const useGetCategories = ({
    page = 1,
    limit = 6,
    search,
    populate,
    select,
    sort,
    subselect,
    ...rest
}: getCategoriesProps) => {
    const { token } = useUserContext()
    return useQuery({
        queryKey: ['all-categories', page, limit, search, sort, rest],
        queryFn: async () => {
            type dataProps = {
                message: string
                categories: CategoryProps[]
                totalCount: number
                resultCount: number
                totalResultsCounts: number
            }
            const formattedparams = formatQueryParams({
                page,
                limit,
                search,
                populate,
                subselect,
                sort,
                select,
                ...rest,
            })
            const { data } = await axios.get(`/categories`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
                params: formattedparams,
            })
            return data as dataProps
        },
    })
}
export const useGetActiveCategories = ({
    page = 1,
    limit = 10000,
    search,
    populate,
    select,
    sort,
    subselect,
    ...rest
}: getCategoriesProps = {}) => {
    return useQuery({
        queryKey: ['all-categories', page, limit, search, sort, rest],
        queryFn: async () => {
            type dataProps = {
                message: string
                categories: CategoryProps[]
                totalCount: number
                resultCount: number
                totalResultsCounts: number
            }
            const formattedparams = formatQueryParams({
                page,
                limit,
                search,
                populate,
                subselect,
                sort,
                select,
                ...rest,
            })
            const { data } = await axios.get(`/categories/active`, {
                params: formattedparams,
            })
            return data as dataProps
        },
    })
}

export const useUpdateCategory = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationKey: ['update-category'],
        mutationFn: async ({ id, infos }: { id: CategoryProps['_id']; infos: FormData }) => {
            const { data } = await axios.put(`/categories/${id}`, infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            return data
        },
        onSuccess: (_, variables) => {
            // refetch the query to get the updated data
            queryClient.invalidateQueries({ queryKey: ['get-category', variables.id] })
            toast.success('Category updated successfully')
        },
        onError: handleErrors,
    })
}

export const useGetCategory = (params: { id?: CategoryProps['_id']; slug?: CategoryProps['slug'] }) => {
    const { id, slug } = params

    return useQuery({
        queryKey: ['get-category', id, slug],
        queryFn: async () => {
            type dataProps = { message: 'success' | string; category: CategoryProps }
            const { data } = await axios.get<dataProps>(`/categories/getSingle`, {
                params: {
                    ...(id ? { _id: id } : { slug }),
                },
            })
            return data
        },
    })
}

export const useCreateCategory = () => {
    const { token } = useUserContext()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationKey: ['create-category'],
        mutationFn: async (infos: FormData) => {
            type dataProps = { message: string; category: CategoryProps }
            const { data } = await axios.post(`/categories`, infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            return data as dataProps
        },
        onSuccess: () => {
            toast.success('Category created successfully')
        },
        onError: handleErrors,
    })
}

export const useDeleteCategory = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationKey: ['delete-category'],
        mutationFn: async (id: CategoryProps['_id']) => {
            type dataProps = { message: 'success' | string; categoryId: CategoryProps['_id'] }
            const { data } = await axios.delete(`/categories/${id}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data as dataProps
        },
        onSuccess: (data) => {
            // refetch the query to get the updated data
            console.log('data: ', data)
            queryClient.invalidateQueries({ queryKey: ['all-categories'] })
            toast.success('Category deleted successfully')
        },
        onError: handleErrors,
    })
}

export const useGetSucategoriesForCategory = (categoryId: CategoryProps['_id']) => {
    return useQuery({
        queryKey: ['get-sucategories-for-category', categoryId],
        queryFn: async () => {
            type dataProps = { message: string; subcategories: SubcategoryProps[] }
            const { data } = await axios.get(`/categories/${categoryId}/subcategory`)
            return data as dataProps
        },
        enabled: !!categoryId,
    })
}

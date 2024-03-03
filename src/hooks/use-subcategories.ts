import { useUserContext } from '@/context/UserContextProvider'
import { SubcategoryProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

type getSubcategoriesProps = {
    page?: number
    limit?: number
    search?: string
    sort?: string
    populate?: boolean
    select?: string
    subselect?: string
    checking?: boolean
    [key: string]: any
}
export const useGetSubcategories = ({
    page = 1,
    limit = 6,
    search,
    populate,
    select,
    sort,
    subselect,
    checking = true,
    ...rest
}: getSubcategoriesProps) => {
    const { token } = useUserContext()
    type dataProps = {
        message: string
        subcategories: SubcategoryProps[]
        totalCount: number
        resultCount: number
        totalResultsCounts: number
    }
    return useQuery({
        queryKey: ['all-subcategories', page, limit, search, sort, rest],
        queryFn: async () => {
            const { data } = await axios.get<dataProps>('/subcategory/all', {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
                params: { page, limit, search, populate, select, sort, subselect, ...rest },
            })
            return data
        },
        enabled: !!checking,
    })
}

export const useCreateSubcategory = () => {
    const { token } = useUserContext()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationKey: ['create-subcategory'],
        mutationFn: async (infos: FormData) => {
            console.log('Creating subcategory')
            const { data } = await axios.post('/subcategory', infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            return data
        },
        onSuccess: () => {
            toast.success('Subcategory created successfully')
        },
        onError: handleErrors,
    })
}

export const useGetSubcategory = (
    params: { id?: SubcategoryProps['_id']; slug?: SubcategoryProps['slug'] },
    query?: { select?: string; populate?: boolean; subselect?: string }
) => {
    const { select, populate, subselect } = query || {}
    const { id, slug } = params
    return useQuery({
        queryKey: ['get-subcategory', id, slug],
        queryFn: async () => {
            type dataProps = { message: string; subcategory: SubcategoryProps }
            const { data } = await axios.get(`/subcategory/getSingle`, {
                params: { select, populate, subselect, ...(id ? { _id: id } : { slug }) },
            })
            return data as dataProps
        },
    })
}

export const useUpdateSubcategory = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationKey: ['update-subcategory'],
        mutationFn: async ({ id, infos }: { id: SubcategoryProps['_id']; infos: FormData }) => {
            type dataProps = { message: string; subcategory: SubcategoryProps }
            const { data } = await axios.put(`/subcategory/${id}`, infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            return data as dataProps
        },
        onSuccess: (_, { id }) => {
            // refetch the query to get the updated data
            queryClient.invalidateQueries({ queryKey: ['get-subcategory', id] })
            toast.success('Subcategory updated successfully')
        },
        onError: handleErrors,
    })
}

export const useDeleteSubcategory = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationKey: ['delete-subcategory'],
        mutationFn: async ({ id }: { id: SubcategoryProps['_id'] }) => {
            type dataProps = { message: string; subcategoryId: SubcategoryProps['_id'] }
            const { data } = await axios.delete(`/subcategory/${id}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data as dataProps
        },
        onSuccess: () => {
            // refetch the query to get the updated data
            queryClient.invalidateQueries({ queryKey: ['all-subcategories'] })
            toast.success('Subcategory deleted successfully')
        },
        onError: handleErrors,
    })
}

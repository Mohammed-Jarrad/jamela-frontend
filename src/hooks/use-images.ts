import { useUserContext } from '@/context/UserContextProvider'
import { ConstantImages } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

type GetImages = {
    imageType?: ConstantImages['imageType']
}

export const useGetImages = ({ imageType }: GetImages = {}) => {
    return useQuery({
        queryKey: ['images', imageType],
        queryFn: async () => {
            type dataProps = { message: string; images: ConstantImages[] }
            const { data } = await axios.get<dataProps>('/images', {
                params: { imageType },
            })
            return data
        },
    })
}

export const useCreateNewImage = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async (infos: FormData) => {
            const { data } = await axios.post('/images', infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            return data as { message: string; image: ConstantImages }
        },
        onSuccess: ({ image: { imageType } }) => {
            queryClient.invalidateQueries({ queryKey: ['images', imageType] })
            toast.success('Image created successfully')
        },
        onError: handleErrors,
    })
}

export const useUpdateImage = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ id, infos }: { id: ConstantImages['_id']; infos: FormData }) => {
            const { data } = await axios.put(`/images/${id}`, infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            return data as { message: string; image: ConstantImages }
        },
        onSuccess: ({ image: { imageType } }) => {
            queryClient.invalidateQueries({ queryKey: ['images', imageType] })
            toast.success('Image updated successfully')
        },
        onError: handleErrors,
    })
}

export const useDeleteImage = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async (id: ConstantImages['_id']) => {
            const { data } = await axios.delete(`/images/${id}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data as { message: string; imageId: ConstantImages['_id'] }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['images'] })
            toast.success('Image deleted successfully')
        },
        onError: handleErrors,
    })
}

export const useGetSingleImage = (id: ConstantImages['_id']) => {
    const { token } = useUserContext()
    return useQuery({
        queryKey: ['image', id],
        queryFn: async () => {
            type dataProps = { message: string; image: ConstantImages }
            const { data } = await axios.get<dataProps>(`/images/${id}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data
        },
        enabled: !!id,
    })
}

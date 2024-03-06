import { useUserContext } from '@/context/UserContextProvider'
import { ProductProps, UserProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export const useGetCurrentUser = ({ enabled = true }: { enabled: boolean }) => {
    const { token, setCurrentUser } = useUserContext()
    return useQuery({
        queryKey: ['current-user'],
        queryFn: async () => {
            type dataProps = { message: string; user: UserProps }
            const { data, status } = await axios.get<dataProps>(`/users/profile`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            if (status === 200) {
                setCurrentUser(data.user)
            }
            return data
        },
        enabled: !!enabled,
    })
}

export const useUpdateProfile = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async (infos: FormData) => {
            const { data } = await axios.put('/users/profile', infos, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    'Content-Type': 'multipart/form-data',
                },
            })
            return data
        },
        onSuccess: () => {
            // refetch the query to get the updated data
            queryClient.invalidateQueries({ queryKey: ['current-user'] })
            toast.success('Profile updated successfully')
        },
        onError: handleErrors,
    })
}

export const useAddOrRemoveProductToWishList = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async (productId: ProductProps['_id']) => {
            type dataProps = { message: string }
            const { data } = await axios.patch<dataProps>(
                `/users/wishlist/${productId}`,
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
            queryClient.invalidateQueries({ queryKey: ['current-user'] }) // refetch the query to get the updated data
            toast.success('Done')
        },
        onError: handleErrors,
    })
}

type useGetAllUsersProps = {
    enabled?: boolean
    page?: number
    limit?: number
    search?: string
    sort?: string
    select?: string
}
export const useGetAllUsers = (props: useGetAllUsersProps) => {
    const { enabled = true, page = 1, limit = 6, search, sort, select } = props
    const { token } = useUserContext()
    return useQuery({
        queryKey: ['all-users', page, limit, search, sort, select],
        queryFn: async () => {
            type dataProps = {
                message: string
                users: UserProps[]
                totalCount: number
                resultCount: number
                totalResultsCounts: number
            }
            const { data } = await axios.get<dataProps>(`/users`, {
                headers: { Authorization: import.meta.env.VITE_BEARER_KEY + token },
                params: { page, limit, search, sort, select },
            })
            return data
        },
        enabled: !!enabled,
    })
}

export const useChangeUserRoleAndStatus = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ userId, role, status }: { userId: UserProps['_id']; role?: string; status?: string }) => {
            const { data } = await axios.patch(
                `/users/${userId}`,
                { role, status },
                {
                    headers: {
                        Authorization: import.meta.env.VITE_BEARER_KEY + token,
                    },
                }
            )
            return data
        },
        onSuccess: () => {
            // refetch the query to get the updated data
            queryClient.invalidateQueries({ queryKey: ['all-users'] })
            toast.success('Done')
        },
        onError: handleErrors,
    })
}

export const useDeleteUser = () => {
    const { token } = useUserContext()
    const queryClient = useQueryClient()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async (userId: UserProps['_id']) => {
            type dataProps = { message: string; userId: UserProps['_id'] }
            const { data } = await axios.delete(`/users/${userId}`, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return data as dataProps
        },
        onSuccess: () => {
            // refetch the query to get the updated data
            queryClient.invalidateQueries({ queryKey: ['all-users'] })
            toast.success('User deleted successfully')
        },
        onError: handleErrors,
    })
}

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

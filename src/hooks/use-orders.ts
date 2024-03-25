import { useUserContext } from "@/context/UserContextProvider"
import { NewOrderProps } from "@/pages/cart/cart"
import { useHandleErrors } from "@/utils/use-handle-errors"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useCreateOrder = () => {
    const { token } = useUserContext()
    const handleErrors = useHandleErrors()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (data: NewOrderProps) => {
            const { data: order } = await axios.post('/orders', data, {
                headers: {
                    Authorization: import.meta.env.VITE_BEARER_KEY + token,
                },
            })
            return order
        },  
        onSuccess: () => {
            toast.success('Order created successfully', {
                description: 'Thank you for your order!',
                action: {
                    label: 'Go to orders',
                    onClick: () => {
                        navigate('/profile#orders')
                    },
                }
            })
        },
        onError: handleErrors
    })
}
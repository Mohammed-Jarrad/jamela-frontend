import { useUserContext } from '@/context/UserContextProvider'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

type ErrorDataProps = { message: string; messages: string[]; logout?: boolean }

export const useHandleErrors = () => {
    const { logout } = useUserContext()

    const checkAxiosError = (error: Error | AxiosError) =>
        error instanceof AxiosError ? error : null

    return (error: Error | AxiosError) => {
        const data: ErrorDataProps = {
            message: checkAxiosError(error)?.response?.data?.message || error.message,
            messages: checkAxiosError(error)?.response?.data?.messages || [],
            logout: checkAxiosError(error)?.response?.data?.logout || false,
        }

        if (data?.logout) {
            logout()
            window.location.assign(`/auth/login?message=${data.message || 'you must login again'}`)
        }

        const { message, messages } = data

        if (messages.length > 0) {
            toast.error(message, { position: 'bottom-left' })
            messages.reverse().forEach((msg: string) => {
                toast.warning(msg, { position: 'bottom-left' })
            })
            return
        }
        return toast.error(message, { position: 'bottom-left' })
    }
}

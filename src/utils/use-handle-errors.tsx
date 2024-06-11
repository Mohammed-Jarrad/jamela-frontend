import { useUserContext } from '@/context/UserContextProvider'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

type ErrorDataProps = { message: string; messages: string[]; logout?: boolean }

export const useHandleErrors = () => {
    const { logout } = useUserContext()

    const isAxiosError = (error: Error | AxiosError) =>
        error instanceof AxiosError ? error : null

    return (error: Error | AxiosError) => {
        const data: ErrorDataProps = {
            message: isAxiosError(error)?.response?.data?.message || error.message,
            messages: isAxiosError(error)?.response?.data?.messages || [],
            logout: isAxiosError(error)?.response?.data?.logout || false,
        }

        if (data?.logout) {
            logout()
            window.location.assign(`/auth/login?message=${data.message || "You must login again"}`)
        }

        const { message, messages } = data

        if (messages.length > 0) {
            toast.error(message, { position: 'top-center' })
            messages.reverse().forEach((msg: string) => {
                toast.warning(msg, { position: 'top-center' })
            })
            return
        }
        return toast.error(message, { position: 'top-center' })
    }
}

import { useUserContext } from '@/context/UserContextProvider'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

const tokenExpiredMsg: string = import.meta.env.VITE_TOKEN_EXPIRED_MSG

function handleAllErrors(message: string, messages: string[] = []) {
    if (message?.trim().split('\n').length > 1) {
        message
            .trim()
            .split('\n')
            .forEach((msg: string) => {
                toast.error(msg, { position: 'bottom-left' })
            })
        return
    }
    if (messages.length > 0) {
        messages.forEach((msg: string) => {
            toast.error(msg, { position: 'bottom-left' })
        })
        return
    }
    return toast.error(message, { position: 'bottom-left' })
}

export const useHandleErrors = () => {
    const { logout } = useUserContext()
    return (error: Error | AxiosError) => {
        if (
            error.message == tokenExpiredMsg ||
            (error instanceof AxiosError && error?.response?.data?.message == tokenExpiredMsg)
        ) {
            logout()
            // redirect to login and clear the cache from the browser
            window.location.assign('/auth/login?message=token-expired')
        }
        handleAllErrors(
            error instanceof AxiosError ? error.response?.data?.message : error.message,
            error instanceof AxiosError ? error.response?.data?.messages || [] : []
        )
    }
}

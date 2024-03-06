import { useUserContext } from '@/context/UserContextProvider'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

const TOKEN_EXPIRED_MESSAGE = 'token expired'

export function handleAllErrors(message: string, messages: string[] = []) {
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
        const message = error instanceof AxiosError ? error.response?.data?.message : error.message
        const messages = error instanceof AxiosError ? error.response?.data?.messages || [] : []

        if (
            message == TOKEN_EXPIRED_MESSAGE ||
            (error instanceof AxiosError && error?.response?.data?.action == 'logout')
        ) {
            logout()
            window.location.assign('/auth/login?message=token-expired')
        }

        handleAllErrors(message, messages)
    }
}

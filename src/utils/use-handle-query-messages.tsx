import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'

type ConfirmEmailMessagesProps = string | 'email-confirmed' | 'email-not-confirmed' | 'token-expired' | null
type MessageStatusProps = 'success' | 'error'

const useHandleMessages = () => {
    const location = useLocation()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const message = params.get('message') as ConfirmEmailMessagesProps
        const status = (params.get('status') as MessageStatusProps) || 'error'

        const handleMessages = () => {
            switch (message) {
                case 'email-confirmed':
                    toast.success('Account verified successfully!')
                    break
                case 'email-not-confirmed':
                    toast.error('Something went wrong! or account already verified!')
                    break
                case 'token-expired':
                    toast.error('Token expired! Please login again!')
                    break
                default:
                    if (status === 'error' && message) toast.error(message)
                    if (status === 'success' && message) toast.success(message)
                    break
            }
        }
        handleMessages()
    }, [location.search])

    return
}

export default useHandleMessages

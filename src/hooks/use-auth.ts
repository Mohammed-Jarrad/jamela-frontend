import { useUserContext } from '@/context/UserContextProvider'
import { LoginInputsProps, SignupData, SignupInputsProps, UserProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useLogin = () => {
    const { setToken } = useUserContext()
    const handleErrors = useHandleErrors()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (infos: LoginInputsProps) => {
            type dataProps = { message: string; token: string; user: UserProps }
            const { data } = await axios.post(`/auth/signin`, infos)
            return data as dataProps
        },
        onSuccess: (data) => {
            setToken(data.token)
            data.user.role == 'Admin' ? navigate('/dashboard') : navigate('/')
        },
        onError: handleErrors,
    })
}
export const useSignup = () => {
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async (infos: SignupInputsProps) => {
            const { data } = await axios.post<SignupData>(`/auth/signup`, infos)
            return data
        },
        onSuccess: () =>
            toast.success('Account created successfully', {
                description: `Please check your email to verify your account`,
            }),
        onError: handleErrors,
    })
}

export const useSendCode = () => {
    const navigate = useNavigate()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ email }: { email: string }) => {
            type dataProps = { message: string; token: string }
            const { data } = await axios.patch(`/auth/sendCode`, { email })
            return data as dataProps
        },
        onSuccess: ({ token }, { email }) => {
            toast.success(`Code sent to`, {
                description: email,
            })
            navigate(`/auth/check-code/${token}`)
        },
        onError: handleErrors,
    })
}

export const useCheckCode = () => {
    const navigate = useNavigate()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ token, code }: { token: string; code: string }) => {
            type dataProps = { message: string; token: string }
            const { data } = await axios.patch(`/auth/checkCode/${token}`, { code })
            return data as dataProps
        },
        onSuccess: ({ token: resetPasswordToken }) => {
            navigate(`/auth/reset-password/${resetPasswordToken}`)
        },
        onError: handleErrors,
    })
}

export const useResetPassword = () => {
    const navigate = useNavigate()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ token, newPassword }: { token: string; newPassword: string }) => {
            type dataProps = { message: string }
            const { data } = await axios.patch(`/auth/resetPassword/${token}`, { newPassword })
            return data as dataProps
        },
        onSuccess: () => {
            toast.success('Password changed successfully')
            navigate(`/auth/login`)
        },
        onError: handleErrors,
    })
}

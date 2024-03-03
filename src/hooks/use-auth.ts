import { useUserContext } from '@/context/UserContextProvider'
import { LoginInputsProps, SignupData, SignupInputsProps, UserProps } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const { setToken } = useUserContext()
    const handleErrors = useHandleErrors()
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async ({ email, password }: LoginInputsProps) => {
            type dataProps = { message: string; token: string; user: UserProps }
            const { data } = await axios.post(`/auth/signin`, { email, password })
            return data as dataProps
        },
        onSuccess: (data) => {
            setToken(data.token)
            data.user.role == 'Admin' ? navigate('/dashboard') : navigate('/')
        },
        onError: (e) => handleErrors(e),
    })
}
export const useSignup = () => {
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationKey: ['signup'],
        mutationFn: async (infos: SignupInputsProps) => {
            const { data } = await axios.post<SignupData>(`/auth/signup`, infos)
            return data
        },
        onSuccess: () =>
            toast.success('Account created successfully Please', {
                description: `check your email to verify your account`,
            }),
        onError: (e) => handleErrors(e),
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
            toast.success(`We sent a code to this email`, {
                description: email,
            })
            navigate(`/auth/check-code/${token}`)
        },
        onError: (err) => handleErrors(err),
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
        onError: (err) => handleErrors(err),
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
        onError: (err) => handleErrors(err),
    })
}
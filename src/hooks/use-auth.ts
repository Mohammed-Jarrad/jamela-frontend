import { useUserContext } from '@/context/UserContextProvider'
import { Gender, SignupData, StatusType } from '@/types'
import { useHandleErrors } from '@/utils/use-handle-errors'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export interface SignupInputsProps {
    username: string
    email: string
    password: string
    phone?: string
    address?: string
    gender?: Gender
}
export interface LoginInputsProps {
    email: string
    password: string
}

export const useLogin = () => {
    const { setToken } = useUserContext()
    const handleErrors = useHandleErrors()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (infos: LoginInputsProps) => {
            type dataProps = { message: string; token: string }
            const { data } = await axios.post(`/auth/signin`, infos)
            return data as dataProps
        },
        onSuccess: ({ token }) => {
            setToken(token)
            type TokenPayload = { role: string; id: string; status: StatusType }
            const tokenPayload = jwtDecode<TokenPayload>(token)
            tokenPayload.role == 'Admin' ? navigate('/dashboard') : navigate('/')
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
    const { token, currentUser } = useUserContext()
    const navigate = useNavigate()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ email }: { email: string }) => {
            type dataProps = { message: string; token: string }
            const { data } = await axios.patch(`/auth/sendCode`, { email })
            return data as dataProps
        },
        onSuccess: ({ token: resultToken }, { email }) => {
            toast.success(`Code sent to`, {
                description: email,
            })
            if (!token || (token && currentUser.role != 'Admin')) {
                navigate(`/auth/check-code/${resultToken}`)
            } else {
                navigate(`/dashboard/check-code/${resultToken}`)
            }
        },
        onError: handleErrors,
    })
}

export const useCheckCode = () => {
    const { token, currentUser } = useUserContext()
    const navigate = useNavigate()
    const handleErrors = useHandleErrors()
    return useMutation({
        mutationFn: async ({ token, code }: { token: string; code: string }) => {
            type dataProps = { message: string; token: string }
            const { data } = await axios.patch(`/auth/checkCode/${token}`, { code })
            return data as dataProps
        },
        onSuccess: ({ token: resetPasswordToken }) => {
            if (!token || (token && currentUser.role != 'Admin')) {
                navigate(`/auth/reset-password/${resetPasswordToken}`)
            } else {
                navigate(`/dashboard/reset-password/${resetPasswordToken}`)
            }
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

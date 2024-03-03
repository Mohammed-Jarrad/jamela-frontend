// create use context
import { UserProps } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import React, { createContext, useContext, useEffect, useState } from 'react'
interface UserContextType {
    token: string
    setToken: React.Dispatch<React.SetStateAction<string>>
    currentUser: UserProps
    setCurrentUser: React.Dispatch<React.SetStateAction<UserProps>>
    logout: () => void
}
export const UserContext = createContext<UserContextType | null>(null)
interface UserContextProviderProps {
    children: React.ReactNode
}
const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string>(Cookies.get(import.meta.env.VITE_TOKEN_NAME) || '')
    const [currentUser, setCurrentUser] = useState<UserProps>({})
    const queryClient = useQueryClient()

    useEffect(() => {
        Cookies.set(import.meta.env.VITE_TOKEN_NAME, token)
    }, [token])

    function logout() {
        setToken('')
        queryClient.clear()
    }

    return (
        <UserContext.Provider value={{ token, setToken, currentUser, setCurrentUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (context === null) {
        throw new Error('useUserContext must be used within a UserContextProvider')
    }
    return context as UserContextType
}

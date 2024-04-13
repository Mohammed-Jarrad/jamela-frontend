import { useUserContext } from '@/context/UserContextProvider'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const UserRoutes: React.FC = () => {
    const { token, currentUser } = useUserContext()
    const isUser = currentUser?.role === 'User' && token
    return isUser ? <Outlet /> : <Navigate to="/auth/login" replace />
}

export default UserRoutes

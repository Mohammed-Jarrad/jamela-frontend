import { useUserContext } from '@/context/UserContextProvider'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes: React.FC = () => {
    const { token } = useUserContext()
    return token ? <Outlet /> : <Navigate to="/auth/login" />
}

export default PrivateRoutes

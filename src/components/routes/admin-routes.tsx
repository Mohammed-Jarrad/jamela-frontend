import { useUserContext } from '@/context/UserContextProvider'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes: React.FC = () => {
    const { token, currentUser } = useUserContext()
    return token && currentUser?.role === 'Admin' ? <Outlet /> : <Navigate to="/auth/login" />
}

export default AdminRoutes

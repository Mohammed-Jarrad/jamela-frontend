import { useUserContext } from '@/context/UserContextProvider'
import Dashboard from '@/pages/Admin/dashboard'
import { Navigate } from 'react-router-dom'

const AdminRoot = () => {
    const { currentUser, token } = useUserContext()
    const isAdmin = currentUser?.role === 'Admin' && token

    if (!isAdmin) return <Navigate to="/auth/login" replace/>
    
    return <Dashboard />
}

export default AdminRoot

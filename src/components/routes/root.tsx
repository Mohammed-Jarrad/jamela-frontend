import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '../../context/UserContextProvider'
import Footer from '../footer'
import Header from '../header/header'

const Root = () => {
    const { currentUser, token } = useUserContext()
    const isAdmin = currentUser?.role === 'Admin' && token

    if (isAdmin) return <Navigate to="/dashboard" />

    return (
        <>
            <Header />
            <main className="grid min-h-full-screen-header grid-cols-1">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Root

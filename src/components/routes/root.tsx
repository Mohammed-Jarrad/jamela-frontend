import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from "../../context/UserContextProvider"
import ScrollWhenRefresh from '../../utils/scroll-when-refresh'
import Footer from '../footer'
import Header from '../header/header'

const Root = () => {
    const { currentUser, token } = useUserContext()
    const isAdmin = currentUser?.role === "Admin" && token

    if (isAdmin) return <Navigate to="/dashboard" />
    
    return (
        <ScrollWhenRefresh>
            <Header />
            <main className="grid min-h-full-screen-header grid-cols-1">
                <Outlet />
            </main>
            <Footer />
        </ScrollWhenRefresh>
    )
}

export default Root

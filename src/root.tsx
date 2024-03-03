import { Navigate, Outlet } from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header/header'
import { useUserContext } from './context/UserContextProvider'
import ScrollWhenRefresh from './utils/scroll-when-refresh'

const Root = () => {
    const { token, currentUser } = useUserContext()
    const isAdmin = token && currentUser?.role === 'Admin'

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

import ScrollWhenRefresh from '@/utils/scroll-when-refresh'
import { Outlet } from 'react-router-dom'
import Header from '../header/header'

const AuthRoot = () => {
    return (
        <ScrollWhenRefresh>
            <Header />
            <main className="grid min-h-full-screen-header grid-cols-1">
                <Outlet />
            </main>
        </ScrollWhenRefresh>
    )
}

export default AuthRoot

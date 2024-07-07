import { Outlet } from 'react-router-dom'
import Header from '../header/header'

const AuthRoot = () => {
    return (
        <>
            <Header />
            <main className="grid min-h-full-screen-header grid-cols-1">
                <Outlet />
            </main>
        </>
    )
}

export default AuthRoot

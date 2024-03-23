import Transition from '@/utils/transition'
import React, { useEffect } from 'react'
import DashboardContent from './dashboard-content'
import DashboardNav from './dashboard-nav'
import { Helmet } from 'react-helmet'

type DashboardContextProps = {
    showNav: boolean
    setShowNav: React.Dispatch<React.SetStateAction<boolean>>
}

export const DashboardContext = React.createContext<DashboardContextProps | null>(null)

const Dashboard = () => {
    const [showNav, setShowNav] = React.useState(false)

    useEffect(() => {
        if (window.matchMedia('(min-width: 1024px)').matches) {
            setShowNav(true)
        }
    }, [])

    return (
        <DashboardContext.Provider value={{ showNav, setShowNav }}>
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>
            <Transition className="flex min-h-screen w-full items-start">
                <DashboardNav />
                <DashboardContent />
            </Transition>
        </DashboardContext.Provider>
    )
}

export default Dashboard

export const useDashboardContext = () => {
    const context = React.useContext(DashboardContext)
    if (!context) {
        throw new Error('useDashboardContext must be used within a DashboardContextProvider')
    }
    return context
}

import ThemeProvider from '@/context/ThemeContextProvider'
import UserContextProvider from '@/context/UserContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MyToaster from './my/my-taoster'
import { TooltipProvider } from './ui/tooltip'

type PorvidersType = {
    children: React.ReactNode
}

const queryClient = new QueryClient()

const Providers = ({ children }: PorvidersType) => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme="light" storageKey="ui-theme">
                    <UserContextProvider>
                        <TooltipProvider delayDuration={200}>
                            <MyToaster />
                            {children}
                        </TooltipProvider>
                    </UserContextProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default Providers

import CartContextProvider from '@/context/CartContextProvider'
import ThemeProvider from '@/context/ThemeContextProvider'
import UserContextProvider from '@/context/UserContextProvider'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MyToaster from '../my/my-taoster'
import { TooltipProvider } from '../ui/tooltip'
import ReactQueryProvider from './react-query-provider'

type PorvidersType = {
    children: React.ReactNode
}

const Providers = ({ children }: PorvidersType) => {
    return (
        <BrowserRouter>
            <ReactQueryProvider>
                <ThemeProvider defaultTheme="light" storageKey="ui-theme">
                    <UserContextProvider>
                        <CartContextProvider>
                            <TooltipProvider delayDuration={0} disableHoverableContent>
                                <MyToaster />
                                {children}
                            </TooltipProvider>
                        </CartContextProvider>
                    </UserContextProvider>
                </ThemeProvider>
            </ReactQueryProvider>
        </BrowserRouter>
    )
}

export default Providers

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const ReactQueryProvider: React.FC<Props> = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
                staleTime: 5 * 60 * 1000, // 5 minutes
            },
            mutations: {
                retry: false,
            }
        },
    })

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryProvider

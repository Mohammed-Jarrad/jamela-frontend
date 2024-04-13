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
                retry: 2,
                // staleTime: 5 * 60 * 1000, // 5 minutes
            },
        },
    })

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryProvider

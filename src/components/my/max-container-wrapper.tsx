import { cn } from '@/lib/utils'
import React from 'react'

const MaxContainerWrapper = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn('w-full xl:mx-auto xl:max-w-[1500px]', className)} {...props}>
            {children}
        </div>
    )
}

export default MaxContainerWrapper

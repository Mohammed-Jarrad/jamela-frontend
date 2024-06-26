import { cn } from '@/lib/utils'
import React from 'react'
import { CiNoWaitingSign } from 'react-icons/ci'

type Props = {
    message?: string
    className?: string
}

const NoDataMessage: React.FC<Props> = ({ message = 'No data found', className }) => {
    return (
        <p
            className={cn(
                'text-center text-muted-foreground text-xl my-5 centered gap-2',
                className
            )}
        >
            {message} <CiNoWaitingSign color="red" />
        </p>
    )
}

export default NoDataMessage

import { cn } from '@/lib/utils'
import { FC } from 'react'

interface Props {
    title: string
    className?: string
}

const DashTitle: FC<Props> = ({ title, className }) => {
    return (
        <div className={cn("inline-flex items-end mb-14 gap-1", className)}>
            <p className="text-[2rem] leading-[0.7] font-bold">{title}</p>
            <div className="size-[0.8rem] bg-primary circle" />
        </div>
    )
}

export default DashTitle

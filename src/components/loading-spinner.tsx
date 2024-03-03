import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
    width?: number
    height?: number
    color?: string
    className?: string
}
const LoadingSpinner = ({ height = 25, width = 25, className, color = 'hsl(var(--primary))' }: LoadingSpinnerProps) => {
    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
                borderColor: color,
            }}
            className={cn('mx-auto animate-spin rounded-full border-r-[3px] ', className)}
        />
    )
}

export default LoadingSpinner

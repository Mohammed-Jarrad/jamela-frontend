import { cn } from '@/lib/utils'
import React from 'react'
import { HiStar } from 'react-icons/hi2'

interface Props {
    value: number
    size?: number
}

const Rating: React.FC<Props> = ({ value, size = 16 }) => {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((val) => (
                <HiStar
                    key={val}
                    size={size}
                    className={cn("my-1", val <= value ? 'text-yellow-400' : 'text-gray-400')}
                />
            ))}
        </div>
    )
}

export default Rating

import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps, FC } from 'react'

interface GridProps extends ComponentProps<'div'>, VariantProps<typeof gridVariants> {}

const Grid: FC<GridProps> = ({ className, variant, gap, ...props }) => {
    return <div className={cn(gridVariants({ variant, gap, className }))} {...props} />
}

const gridVariants = cva('grid place-items-center grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', {
    variants: {
        variant: {
            default: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
            cards: 'grid grid-cols-1 sm:grid-cols-2',
            list: 'grid grid-cols-1',
        },
        gap: {
            default: 'gap-4',
            sm: 'gap-2',
            lg: 'gap-8',
            xl: 'gap-12',
            '2xl': 'gap-16',
        },
    },
    defaultVariants: {
        variant: 'default',
        gap: 'default',
    },
})

export default Grid

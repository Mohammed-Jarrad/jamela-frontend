import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

interface FlexProps extends React.ComponentProps<'div'>, VariantProps<typeof flexVariants> {}

export default function Flex({ className, direction, justify, align, gap, ...props }: FlexProps) {
    return <div className={cn(flexVariants({ direction, justify, align, gap, className }))} {...props} />
}

const flexVariants = cva('flex', {
    variants: {
        direction: {
            row: 'flex-row',
            column: 'flex-col',
        },
        justify: {
            start: 'justify-start',
            end: 'justify-end',
            center: 'justify-center',
            between: 'justify-between',
            around: 'justify-around',
            evenly: 'justify-evenly',
        },
        align: {
            start: 'items-start',
            end: 'items-end',
            center: 'items-center',
            baseline: 'items-baseline',
            stretch: 'items-stretch',
        },
        gap: {
            sm: 'gap-2',
            md: 'gap-4',
            lg: 'gap-8',
            xl: 'gap-12',
            '2xl': 'gap-16',
            '3xl': 'gap-20',
        },
    },
    defaultVariants: {
        direction: 'row',
        justify: 'start',
        align: 'stretch',
        gap: 'sm',
    },
})

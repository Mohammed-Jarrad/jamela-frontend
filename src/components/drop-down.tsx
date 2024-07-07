import { cn } from '@/lib/utils'
import useClickOutside from '@/hooks/use-click-outside'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import React, { ComponentProps, useState } from 'react'
import { buttonVariants } from './ui/button'

type DropdownContextProps = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownContext = React.createContext<DropdownContextProps>({
    isOpen: false,
    setIsOpen: () => {},
})

type DropdownProps = ComponentProps<'div'>

const Dropdown: React.FC<DropdownProps> = ({ children, className, ...props }) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useClickOutside(() => setIsOpen(false))
    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
            <div className={cn('relative inline-block text-left', className)} ref={ref} {...props}>
                {children}
            </div>
        </DropdownContext.Provider>
    )
}

Dropdown.displayName = 'Dropdown'

type DropdownTriggerProps = ComponentProps<'button'>
const DropdownTrigger = ({
    className,
    children,
    type = 'button',
    ...props
}: DropdownTriggerProps) => {
    const { setIsOpen } = React.useContext(DropdownContext)

    return (
        <button
            className={cn(buttonVariants({ variant: 'ghost' }), className)}
            onClick={() => setIsOpen && setIsOpen((prev) => !prev)}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
}
DropdownTrigger.displayName = 'DropdownTrigger'

type DropdownContentProps = HTMLMotionProps<'div'>
const DropdownContent: React.FC<DropdownContentProps> = ({
    className,
    initial = { opacity: 0, scale: 0.95, y: -10 },
    animate = { opacity: 1, scale: 1, y: 0 },
    exit = { opacity: 0, scale: 0.95, y: -10 },
    transition = { duration: 0.2 },
    ...props
}) => {
    const { isOpen } = React.useContext(DropdownContext)

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={transition}
                    className={cn(
                        'absolute left-0 top-full z-50 mt-2 min-w-full origin-top-right rounded-md border bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                        className
                    )}
                    {...props}
                />
            )}
        </AnimatePresence>
    )
}

type DropdownItemProps = { closeOnClick?: boolean } & ComponentProps<'div'>
const DropdownItem: React.FC<DropdownItemProps> = ({
    className,
    onClick,
    closeOnClick = true,
    ...props
}) => {
    const { setIsOpen } = React.useContext(DropdownContext)

    return (
        <div
            className={cn(
                'm-1 block cursor-pointer rounded px-4 py-2 text-sm text-foreground hover:bg-muted',
                className
            )}
            {...props}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                closeOnClick && setIsOpen(false)
                onClick && onClick(e)
            }}
        />
    )
}
DropdownItem.displayName = 'DropdownItem'

export { Dropdown, DropdownContent, DropdownItem, DropdownTrigger }

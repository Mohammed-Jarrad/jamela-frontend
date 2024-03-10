import { useUserContext } from '@/context/UserContextProvider'
import { cn } from '@/lib/utils'
import { Roles } from '@/types'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'

export interface NavItemProps extends Omit<NavLinkProps, 'to'> {
    link: string
    children?: React.ReactNode
    order?: number
    requiredAuth?: boolean
    allowedRoles?: Roles[]
    childrenParentClassName?: string
}

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
    (
        {
            link,
            children,
            className,
            childrenParentClassName,
            order,
            requiredAuth = false,
            allowedRoles = [],
            ...rest
        }: NavItemProps,
        ref
    ) => {
        const { token, currentUser } = useUserContext()
        const { pathname } = useLocation()
        const isActive = pathname === link
        const isAuthRequired = requiredAuth || allowedRoles?.length > 0
        const shouldRender = () => {
            if (isAuthRequired && !token) return false
            if (isAuthRequired && token && allowedRoles?.length) {
                if (currentUser.role && !allowedRoles.includes(currentUser.role)) return false
            }
            return true
        }

        if (!shouldRender()) return null
        else
            return (
                <li style={{ order }} className="group relative list-none">
                    <NavLink
                        ref={ref}
                        to={link}
                        className={cn(
                            'relative rounded-full px-3 py-1 font-medium transition-all',
                            isActive
                                ? 'text-white/90'
                                : 'text-muted-foreground hover:text-foreground',
                            className
                        )}
                        {...rest}
                    >
                        <div className={cn('inline-block text-sm', childrenParentClassName)}>
                            {children}
                        </div>
                        {isActive && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 20,
                                }}
                                className="absolute inset-0 z-[-1] rounded-lg bg-gradient-to-tr from-primary to-primary/80 "
                                layoutId="nav-item-indicator"
                            />
                        )}
                    </NavLink>
                </li>
            )
    }
)
export default NavItem

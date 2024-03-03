import { cn } from '@/lib/utils'
import { IconProps } from '@radix-ui/react-icons/dist/types'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { IconType } from 'react-icons/lib'
import { Link, useLocation } from 'react-router-dom'
import { useDashboardContext } from './dashboard'
interface DashboardNavItemProps {
    link: string
    icon: IconType | React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>
    title: string
}

const DashboardNavItem = ({ icon: Icon, link, title }: DashboardNavItemProps) => {
    const { setShowNav } = useDashboardContext()
    const location = useLocation()
    const isActive = location.pathname === link
    const [isHoverd, setIsHoverd] = useState<boolean>(false)
    function handleClickOnLinkInSmallScreen() {
        if (window.matchMedia('(max-width: 1024px)').matches) {
            setShowNav(false)
        }
    }
    return (
        <li className="" title={title}>
            <Link
                to={link}
                className={cn(
                    'relative z-20 flex items-center gap-2 rounded-md bg-transparent px-3 py-1 text-sm font-normal transition-all  lg:text-base ',
                    !!isActive && 'text-white/90'
                )}
                onClick={handleClickOnLinkInSmallScreen}
                onMouseMove={() => setIsHoverd(true)}
                onMouseLeave={() => setIsHoverd(false)}
            >
                <Icon className="max-md:text-xl" /> <span>{title}</span>
                {isActive && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 150,
                            damping: 20,
                        }}
                        layoutId="admin-nav-item-indicator"
                        className={'absolute inset-0 -z-10 rounded-md bg-primary '}
                    />
                )}
                {isHoverd && !isActive && (
                    <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        transition={{ duration: 0.4 }}
                        className={'absolute inset-0 -z-20 rounded-md bg-gray-200 dark:bg-gray-800 '}
                    />
                )}
            </Link>
        </li>
    )
}

export default DashboardNavItem

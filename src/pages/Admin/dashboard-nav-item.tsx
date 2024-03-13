import { cn } from '@/lib/utils'
import { IconProps } from '@radix-ui/react-icons/dist/types'
import { motion } from 'framer-motion'
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
    function handleClickOnLinkInSmallScreen() {
        if (window.matchMedia('(max-width: 1024px)').matches) {
            setShowNav(false)
        }
    }
    return (
        <li className="capitalize" title={title}>
            <Link
                to={link}
                className={cn(
                    'relative z-20 flex min-w-[180px] items-center gap-2 rounded-full py-1 pe-10 ps-6 text-sm font-normal transition-all ease-linear',
                    isActive ? 'text-white/90' : 'hover:bg-muted-foreground/10'
                )}
                onClick={handleClickOnLinkInSmallScreen}
            >
                <Icon className="max-md:text-xl" />
                <span>{title}</span>
                {isActive && (
                    <motion.span
                        layoutId="active"
                        className="absolute inset-0 -z-10 rounded-full bg-primary"
                        transition={{ duration: 0.2 }}
                    />
                )}
            </Link>
        </li>
    )
}

export default DashboardNavItem

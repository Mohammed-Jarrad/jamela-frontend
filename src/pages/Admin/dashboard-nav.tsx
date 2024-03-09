import { ModeToggle } from '@/components/mode-toggle'
import Flex from '@/components/my/flex'
import ProfileButton from '@/components/profile-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DashboardIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { CSSProperties } from 'react'
import { BiDialpad } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa6'
import { GiCardboardBox } from 'react-icons/gi'
import { GoImage } from 'react-icons/go'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { MdCategory } from 'react-icons/md'
import { RiCoupon3Fill } from 'react-icons/ri'
import { useDashboardContext } from './dashboard'
import DashboardNavItem from './dashboard-nav-item'

const DashboardNav: React.FC = () => {
    const { setShowNav, showNav } = useDashboardContext()
    return (
        <>
            <motion.div
                style={{ '--admin-nav-width': '270px' } as CSSProperties}
                className={cn(
                    'left-0 top-0 z-50 flex h-screen min-w-[--admin-nav-width] flex-col items-center gap-4 overflow-y-auto border-r bg-card py-2 transition-all',
                    showNav ? 'fixed translate-x-0 opacity-100 lg:sticky' : 'fixed -translate-x-full opacity-0'
                )}
            >
                <Flex align="center" gap="lg" className="my-4">
                    <Flex align="center">
                        <ProfileButton link="/dashboard/profile" />
                        <p className="text-xl font-bold">Admin</p>
                    </Flex>
                    <Button
                        variant="ghost"
                        onClick={() => setShowNav(!showNav)}
                        className="h-10 w-10 rounded-full border p-0 text-muted-foreground"
                    >
                        <ChevronLeft size={24} />
                    </Button>
                </Flex>
                <hr className="h-1 w-full" />
                <ul className={`flex flex-col justify-center gap-1 md:gap-3 md:py-2`}>
                    <DashboardNavItem icon={DashboardIcon} link={'/dashboard'} title={'Dashboard'} />
                    <DashboardNavItem icon={MdCategory} link={'/dashboard/categories'} title={'Categories'} />
                    <DashboardNavItem icon={BiDialpad} link={'/dashboard/subcategories'} title={'Subcategories'} />
                    <DashboardNavItem icon={GiCardboardBox} link={'/dashboard/products'} title={'Products'} />
                    <DashboardNavItem icon={IoDocumentTextOutline} link={'/dashboard/orders'} title={'Orders'} />
                    <DashboardNavItem icon={FaUsers} link={'/dashboard/users'} title={'Users'} />
                    <DashboardNavItem icon={RiCoupon3Fill} link={'/dashboard/coupons'} title={'Coupons'} />
                    <DashboardNavItem icon={GoImage} link={'/dashboard/images'} title={'Images'} />
                </ul>
                <div className="mt-auto space-y-4 text-center">
                    <ModeToggle />
                    <p className="truncate text-xs">Copyright © {new Date().getFullYear()}. All rights reserved.</p>
                </div>
            </motion.div>
            {/* Overlay */}
            {showNav && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowNav(false)}
                    className="fixed inset-0 z-40 bg-background/50 backdrop-blur-sm lg:hidden"
                />
            )}
        </>
    )
}

export default DashboardNav

import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { useDashboardContext } from './dashboard'
import { Button } from '@/components/ui/button'

const DashboardContent = () => {
    const { showNav, setShowNav } = useDashboardContext()

    return (
        <div className="relative h-full w-full px-4 py-2 text-card-foreground md:px-8 md:py-5">
            <Button
                variant="outline"
                className={cn('mb-5', showNav && 'lg:hidden')}
                onClick={() => setShowNav(!showNav)}
            >
                <Menu size={24} />
            </Button>
            <Outlet />
        </div>
    )
}

export default DashboardContent

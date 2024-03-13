import { useTheme } from '@/context/ThemeContextProvider'
import { useUserContext } from '@/context/UserContextProvider'
import { motion } from 'framer-motion'
import { Home, Store } from 'lucide-react'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoPerson } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface Props {
    link?: string
}

export default function ProfileButton({ link = '/profile' }: Props): JSX.Element | null {
    const { currentUser, logout: _logout } = useUserContext()
    const { theme } = useTheme()
    const navigate = useNavigate()

    const logout = () => {
        _logout()
        navigate(`/auth/login`, { replace: true })
    }

    if (!Object.keys(currentUser).length) return null
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <motion.img
                    src={currentUser?.image?.secure_url}
                    alt="profile image"
                    loading="lazy"
                    className="circle size-10 object-cover"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, outline: '2px solid hsl(var(--primary))' }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="!z-[999999] w-56">
                <DropdownMenuLabel>Hi, {currentUser?.username}</DropdownMenuLabel>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                    onClick={() => navigate(link)}
                    className="flex items-center gap-3"
                >
                    <IoPerson /> Profile
                </DropdownMenuItem>

                <DropdownMenuGroup className="border-b border-t md:hidden">
                    <DropdownMenuItem className="flex  items-center gap-3">
                        <span>{theme}</span>
                        <ModeToggle />
                    </DropdownMenuItem>

                    <Link to="/">
                        <DropdownMenuItem className="space-x-3">
                            <Home size={14} />
                            <span>Home</span>
                        </DropdownMenuItem>
                    </Link>

                    <Link to="/shop">
                        <DropdownMenuItem className="space-x-3">
                            <Store size={14} />
                            <span>Shop</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>

                <DropdownMenuItem onClick={() => logout()} className="space-x-3">
                    <AiOutlineLogout /> <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

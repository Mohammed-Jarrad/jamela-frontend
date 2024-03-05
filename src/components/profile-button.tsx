import { useUserContext } from '@/context/UserContextProvider'
import { motion } from 'framer-motion'
import { AiOutlineLogout } from 'react-icons/ai'
import { IoPerson } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'

type Props = {
    link?: string
}
export default function ProfileButton({ link = '/profile' }: Props): JSX.Element | null {
    const { currentUser, logout: _logout } = useUserContext()
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
                    layoutId="profile"
                    src={currentUser?.image?.secure_url}
                    alt="profile image"
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.06, outline: '2px solid has(var(--primary))' }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="!z-[999999] w-56">
                <DropdownMenuLabel>Hi, {currentUser?.username}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary/30" />
                <DropdownMenuItem onClick={() => navigate(link)} className="flex items-center gap-3">
                    <IoPerson /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()} className="flex items-center gap-3">
                    <AiOutlineLogout /> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

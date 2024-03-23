import { useUserContext } from '@/context/UserContextProvider'
import { cn } from '@/lib/utils'
import { Contact, Home, Info, ShoppingCart } from 'lucide-react'
import { ModeToggle } from '../mode-toggle'
import ProfileButton from '../profile-button'
import Wishlist from '../wishlist/wishlist'
import CartLink from './cart-link'
import NavItem from './nav-item'

const HeaderContent = () => {
    const { token, currentUser } = useUserContext()

    return (
        <>
            {/* Nav Links */}
            <ul className="flex w-full flex-1 items-center justify-center gap-2 max-md:hidden">
                <NavItem link="/" childrenParentClassName="flex items-center gap-1">
                    <Home size={14} />
                    Home
                </NavItem>
                <NavItem link="/shop" childrenParentClassName="flex items-center gap-1">
                    <ShoppingCart size={14} />
                    Shop
                </NavItem>
                <NavItem link="/about" childrenParentClassName="flex items-center gap-1">
                    <Info size={14} />
                    About Us
                </NavItem>
                <NavItem link="/contact" childrenParentClassName="flex items-center gap-1">
                    <Contact size={14} />
                    Contact Us
                </NavItem>
            </ul>

            {/* Controls & Profile */}
            <div className="flex items-center gap-4 max-md:w-full max-md:justify-end">
                {token && currentUser?.cart && <CartLink />}
                {token && Object.keys(currentUser).length > 0 && <Wishlist />}
                {token ? (
                    <ProfileButton />
                ) : (
                    <>
                        <NavItem link="/auth/login">Login</NavItem>
                        <NavItem link="/auth/signup">Singup</NavItem>
                    </>
                )}
                <span className={cn(token && 'max-md:hidden')}>
                    <ModeToggle />
                </span>
            </div>
        </>
    )
}

export default HeaderContent

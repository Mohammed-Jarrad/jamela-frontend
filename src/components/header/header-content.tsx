import { useCart } from '@/context/CartContextProvider'
import { useUserContext } from '@/context/UserContextProvider'
import { cn } from '@/lib/utils'
import { ModeToggle } from '../mode-toggle'
import ProfileButton from '../profile-button'
import Wishlist from '../wishlist/wishlist'
import CartLink from './cart-link'
import NavItem from './nav-item'
import { HiMiniHome } from 'react-icons/hi2'
import { TbInfoSquareRounded, TbShoppingBag } from 'react-icons/tb'
import { IoPeople } from 'react-icons/io5'

const HeaderContent = () => {
    const { token, currentUser } = useUserContext()
    const { cart } = useCart()

    return (
        <>
            {/* Nav Links */}
            <ul className="flex w-full flex-1 items-center justify-center gap-2 max-md:hidden">
                <NavItem link="/" childrenParentClassName="flex items-center gap-1">
                    <HiMiniHome size={14} />
                    Home
                </NavItem>
                <NavItem link="/shop" childrenParentClassName="flex items-center gap-1">
                    <TbShoppingBag size={14} />
                    Shop
                </NavItem>
                <NavItem link="/about" childrenParentClassName="flex items-center gap-1">
                    <TbInfoSquareRounded size={14} />
                    About Us
                </NavItem>
                <NavItem link="/contact" childrenParentClassName="flex items-center gap-1">
                    <IoPeople size={14} />
                    Contact Us
                </NavItem>
            </ul>

            {/* Controls & Profile */}
            <div className="flex items-center gap-4 max-md:w-full max-md:justify-end">
                {token && cart && <CartLink link="/cart" />}
                {token && Object.keys(currentUser).length > 0 && <Wishlist />}
                {token ? (
                    <ProfileButton />
                ) : (
                    <>
                        <NavItem link="/auth/login">Login</NavItem>
                        <NavItem link="/auth/signup">Singup</NavItem>
                    </>
                )}
                <div className={cn(token && 'max-md:hidden')}>
                    <ModeToggle />
                </div>
            </div>
        </>
    )
}

export default HeaderContent

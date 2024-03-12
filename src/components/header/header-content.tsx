import { useUserContext } from '@/context/UserContextProvider'
import { cn } from '@/lib/utils'
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
            <ul className="flex w-full flex-1 items-center justify-center gap-4 max-md:hidden">
                <NavItem link="/">Home</NavItem>
                <NavItem link="/shop">Shop</NavItem>
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

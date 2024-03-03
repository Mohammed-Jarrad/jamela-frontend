import { useTheme } from '@/context/ThemeContextProvider'
import { useUserContext } from '@/context/UserContextProvider'
import { Link } from 'react-router-dom'
import Transition from '../../utils/transition'
import { ModeToggle } from '../mode-toggle'
import Flex from '../my/flex'
import ProfileButton from '../profile-button'
import Wishlist from '../wishlist/wishlist'
import CartLink from './cart-link'
import NavItem from './nav-item'

const Header = () => {
    const { token, currentUser } = useUserContext()
    const { theme } = useTheme()

    return (
        <header className="sticky top-0 z-[999] h-header w-full border-b bg-background/80 !bg-opacity-70 shadow backdrop-blur-lg">
            <Transition
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container h-full"
            >
                <Flex className="h-full w-full">
                    {/* logo */}
                    <div>
                        <Link to="/" className="inline-block">
                            <img
                                src={theme === 'light' ? '/logo.svg' : '/logo-dark.svg'}
                                className="relative z-50 h-header"
                                alt="jamela logo"
                            />
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <ul className="flex w-full flex-1 items-center justify-center gap-4">
                        <NavItem link="/">Home</NavItem>
                        <NavItem link="/shop">Shop</NavItem>
                    </ul>

                    {/* Controls & Profile */}
                    <ul className="flex items-center gap-4">
                        {token && currentUser?.cart && <CartLink />}
                        {token && Object.keys(currentUser).length && <Wishlist />}
                        {token ? (
                            <ProfileButton />
                        ) : (
                            <>
                                <NavItem link="/auth/login">Login</NavItem>
                                <NavItem link="/auth/signup">Singup</NavItem>
                            </>
                        )}
                        <ModeToggle />
                    </ul>
                </Flex>
            </Transition>
        </header>
    )
}

export default Header

import { useTheme } from '@/context/ThemeContextProvider'
import { Link } from 'react-router-dom'
import Transition from '../transition'
import Flex from '../my/flex'
import HeaderContent from './header-content'

const Header = () => {
    const { theme } = useTheme()

    return (
        <header className="sticky top-0 z-[50] h-header w-full border-b bg-background/80 !bg-opacity-70 shadow backdrop-blur-lg">
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
                    {/* Content */}
                    <HeaderContent />
                </Flex>
            </Transition>
        </header>
    )
}

export default Header

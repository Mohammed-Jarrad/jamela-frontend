import { useUserContext } from '@/context/UserContextProvider'
import { MdOutlineShoppingBag, MdShoppingBag } from 'react-icons/md'
import { NavLink, useLocation } from 'react-router-dom'
import ToolTip from '../my/tooltip'

const CartLink = () => {
    const { currentUser } = useUserContext()
    const { pathname } = useLocation()
    return (
        <ToolTip content="Cart">
            <NavLink to={'/cart'} className={`relative text-primary`}>
                {pathname === '/cart' ? <MdShoppingBag size={28} /> : <MdOutlineShoppingBag size={28} />}

                <span
                    className={`absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-primary-foreground`}
                >
                    {currentUser.cart?.products.length ? currentUser.cart.products.length : 0}
                </span>
            </NavLink>
        </ToolTip>
    )
}

export default CartLink

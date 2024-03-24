import { useCart } from '@/context/CartContextProvider'
import { MdOutlineShoppingBag, MdShoppingBag } from 'react-icons/md'
import { NavLink, useLocation } from 'react-router-dom'
import ToolTip from '../my/tooltip'

type Props = {
    link?: string
}

const CartLink: React.FC<Props> = ({ link = '/cart' }) => {
    const { cart } = useCart()
    const { pathname } = useLocation()

    return (
        <ToolTip content="Cart">
            <NavLink to={link} className={`relative text-primary`}>
                {pathname === link ? (
                    <MdShoppingBag size={28} />
                ) : (
                    <MdOutlineShoppingBag size={28} />
                )}

                <span
                    className={`absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-primary-foreground`}
                >
                    {cart?.products && cart?.products ? cart?.products.length : 0}
                </span>
            </NavLink>
        </ToolTip>
    )
}

export default CartLink
